"use client";

import { useTransition } from "react";
import type { ProductoConCategoria } from "@/lib/types";
import { toggleActivoProducto } from "./actions";

export default function ProductoActions({
  producto,
}: {
  producto: ProductoConCategoria;
}) {
  const [pending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await toggleActivoProducto(producto.id, !producto.activo);
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={pending}
      className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded transition-colors ${
        producto.activo
          ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
          : "bg-steel-800 text-steel-400 hover:bg-steel-700"
      } disabled:opacity-50`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          producto.activo ? "bg-green-400" : "bg-steel-500"
        }`}
      />
      {producto.activo ? "Activo" : "Oculto"}
    </button>
  );
}
