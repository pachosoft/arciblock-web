-- ============================================================
-- Arciblock - Schema standalone (proyecto Supabase dedicado)
-- ============================================================
-- Este script crea TODO lo necesario para que la web Arciblock funcione:
--   - tabla empresas (mínima)
--   - tabla profiles (usuarios admin con rol)
--   - tablas catalogo (categorías + productos)
--   - bucket de Storage para imágenes
--   - todas las políticas RLS
--   - trigger para crear profile automáticamente al crear usuario
--
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- ============================================================

create extension if not exists pgcrypto;

-- ============================================================
-- 1. TABLA: empresas
-- ============================================================
create table if not exists public.empresas (
    id uuid primary key default gen_random_uuid(),
    nombre_comercial text not null,
    created_at timestamptz not null default now()
);

-- ============================================================
-- 2. ENUM: roles de usuario
-- ============================================================
do $$ begin
    create type public.user_role as enum ('root', 'gestor');
exception when duplicate_object then null; end $$;

-- ============================================================
-- 3. TABLA: profiles (extiende auth.users con empresa y rol)
-- ============================================================
create table if not exists public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    empresa_id uuid not null references public.empresas(id) on delete cascade,
    email text not null,
    rol public.user_role not null default 'gestor',
    nombre_completo text,
    activo boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists idx_profiles_empresa on public.profiles(empresa_id);

-- Helper: ID de la empresa del usuario actual (para usar en políticas RLS)
create or replace function public.current_empresa_id()
returns uuid language sql stable security definer as $$
    select empresa_id from public.profiles where id = auth.uid()
$$;

-- ============================================================
-- 4. TABLA: categorias_catalogo
-- ============================================================
create table if not exists public.categorias_catalogo (
    id uuid primary key default gen_random_uuid(),
    empresa_id uuid not null references public.empresas(id) on delete cascade,
    nombre text not null,
    slug text not null,
    orden integer not null default 0,
    activo boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint categorias_catalogo_slug_unique unique (empresa_id, slug)
);

create index if not exists idx_categorias_catalogo_empresa
    on public.categorias_catalogo(empresa_id);

-- ============================================================
-- 5. TABLA: productos_catalogo
-- ============================================================
create table if not exists public.productos_catalogo (
    id uuid primary key default gen_random_uuid(),
    empresa_id uuid not null references public.empresas(id) on delete cascade,
    categoria_id uuid references public.categorias_catalogo(id) on delete set null,
    nombre text not null,
    slug text not null,
    descripcion text,
    precio_referencia numeric(12,2),
    moneda text not null default 'COP',
    imagen_url text,
    destacado boolean not null default false,
    orden integer not null default 0,
    activo boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint productos_catalogo_slug_unique unique (empresa_id, slug)
);

create index if not exists idx_productos_catalogo_empresa
    on public.productos_catalogo(empresa_id);
create index if not exists idx_productos_catalogo_categoria
    on public.productos_catalogo(categoria_id);
create index if not exists idx_productos_catalogo_activo
    on public.productos_catalogo(empresa_id, activo);

-- ============================================================
-- 6. TRIGGERS de updated_at
-- ============================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
    new.updated_at = now();
    return new;
end $$;

drop trigger if exists trg_profiles_updated on public.profiles;
create trigger trg_profiles_updated
    before update on public.profiles
    for each row execute function public.set_updated_at();

drop trigger if exists trg_categorias_catalogo_updated on public.categorias_catalogo;
create trigger trg_categorias_catalogo_updated
    before update on public.categorias_catalogo
    for each row execute function public.set_updated_at();

drop trigger if exists trg_productos_catalogo_updated on public.productos_catalogo;
create trigger trg_productos_catalogo_updated
    before update on public.productos_catalogo
    for each row execute function public.set_updated_at();

-- ============================================================
-- 7. TRIGGER: crear profile automáticamente al crear usuario
-- ============================================================
-- Cuando creas un usuario en Auth con metadata { empresa_id, rol, nombre_completo },
-- este trigger crea automáticamente su fila en profiles.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
declare
    v_empresa uuid;
    v_rol public.user_role;
    v_nombre text;
begin
    v_empresa := (new.raw_user_meta_data ->> 'empresa_id')::uuid;
    v_rol := coalesce((new.raw_user_meta_data ->> 'rol')::public.user_role, 'gestor');
    v_nombre := new.raw_user_meta_data ->> 'nombre_completo';

    if v_empresa is null then
        raise exception 'Usuario debe tener empresa_id en user_metadata';
    end if;

    insert into public.profiles (id, empresa_id, email, rol, nombre_completo)
    values (new.id, v_empresa, new.email, v_rol, v_nombre);
    return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();

-- ============================================================
-- 8. RLS - Row Level Security
-- ============================================================
alter table public.empresas enable row level security;
alter table public.profiles enable row level security;
alter table public.categorias_catalogo enable row level security;
alter table public.productos_catalogo enable row level security;

