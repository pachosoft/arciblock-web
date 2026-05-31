# arciblock-web

Sitio web oficial de **Arciblock** con catálogo público y panel de
administración integrado a Supabase.

Comparte la base de datos con la app móvil Producción+ que ya construimos.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4 con paleta industrial propia
- Supabase (Auth + Postgres + Storage + RLS)
- Despliegue en Vercel

## Estructura

```
arciblock-web/
├── app/
│   ├── (public)/              ← Rutas públicas con Header/Footer
│   │   ├── page.tsx           Home
│   │   ├── catalogo/page.tsx  Catálogo de productos (lee de Supabase)
│   │   ├── servicios/
│   │   ├── portafolio/
│   │   ├── blog/
│   │   ├── contacto/
│   │   └── legal/privacidad/
│   ├── admin/                 ← Panel protegido (solo Root)
│   │   ├── layout.tsx         Verifica auth + sidebar
│   │   ├── page.tsx           Dashboard
│   │   ├── productos/         CRUD de catálogo
│   │   ├── categorias/        CRUD de categorías
│   │   └── reportes/          Liquidación de producción
│   ├── login/page.tsx         Login
│   ├── layout.tsx             Root layout (sin Header/Footer)
│   └── globals.css            Paleta + fuentes
├── components/
│   ├── Header.tsx, Footer.tsx, Logo.tsx
│   └── admin/AdminSidebar.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts          createBrowserClient
│   │   └── server.ts          createServerClient con cookies
│   ├── types.ts               Tipos compartidos
│   └── format.ts              Helpers (moneda, fecha, slug)
├── middleware.ts              Protege /admin/* + refresca sesión
├── supabase/
│   └── schema_catalogo.sql    SQL adicional para catálogo
├── .env.example
├── package.json
└── README.md
```

## Setup paso a paso

### 1. Variables de entorno

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales de Supabase (el MISMO proyecto que
ya usas para la app móvil Producción+):

```env
NEXT_PUBLIC_SUPABASE_URL=https://TU_PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

### 2. Schema de la base de datos

En el SQL Editor de Supabase, ejecuta **en este orden**:

1. Si aún no lo has hecho, ejecuta `schema_supabase_multitenant.sql`
   (de la app móvil) — crea las tablas base de producción.
2. Ejecuta `supabase/schema_catalogo.sql` — agrega tablas de catálogo
   público + bucket de Storage para imágenes.

### 3. Datos demo (opcional)

Dentro de `schema_catalogo.sql` hay un bloque `do $$ ... end $$` comentado
al final. Descoméntalo y reemplaza el UUID por el ID de tu empresa
Arciblock. Eso inserta 3 categorías y 6 productos demo para que la web
no aparezca vacía la primera vez.

### 4. Instalar y correr

```bash
npm install
npm run dev
```

Abre http://localhost:3000

### 5. Login al admin

- Ve a http://localhost:3000/login
- Ingresa con el usuario Root que creaste para la app móvil
- Te redirige a `/admin`

## Cómo funciona la conexión con la app móvil

```
        ┌─────────────────────────────┐
        │  Supabase (1 solo proyecto) │
        │  ┌──────────────────────┐   │
        │  │ profiles, empresas   │   │
        │  │ productos (interno)  │   │
        │  │ produccion           │   │
        │  │ v_liquidacion        │   │
        │  │ ─────────────────────│   │
        │  │ categorias_catalogo  │   │  ← Nuevas
        │  │ productos_catalogo   │   │     (web pública)
        │  │ storage: imágenes    │   │
        │  └──────────────────────┘   │
        └──────────────┬──────────────┘
                       │
       ┌───────────────┼───────────────┐
       │                               │
  📱 App Flutter                  🌐 arciblock.com
  - Captura producción            - Catálogo público
  - Operarios                     - Admin Root: CRUD catálogo
  - Multi-operario                - Admin Root: reportes liquidación
```

Distinción importante entre dos tablas similares:

| Tabla              | Para qué sirve                                  | Origen        |
| ------------------ | ----------------------------------------------- | ------------- |
| `productos`        | Productos del proceso productivo interno        | App móvil     |
| `productos_catalogo` | Productos comerciales del catálogo público    | Web Arciblock |

Son tablas separadas porque tienen propósitos distintos: uno es para que
los operarios reporten producción de unidades reales fabricadas, y el
otro es para que el público vea y cotice productos comerciales.

## Despliegue en Vercel

1. Crear repo `arciblock-web` en GitHub.
2. Hacer push del proyecto.
3. En vercel.com → New Project → importar el repo.
4. Configurar variables de entorno en Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy.
6. Conectar dominio `arciblock.com`:
   - Settings → Domains → Add `arciblock.com`
   - En Namecheap → Advanced DNS → agregar:
     - `A` @ → `216.198.79.1`
     - `CNAME` www → `cname.vercel-dns.com`

## Permisos (RLS)

La seguridad se enforza a nivel de base de datos:

| Tabla                 | Lectura       | Escritura          |
| --------------------- | ------------- | ------------------ |
| `productos_catalogo`  | Pública (anon) | Solo Root         |
| `categorias_catalogo` | Pública (anon) | Solo Root         |
| Storage imágenes      | Pública       | Solo Root          |
| `v_liquidacion`       | Multi-tenant (RLS) | Multi-tenant  |

Esto significa que aunque alguien obtenga la anon key (que es pública por
diseño), no puede modificar el catálogo ni acceder a reportes sin
autenticarse como Root.

## Personalización rápida

| Quiero cambiar...           | Edita aquí                                  |
| --------------------------- | ------------------------------------------- |
| Email de contacto           | `components/Footer.tsx`, `app/(public)/contacto/page.tsx`, `app/(public)/legal/privacidad/page.tsx` |
| Logo                        | `components/Logo.tsx`                       |
| Colores                     | `app/globals.css`                           |
| Textos del home             | `app/(public)/page.tsx`                     |
| Servicios listados          | `app/(public)/servicios/page.tsx`           |
| Posts del blog              | `app/(public)/blog/page.tsx` + `[slug]/page.tsx` |
| Productos del catálogo      | Editables desde `/admin/productos`          |

## Flujo de uso

### Para ti (Root, una sola vez)
1. Login en `/login`.
2. Crear categorías en `/admin/categorias`.
3. Crear productos en `/admin/productos/nuevo` (con imagen).
4. Verificar que aparezcan en `/catalogo`.

### Para visitantes (sin login)
1. Llegan a `arciblock.com`.
2. Click en "Catálogo" → ven todos los productos activos.
3. Click en "Cotizar" en cualquier producto → van a `/contacto` con el
   producto prellenado.

### Para gestión continua
- Editar producto: `/admin/productos` → toca el producto.
- Ocultar producto temporalmente: toggle "Activo" en la lista.
- Ver reportes de planta: `/admin/reportes`.
