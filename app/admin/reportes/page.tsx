import { createClient } from "@/lib/supabase/server";
import type { LiquidacionRow } from "@/lib/types";
import { formatMoneda, formatNumero, formatFecha, fechaIso } from "@/lib/format";
import ReportesFilters from "./ReportesFilters";
import ReportesExport from "./ReportesExport";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    desde?: string;
    hasta?: string;
    producto?: string;
    operario?: string;
  }>;
}

export default async function AdminReportesPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const hoy = new Date();
  const hace7 = new Date();
  hace7.setDate(hace7.getDate() - 7);

  const desde = sp.desde || fechaIso(hace7);
  const hasta = sp.hasta || fechaIso(hoy);
  const producto = sp.producto || "";
  const operario = sp.operario || "";

  const supabase = await createClient();

  // Listas para los selects
  const [{ data: productosLista }, { data: operariosLista }] = await Promise.all([
    supabase.from("productos").select("codigo, nombre").order("nombre"),
    supabase.from("operarios").select("documento_id, nombre").order("nombre"),
  ]);

  // Query principal
  let q = supabase
    .from("v_liquidacion")
    .select("*")
    .gte("fecha_registro", desde)
    .lte("fecha_registro", hasta);
  if (producto) q = q.eq("codigo_producto", producto);
  if (operario) q = q.eq("documento_id", operario);

  const { data: filas } = await q.order("fecha_registro", { ascending: false });
  const rows = (filas ?? []) as LiquidacionRow[];

  const totalUnidades = rows.reduce(
    (s, r) => s + Number(r.cantidad_individual ?? 0),
    0,
  );
  const totalValor = rows.reduce(
    (s, r) => s + Number(r.valor_liquidado ?? 0),
    0,
  );

  return (
    <div className="p-6 md:p-10 max-w-7xl">
      <header className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
          Reportes
        </h1>
        <p className="text-steel-400">
          Liquidación de producción. Calculada con reparto equitativo entre los
          operarios participantes en cada registro.
        </p>
      </header>

      {/* Filtros */}
      <ReportesFilters
        desde={desde}
        hasta={hasta}
        producto={producto}
        operario={operario}
        productos={productosLista ?? []}
        operarios={operariosLista ?? []}
      />

      {/* Totales */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="glass-card rounded-2xl p-5">
          <div className="text-[10px] text-steel-500 uppercase tracking-wider mb-1">
            Total unidades
          </div>
          <div className="text-2xl font-bold text-white">
            {formatNumero(totalUnidades)}
          </div>
        </div>
        <div className="glass-card rounded-2xl p-5 border-brand/30">
          <div className="text-[10px] text-steel-500 uppercase tracking-wider mb-1">
            Total liquidado
          </div>
          <div className="text-2xl font-bold brand-gradient-text">
            {formatMoneda(totalValor)}
          </div>
        </div>
      </div>

      {/* Exportar */}
      <div className="flex justify-end mb-4">
        <ReportesExport rows={rows} desde={desde} hasta={hasta} />
      </div>

      {/* Tabla */}
      {rows.length === 0 ? (
        <div className="glass-card rounded-2xl p-10 text-center text-steel-400">
          No hay producción registrada para los filtros seleccionados.
          <p className="text-xs text-steel-500 mt-2">
            Verifica que los procesos tengan precio asignado y que existan
            registros de producción en este rango de fechas.
          </p>
        </div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="bg-steel-900/50 border-b border-steel-800">
              <tr>
                <th className="px-4 py-3 text-left text-steel-400 text-xs uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-4 py-3 text-left text-steel-400 text-xs uppercase tracking-wider">
                  Operario
                </th>
                <th className="px-4 py-3 text-left text-steel-400 text-xs uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-4 py-3 text-left text-steel-400 text-xs uppercase tracking-wider">
                  Turno
                </th>
                <th className="px-4 py-3 text-right text-steel-400 text-xs uppercase tracking-wider">
                  Cant.
                </th>
                <th className="px-4 py-3 text-right text-steel-400 text-xs uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-4 py-3 text-right text-steel-400 text-xs uppercase tracking-wider">
                  Liquidado
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={`${r.fecha_registro}-${r.documento_id}-${i}`}
                  className="border-b border-steel-800/60 last:border-0 hover:bg-steel-900/30"
                >
                  <td className="px-4 py-3 text-steel-300 text-xs whitespace-nowrap">
                    {formatFecha(r.fecha_registro)}
                  </td>
                  <td className="px-4 py-3 text-white">
                    {r.nombre_operario}
                    <div className="text-xs text-steel-500">{r.documento_id}</div>
                  </td>
                  <td className="px-4 py-3 text-steel-300 text-sm">
                    {r.nombre_producto}
                  </td>
                  <td className="px-4 py-3 text-steel-400 text-xs">
                    {r.turno}
                    {r.pct_recargo > 0 && (
                      <span className="text-amber-400 ml-1">
                        +{Number(r.pct_recargo).toFixed(0)}%
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right text-steel-200">
                    {formatNumero(r.cantidad_individual)}
                  </td>
                  <td className="px-4 py-3 text-right text-steel-400 text-xs">
                    {formatMoneda(r.precio_unitario)}
                  </td>
                  <td className="px-4 py-3 text-right text-brand font-semibold whitespace-nowrap">
                    {formatMoneda(r.valor_liquidado)}
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
