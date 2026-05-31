"use client";

import type { LiquidacionRow } from "@/lib/types";
import { formatFecha } from "@/lib/format";

export default function ReportesExport({
  rows,
  desde,
  hasta,
}: {
  rows: LiquidacionRow[];
  desde: string;
  hasta: string;
}) {
  const exportar = () => {
    if (rows.length === 0) return;

    const headers = [
      "Fecha",
      "Operario",
      "Documento",
      "Producto",
      "Codigo producto",
      "Turno",
      "Recargo %",
      "Centro de costo",
      "Cantidad",
      "Precio unitario",
      "Valor liquidado",
    ];

    const escape = (v: unknown) => {
      const s = v == null ? "" : String(v);
      return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };

    const lineas = [
      headers.join(";"),
      ...rows.map((r) =>
        [
          formatFecha(r.fecha_registro),
          r.nombre_operario,
          r.documento_id,
          r.nombre_producto,
          r.codigo_producto,
          r.turno,
          r.pct_recargo,
          r.centro_costo,
          r.cantidad_individual,
          r.precio_unitario,
          r.valor_liquidado,
        ]
          .map(escape)
          .join(";"),
      ),
    ];

    // Excel español: BOM + separador ; reconoce mejor los acentos y moneda
    const blob = new Blob(["\uFEFF" + lineas.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `liquidacion_${desde}_a_${hasta}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={exportar}
      disabled={rows.length === 0}
      className="px-4 py-2 bg-steel-800 border border-steel-700 text-steel-300 text-sm font-semibold rounded-lg hover:bg-steel-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Exportar CSV
    </button>
  );
}
