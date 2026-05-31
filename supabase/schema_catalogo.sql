-- ============================================================
-- Arciblock - Schema adicional para catálogo público + storage
-- ============================================================
-- Este script EXTIENDE el schema multi-tenant existente.
-- Requiere que ya esté ejecutado schema_supabase_multitenant.sql
-- y que exista al menos una empresa (Arciblock).
--
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- ============================================================

-- ============================================================
-- 1. TABLA: categorias_catalogo
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
-- 2. TABLA: productos_catalogo
-- ============================================================
-- Nota: esto es DISTINTO de la tabla `productos` (la cual se usa
-- para el proceso productivo interno). Esta tabla es para mostrar
-- productos comercialmente en la web pública.
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
-- 3. TRIGGERS de updated_at
-- ============================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
    new.updated_at = now();
    return new;
end $$;

drop trigger if exists trg_categorias_catalogo_updated on public.categorias_catalogo;
create trigger trg_categorias_catalogo_updated
    before update on public.categorias_catalogo
    for each row execute function public.set_updated_at();

drop trigger if exists trg_productos_catalogo_updated on public.productos_catalogo;
create trigger trg_productos_catalogo_updated
    before update on public.productos_catalogo
    for each row execute function public.set_updated_at();

-- ============================================================
-- 4. RLS - Row Level Security
-- ============================================================
alter table public.categorias_catalogo enable row level security;
alter table public.productos_catalogo enable row level security;

-- =====
-- LECTURA PÚBLICA (anon) — solo activos
-- =====
-- Esto permite que la web pública pueda leer el catálogo sin login.
drop policy if exists "Catalogo categorias publica" on public.categorias_catalogo;
create policy "Catalogo categorias publica"
    on public.categorias_catalogo
    for select
    to anon, authenticated
    using (activo = true);

drop policy if exists "Catalogo productos publica" on public.productos_catalogo;
create policy "Catalogo productos publica"
    on public.productos_catalogo
    for select
    to anon, authenticated
    using (activo = true);

-- =====
-- ESCRITURA SOLO ROOT (mediante helper current_empresa_id + chequeo de rol)
-- =====
drop policy if exists "Catalogo categorias admin escribe" on public.categorias_catalogo;
create policy "Catalogo categorias admin escribe"
    on public.categorias_catalogo
    for all
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
    on public.productos_catalogo
    for all
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
-- 5. STORAGE BUCKET para imágenes de productos
-- ============================================================
-- El bucket se llama 'catalogo-imagenes' y es público para lectura.
-- IMPORTANTE: este bloque se debe ejecutar 1 sola vez. Si ya existe el
-- bucket, los inserts se ignoran por la cláusula on conflict.
insert into storage.buckets (id, name, public)
values ('catalogo-imagenes', 'catalogo-imagenes', true)
on conflict (id) do nothing;

-- Policy: cualquiera puede ver imágenes (catálogo público)
drop policy if exists "Imagenes catalogo publicas" on storage.objects;
create policy "Imagenes catalogo publicas"
    on storage.objects
    for select
    to anon, authenticated
    using (bucket_id = 'catalogo-imagenes');

-- Policy: solo Root puede subir / actualizar / borrar imágenes
drop policy if exists "Imagenes catalogo escribe root" on storage.objects;
create policy "Imagenes catalogo escribe root"
    on storage.objects
    for insert
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
    on storage.objects
    for update
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
    on storage.objects
    for delete
    to authenticated
    using (
        bucket_id = 'catalogo-imagenes'
        and exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.rol = 'root'
        )
    );

-- ============================================================
-- 6. DATOS DEMO (opcional, puedes borrar este bloque)
-- ============================================================
-- Inserta 5 categorías y 10 productos demo basados en las líneas reales
-- de Arciblock. Reemplaza el UUID por el de tu empresa.
--
-- NOTA: descomenta el bloque y reemplaza '00000000-0000-0000-0000-000000000000'
-- por el UUID real de tu empresa Arciblock.

