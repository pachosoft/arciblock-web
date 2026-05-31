import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatMoneda } from "@/lib/format";
import type { ProductoConCategoria } from "@/lib/types";
import ProductoActions from "./ProductoActions";

export const dynamic = "force-dynamic";

export default async function AdminProductosPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("productos_catalogo")
    .select("*, categoria:categorias_catalogo(id, nombre, slug)")
    .order("orden");

  const productos = (data ?? []) as ProductoConCategoria[];

  return (
    <div className="p-6 md:p-10 max-w-7xl">
      <header className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
            Catálogo
          </h1>
          <p className="text-steel-400">
            Gestiona los productos que aparecen en la página /catalogo del sitio público.
          </p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="px-5 py-3 bg-brand text-white font-semibold rounded-lg hover:bg-brand-600"
        >
          + Nuevo producto
        </Link>
      </header>

      {productos.length === 0 ? (
        <div className="glass-card rounded-2xl p-10 text-center">
          <p className="text-steel-400 mb-4">
            No tienes productos aún. Crea el primero para empezar.
          </p>
          <Link
            href="/admin/productos/nuevo"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-600"
          >
            Crear primer producto
          </Link>
        </div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-steel-900/50 border-b border-steel-800">
              <tr>
                <th className="px-5 py-3 text-left text-steel-400 text-xs uppercase tracking-wider">
                  Imagen
                </th>
                <th className="px-5 py-3 text-left text-steel-400 text-xs uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-5 py-3 text-left text-steel-400 text-xs uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-5 py-3 text-left text-steel-400 text-xs uppercase tracking-wider">
                  Precio ref.
                </th>
                <th className="px-5 py-3 text-left text-steel-400 text-xs uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-steel-800/60 last:border-0 hover:bg-steel-900/30"
                >
                  <td className="px-5 py-3">
                    <div className="w-14 h-14 bg-steel-900 rounded overflow-hidden border border-steel-800">
                      {p.imagen_url ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={p.imagen_url}
                          alt={p.nombre}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-steel-700">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{p.nombre}</span>
                      {p.destacado && (
                        <span className="px-1.5 py-0.5 bg-amber/20 text-amber-400 text-[10px] font-bold rounded">
                          DEST.
                        </span>
                      )}
                    </div>
                    {p.descripcion && (
                      <div className="text-steel-500 text-xs mt-0.5 line-clamp-1">
                        {p.descripcion}
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-3 text-steel-300 text-xs">
                    {p.categoria?.nombre || (
                      <span className="text-steel-500">Sin categoría</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-steel-300">
                    {p.precio_referencia != null
                      ? formatMoneda(p.precio_referencia)
                      : <span className="text-steel-500 text-xs">A cotizar</span>}
                  </td>
                  <td className="px-5 py-3">
                    <ProductoActions producto={p} />
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      href={`/admin/productos/${p.id}`}
                      className="text-brand hover:text-brand-400 text-xs font-semibold"
                    >
                      Editar →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
