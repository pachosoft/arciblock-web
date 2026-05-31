import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatMoneda, formatNumero, formatFecha } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Métricas básicas
  const [
    { count: totalProductos },
    { count: productosActivos },
    { count: totalCategorias },
    { data: produccionHoyData },
  ] = await Promise.all([
    supabase
      .from("productos_catalogo")
      .select("id", { count: "exact", head: true }),
    supabase
      .from("productos_catalogo")
      .select("id", { count: "exact", head: true })
      .eq("activo", true),
    supabase
      .from("categorias_catalogo")
      .select("id", { count: "exact", head: true }),
    supabase
      .from("v_liquidacion")
      .select("cantidad_individual, valor_liquidado")
      .eq("fecha_registro", new Date().toISOString().substring(0, 10)),
  ]);

  const unidadesHoy = (produccionHoyData ?? []).reduce(
    (acc, r) => acc + Number(r.cantidad_individual ?? 0),
    0,
  );
  const valorHoy = (produccionHoyData ?? []).reduce(
    (acc, r) => acc + Number(r.valor_liquidado ?? 0),
    0,
  );

  // Últimos productos editados
  const { data: ultimos } = await supabase
    .from("productos_catalogo")
    .select("id, nombre, activo, updated_at")
    .order("updated_at", { ascending: false })
    .limit(5);

  return (
    <div className="p-6 md:p-10 max-w-7xl">
      <header className="mb-10">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
          Dashboard
        </h1>
        <p className="text-steel-400">
          Resumen rápido del sitio y operación. {formatFecha(new Date().toISOString())}
        </p>
      </header>

      {/* Métricas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <MetricCard
          label="Productos publicados"
          value={String(productosActivos ?? 0)}
          sub={`de ${totalProductos ?? 0} en total`}
        />
        <MetricCard
          label="Categorías"
          value={String(totalCategorias ?? 0)}
        />
        <MetricCard
          label="Producción hoy"
          value={formatNumero(unidadesHoy) + " uds"}
          sub="suma de operarios"
          highlight
        />
        <MetricCard
          label="Liquidado hoy"
          value={formatMoneda(valorHoy)}
          sub="basado en producción"
          highlight
        />
      </div>

      {/* Acciones rápidas */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-4">Acciones rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ActionCard
            href="/admin/productos/nuevo"
            title="Crear producto"
            description="Agrega un nuevo ítem al catálogo público."
          />
          <ActionCard
            href="/admin/categorias"
            title="Gestionar categorías"
            description="Organiza el catálogo en secciones."
          />
          <ActionCard
            href="/admin/reportes"
            title="Ver reportes"
            description="Liquidación de producción y exportación."
          />
        </div>
      </section>

      {/* Últimos productos */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Últimos editados</h2>
          <Link
            href="/admin/productos"
            className="text-sm text-brand hover:text-brand-400"
          >
            Ver todos →
          </Link>
        </div>

        {ultimos && ultimos.length > 0 ? (
          <div className="glass-card rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-steel-900/50 border-b border-steel-800">
                <tr>
                  <th className="px-5 py-3 text-left text-steel-400 text-xs uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-5 py-3 text-left text-steel-400 text-xs uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-5 py-3 text-left text-steel-400 text-xs uppercase tracking-wider">
                    Última edición
                  </th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {ultimos.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-steel-800/60 last:border-0"
                  >
                    <td className="px-5 py-3 text-white">{p.nombre}</td>
                    <td className="px-5 py-3">
                      {p.activo ? (
                        <span className="inline-flex items-center gap-1.5 text-xs text-green-400">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                          Activo
                        </span>
                      ) : (
                        <span className="text-xs text-steel-500">Inactivo</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-steel-400 text-xs">
                      {formatFecha(p.updated_at)}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Link
                        href={`/admin/productos/${p.id}`}
                        className="text-brand hover:text-brand-400 text-xs"
                      >
                        Editar →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-10 text-center">
            <p className="text-steel-400">
              Aún no hay productos. Empieza creando uno.
            </p>
            <Link
              href="/admin/productos/nuevo"
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-600"
            >
              Crear primer producto
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

function MetricCard({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`glass-card rounded-2xl p-5 ${
        highlight ? "border-brand/30" : ""
      }`}
    >
      <div className="text-[10px] text-steel-500 uppercase tracking-wider mb-1">
        {label}
      </div>
      <div
        className={`text-2xl font-bold ${
          highlight ? "brand-gradient-text" : "text-white"
        }`}
      >
        {value}
      </div>
      {sub && <div className="text-xs text-steel-500 mt-1">{sub}</div>}
    </div>
  );
}

function ActionCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="glass-card rounded-2xl p-5 hover:border-brand/40 transition-colors block"
    >
      <h3 className="text-white font-bold mb-1">{title}</h3>
      <p className="text-steel-400 text-sm">{description}</p>
      <span className="text-brand text-xs font-semibold mt-3 inline-block">
        Ir →
      </span>
    </Link>
  );
}