-- do $$
-- declare
--     emp_id uuid := '00000000-0000-0000-0000-000000000000';
--     cat_bloques uuid;
--     cat_ladrillos uuid;
--     cat_gres uuid;
--     cat_fachaletas uuid;
--     cat_adoquines uuid;
-- begin
--     insert into public.categorias_catalogo (empresa_id, nombre, slug, orden) values
--       (emp_id, 'Bloques H', 'bloques-h', 1) returning id into cat_bloques;
--     insert into public.categorias_catalogo (empresa_id, nombre, slug, orden) values
--       (emp_id, 'Ladrillos', 'ladrillos', 2) returning id into cat_ladrillos;
--     insert into public.categorias_catalogo (empresa_id, nombre, slug, orden) values
--       (emp_id, 'Pisos de gres', 'pisos-gres', 3) returning id into cat_gres;
--     insert into public.categorias_catalogo (empresa_id, nombre, slug, orden) values
--       (emp_id, 'Fachaletas y enchapes', 'fachaletas', 4) returning id into cat_fachaletas;
--     insert into public.categorias_catalogo (empresa_id, nombre, slug, orden) values
--       (emp_id, 'Adoquines', 'adoquines', 5) returning id into cat_adoquines;
--
--     insert into public.productos_catalogo (empresa_id, categoria_id, nombre, slug, descripcion, precio_referencia, destacado, orden) values
--     (emp_id, cat_bloques, 'Bloque H No. 4', 'bloque-h-4',
--       'Bloque de arcilla cocida 10x20x30 cm para muros divisorios. Rendimiento aproximado: 12-13 unidades por m².',
--       null, true, 1),
--     (emp_id, cat_bloques, 'Bloque H No. 5', 'bloque-h-5',
--       'Bloque de arcilla cocida 12x20x30 cm para muros divisorios y semi-portantes. Rendimiento: 12-13 unidades por m².',
--       null, true, 2),
--     (emp_id, cat_bloques, 'Bloque H No. 6', 'bloque-h-6',
--       'Bloque de arcilla cocida 15x20x30 cm para muros más anchos y mayor aislamiento. Rendimiento: 12-13 unidades por m².',
--       null, false, 3),
--     (emp_id, cat_ladrillos, 'Ladrillo tolete común', 'ladrillo-tolete-comun',
--       'Ladrillo tradicional de arcilla cocida 6x12x24 cm. Versátil para muros estructurales y divisorios. Rendimiento: 55-60 uds/m² muro de soga.',
--       null, true, 4),
--     (emp_id, cat_ladrillos, 'Ladrillo prensado a la vista', 'ladrillo-prensado-vista',
--       'Ladrillo prensado de cara uniforme, ideal para fachadas y muros expuestos. Acabado limpio sin necesidad de pañete.',
--       null, true, 5),
--     (emp_id, cat_gres, 'Piso de gres rústico', 'piso-gres-rustico',
--       'Baldosa de gres prensado para pisos interiores y terrazas. Color natural de arcilla, antideslizante, alta resistencia al desgaste.',
--       null, false, 6),
--     (emp_id, cat_gres, 'Piso de gres pulido', 'piso-gres-pulido',
--       'Baldosa de gres con acabado más fino, ideal para zonas sociales y espacios donde se busca calidez con elegancia.',
--       null, false, 7),
--     (emp_id, cat_fachaletas, 'Fachaleta lisa natural', 'fachaleta-lisa-natural',
--       'Fachaleta de arcilla 1.5x6x24 cm para revestimiento. Estética ladrillo a la vista, fácil instalación.',
--       null, true, 8),
--     (emp_id, cat_fachaletas, 'Fachaleta rústica', 'fachaleta-rustica',
--       'Fachaleta con textura artesanal para fachadas con carácter. Variaciones naturales de tono que dan riqueza visual al muro.',
--       null, false, 9),
--     (emp_id, cat_adoquines, 'Adoquín rectangular clásico', 'adoquin-rectangular',
--       'Adoquín de arcilla 5x10x20 cm para senderos, terrazas y zonas peatonales. Resistencia al tráfico ligero. Rendimiento: 50 uds/m².',
--       null, false, 10);
-- end $$;

-- ============================================================
-- FIN del script
-- ============================================================
-- Después de ejecutar:
-- 1. Verifica que las tablas se crearon: select * from categorias_catalogo;
-- 2. Si quieres datos demo, descomenta el bloque DO y reemplaza el UUID.
-- 3. Configura tu .env.local en arciblock-web con NEXT_PUBLIC_SUPABASE_URL
--    y NEXT_PUBLIC_SUPABASE_ANON_KEY del proyecto Supabase.
-- ============================================================
