import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatMoneda } from "@/lib/format";
import type { Categoria, ProductoConCategoria } from "@/lib/types";

export const metadata = {
  title: "Catálogo — Arciblock",
  description:
    "Catálogo de productos y servicios industriales de Arciblock. Componentes, prototipos y soluciones para tu cadena productiva.",
};

// Revalidar cada 60 segundos (ISR) — cambios del admin aparecen rápido
export const revalidate = 60;

export default async function CatalogoPage() {
  const supabase = await createClient();

  // Lectura pública gracias a RLS de la tabla (anon puede leer activos)
  const { data: categorias } = await supabase
    .from("categorias_catalogo")
    .select("*")
    .order("orden");

  const { data: productos } = await supabase
    .from("productos_catalogo")
    .select("*, categoria:categorias_catalogo(id, nombre, slug)")
    .order("destacado", { ascending: false })
    .order("orden");

  const cats = (categorias ?? []) as Categoria[];
  const prods = (productos ?? []) as ProductoConCategoria[];

  // Si no hay categorías ni productos, mostrar mensaje
  if (prods.length === 0) {
    return (
      <section className="py-20 md:py-28 min-h-[60vh]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight">
            <span className="brand-gradient-text">Catálogo</span>
          </h1>
          <p className="mt-8 text-steel-300">
            Estamos cargando nuestro catálogo. Vuelve pronto.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-brand text-white font-semibold rounded-lg hover:bg-brand-600 transition-colors"
          >
            Solicitar cotización directa
          </Link>
        </div>
      </section>
    );
  }

  // Agrupar productos por categoría
  const productosPorCategoria = new Map<string, ProductoConCategoria[]>();
  const sinCategoria: ProductoConCategoria[] = [];

  for (const p of prods) {
    if (p.categoria_id) {
      const list = productosPorCategoria.get(p.categoria_id) ?? [];
      list.push(p);
      productosPorCategoria.set(p.categoria_id, list);
    } else {
      sinCategoria.push(p);
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 industrial-grid opacity-20 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight">
            Nuestro <span className="brand-gradient-text">catálogo</span>
          </h1>
          <p className="mt-6 text-lg text-steel-300 max-w-2xl mx-auto leading-relaxed">
            Bloques H, ladrillos, pisos de gres, fachaletas y adoquines de
            arcilla. Disponibles para despacho a toda Colombia.
          </p>

          {/* Anclas a categorías */}
          {cats.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2 justify-center">
              {cats.map((c) => {
                const tieneProductos =
                  (productosPorCategoria.get(c.id)?.length ?? 0) > 0;
                if (!tieneProductos) return null;
                return (
                  <a
                    key={c.id}
                    href={`#${c.slug}`}
                    className="px-4 py-2 bg-steel-800/60 border border-steel-700 text-sm text-steel-300 hover:text-white hover:border-brand/50 rounded-lg transition-colors"
                  >
                    {c.nombre}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Catálogo por categorías */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {cats.map((cat) => {
            const items = productosPorCategoria.get(cat.id) ?? [];
            if (items.length === 0) return null;

            return (
              <div key={cat.id} id={cat.slug} className="scroll-mt-24">
                <div className="flex items-end justify-between mb-8 border-b border-steel-800 pb-4">
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
                    {cat.nombre}
                  </h2>
                  <span className="text-sm text-steel-500">
                    {items.length} {items.length === 1 ? "ítem" : "ítems"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((p) => (
                    <CatalogoCard key={p.id} producto={p} />
                  ))}
                </div>
              </div>
            );
          })}

          {/* Productos sin categoría */}
          {sinCategoria.length > 0 && (
            <div>
              <div className="flex items-end justify-between mb-8 border-b border-steel-800 pb-4">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
                  Otros productos
                </h2>
                <span className="text-sm text-steel-500">
                  {sinCategoria.length} ítems
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sinCategoria.map((p) => (
                  <CatalogoCard key={p.id} producto={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 bg-steel-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            ¿No encuentras la medida que necesitas?
          </h2>
          <p className="text-steel-400 mb-8">
            También fabricamos por encargo. Cuéntanos las especificaciones y el
            volumen, y te preparamos una cotización con flete incluido a tu
            obra.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand text-white font-semibold rounded-lg hover:bg-brand-600 transition-all hover:scale-105"
          >
            Pedir cotización
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}

function CatalogoCard({ producto }: { producto: ProductoConCategoria }) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform">
      {/* Imagen */}
      <div className="aspect-[4/3] bg-steel-900 relative overflow-hidden">
        {producto.imagen_url ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={producto.imagen_url}
            alt={producto.nombre}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-steel-700">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        )}
        {producto.destacado && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-amber/95 text-steel-950 text-[10px] font-bold uppercase tracking-wider rounded">
            Destacado
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-5">
        <h3 className="text-white font-bold text-lg mb-1 leading-tight">
          {producto.nombre}
        </h3>
        {producto.descripcion && (
          <p className="text-steel-400 text-sm leading-relaxed mb-4 line-clamp-3">
            {producto.descripcion}
          </p>
        )}

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-steel-800/60">
          <div>
            {producto.precio_referencia != null ? (
              <>
                <div className="text-[10px] text-steel-500 uppercase tracking-wider">
                  Desde
                </div>
                <div className="text-brand font-bold">
                  {formatMoneda(producto.precio_referencia, producto.moneda)}
                </div>
              </>
            ) : (
              <div className="text-xs text-steel-500">
                Cotización a solicitud
              </div>
            )}
          </div>
          <Link
            href={`/contacto?producto=${encodeURIComponent(producto.nombre)}`}
            className="px-4 py-2 bg-brand/10 border border-brand/30 text-brand text-xs font-semibold rounded-lg hover:bg-brand hover:text-white transition-colors"
          >
            Cotizar
          </Link>
        </div>
      </div>
    </div>
  );
}