-- profiles: el usuario puede leer su propio profile
drop policy if exists "profiles select own" on public.profiles;
create policy "profiles select own"
    on public.profiles for select
    to authenticated
    using (id = auth.uid());

-- empresas: usuarios autenticados leen su propia empresa
drop policy if exists "empresas select own" on public.empresas;
create policy "empresas select own"
    on public.empresas for select
    to authenticated
    using (id = public.current_empresa_id());

-- Lectura pública (anon) del catálogo solo activos
drop policy if exists "Catalogo categorias publica" on public.categorias_catalogo;
create policy "Catalogo categorias publica"
    on public.categorias_catalogo for select
    to anon, authenticated
    using (activo = true);

drop policy if exists "Catalogo productos publica" on public.productos_catalogo;
create policy "Catalogo productos publica"
    on public.productos_catalogo for select
    to anon, authenticated
    using (activo = true);

-- Escritura del catálogo solo Root
drop policy if exists "Catalogo categorias admin escribe" on public.categorias_catalogo;
create policy "Catalogo categorias admin escribe"
    on public.categorias_catalogo for all
    to authenticated
    using (
        empresa_id = public.current_empresa_id()
        and exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.rol = 'root'
        )
    )
    with check (
        empresa_id = public.current_empresa_id()
        and exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.rol = 'root'
        )
    );

drop policy if exists "Catalogo productos admin escribe" on public.productos_catalogo;
create policy "Catalogo productos admin escribe"
    on public.productos_catalogo for all
    to authenticated
    using (
        empresa_id = public.current_empresa_id()
        and exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.rol = 'root'
        )
    )
    with check (
        empresa_id = public.current_empresa_id()
        and exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.rol = 'root'
        )
    );

-- ============================================================
-- 9. STORAGE BUCKET para imágenes de productos
-- ============================================================
insert into storage.buckets (id, name, public)
values ('catalogo-imagenes', 'catalogo-imagenes', true)
on conflict (id) do nothing;

drop policy if exists "Imagenes catalogo publicas" on storage.objects;
create policy "Imagenes catalogo publicas"
    on storage.objects for select
    to anon, authenticated
    using (bucket_id = 'catalogo-imagenes');

drop policy if exists "Imagenes catalogo escribe root" on storage.objects;
create policy "Imagenes catalogo escribe root"
    on storage.objects for insert
    to authenticated
    with check (
        bucket_id = 'catalogo-imagenes'
        and exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.rol = 'root'
        )
    );

drop policy if exists "Imagenes catalogo actualiza root" on storage.objects;
create policy "Imagenes catalogo actualiza root"
    on storage.objects for update
    to authenticated
    using (
        bucket_id = 'catalogo-imagenes'
        and exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.rol = 'root'
        )
    );

drop policy if exists "Imagenes catalogo borra root" on storage.objects;
create policy "Imagenes catalogo borra root"
    on storage.objects for delete
    to authenticated
    using (
        bucket_id = 'catalogo-imagenes'
        and exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.rol = 'root'
        )
    );

-- ============================================================
-- 10. VISTA: v_liquidacion (placeholder vacía)
-- ============================================================
-- Como esta web no tiene tablas de producción, creamos una vista vacía
-- para que el módulo /admin/reportes no falle al consultarla.
-- Cuando integres la app móvil, reemplazas esta vista por la real.
create or replace view public.v_liquidacion as
select
    null::date as fecha_registro,
    null::text as codigo_producto,
    null::text as nombre_producto,
    null::text as turno,
    null::numeric as pct_recargo,
    null::text as codigo_cc,
    null::text as centro_costo,
    null::text as documento_id,
    null::text as nombre_operario,
    null::numeric as cantidad_total,
    null::integer as n_operarios,
    null::numeric as cantidad_individual,
    null::numeric as precio_unitario,
    null::numeric as valor_liquidado
where false;

-- Tablas placeholder para que los selects de reportes no fallen
create table if not exists public.productos (
    codigo text primary key,
    nombre text not null,
    empresa_id uuid references public.empresas(id) on delete cascade
);

create table if not exists public.operarios (
    documento_id text primary key,
    nombre text not null,
    empresa_id uuid references public.empresas(id) on delete cascade
);

alter table public.productos enable row level security;
alter table public.operarios enable row level security;

drop policy if exists "productos lectura empresa" on public.productos;
create policy "productos lectura empresa" on public.productos
    for select to authenticated
    using (empresa_id = public.current_empresa_id());

drop policy if exists "operarios lectura empresa" on public.operarios;
create policy "operarios lectura empresa" on public.operarios
    for select to authenticated
    using (empresa_id = public.current_empresa_id());

-- ============================================================
-- FIN
-- ============================================================
-- Después de ejecutar este script:
-- 1. Crea tu empresa Arciblock (paso 3.4 de la guía).
-- 2. Crea tu usuario Root (paso 3.5).
-- 3. Listo para correr la web localmente.
-- ============================================================
