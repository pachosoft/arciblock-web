"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  desde: string;
  hasta: string;
  producto: string;
  operario: string;
  productos: { codigo: string; nombre: string }[];
  operarios: { documento_id: string; nombre: string }[];
}

export default function ReportesFilters({
  desde,
  hasta,
  producto,
  operario,
  productos,
  operarios,
}: Props) {
  const router = useRouter();
  const [vals, setVals] = useState({ desde, hasta, producto, operario });

  const aplicar = () => {
    const sp = new URLSearchParams();
    if (vals.desde) sp.set("desde", vals.desde);
    if (vals.hasta) sp.set("hasta", vals.hasta);
    if (vals.producto) sp.set("producto", vals.producto);
    if (vals.operario) sp.set("operario", vals.operario);
    router.push(`/admin/reportes?${sp.toString()}`);
  };

  const limpiar = () => {
    setVals({ desde: "", hasta: "", producto: "", operario: "" });
    router.push("/admin/reportes");
  };

  return (
    <div className="glass-card rounded-2xl p-5 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-[10px] text-steel-500 uppercase tracking-wider mb-1.5">
            Desde
          </label>
          <input
            type="date"
            value={vals.desde}
            onChange={(e) => setVals({ ...vals, desde: e.target.value })}
            className="w-full px-3 py-2 bg-steel-900 border border-steel-700 rounded-lg text-white text-sm focus:outline-none focus:border-brand"
          />
        </div>
        <div>
          <label className="block text-[10px] text-steel-500 uppercase tracking-wider mb-1.5">
            Hasta
          </label>
          <input
            type="date"
            value={vals.hasta}
            onChange={(e) => setVals({ ...vals, hasta: e.target.value })}
            className="w-full px-3 py-2 bg-steel-900 border border-steel-700 rounded-lg text-white text-sm focus:outline-none focus:border-brand"
          />
        </div>
        <div>
          <label className="block text-[10px] text-steel-500 uppercase tracking-wider mb-1.5">
            Producto
          </label>
          <select
            value={vals.producto}
            onChange={(e) => setVals({ ...vals, producto: e.target.value })}
            className="w-full px-3 py-2 bg-steel-900 border border-steel-700 rounded-lg text-white text-sm focus:outline-none focus:border-brand"
          >
            <option value="">Todos</option>
            {productos.map((p) => (
              <option key={p.codigo} value={p.codigo}>
                {p.codigo} - {p.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[10px] text-steel-500 uppercase tracking-wider mb-1.5">
            Operario
          </label>
          <select
            value={vals.operario}
            onChange={(e) => setVals({ ...vals, operario: e.target.value })}
            className="w-full px-3 py-2 bg-steel-900 border border-steel-700 rounded-lg text-white text-sm focus:outline-none focus:border-brand"
          >
            <option value="">Todos</option>
            {operarios.map((o) => (
              <option key={o.documento_id} value={o.documento_id}>
                {o.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={limpiar}
          className="px-4 py-2 text-sm text-steel-400 hover:text-white"
        >
          Limpiar filtros
        </button>
        <button
          onClick={aplicar}
          className="px-5 py-2 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-600"
        >
          Aplicar
        </button>
      </div>
    </div>
  );
}
