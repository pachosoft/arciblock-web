"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Categoria, Producto } from "@/lib/types";
import {
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "./actions";

interface Props {
  categorias: Categoria[];
  producto?: Producto | null;
}

export default function ProductoForm({ categorias, producto }: Props) {
  const router = useRouter();
  const esEdicion = !!producto;
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [preview, setPreview] = useState<string | null>(
    producto?.imagen_url ?? null,
  );
  const [quitarImagen, setQuitarImagen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setOk(false);
    const fd = new FormData(e.currentTarget);
    if (quitarImagen) fd.set("quitar_imagen", "on");

    startTransition(async () => {
      const res = esEdicion
        ? await actualizarProducto(producto!.id, fd)
        : await crearProducto(fd);
      if (res?.error) setError(res.error);
      else {
        setOk(true);
        setQuitarImagen(false);
        router.refresh();
      }
    });
  };

  const handleEliminar = () => {
    if (!confirm("¿Eliminar este producto? Esta acción no se puede deshacer.")) return;
    startTransition(async () => {
      await eliminarProducto(producto!.id);
    });
  };

  const onPreviewFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setPreview(URL.createObjectURL(f));
      setQuitarImagen(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-lg">
          {error}
        </div>
      )}
      {ok && (
        <div className="p-3 bg-green-500/10 border border-green-500/30 text-green-300 text-sm rounded-lg">
          Guardado correctamente.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Imagen */}
        <div className="lg:col-span-1">
          <label className="block text-xs text-steel-400 uppercase tracking-wider mb-2">
            Imagen
          </label>
          <div className="glass-card rounded-2xl p-4">
            <div className="aspect-[4/3] bg-steel-900 rounded-lg overflow-hidden mb-3 relative">
              {preview && !quitarImagen ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={preview}
                  alt="Vista previa"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-steel-700">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            <input
              type="file"
              name="imagen"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={onPreviewFile}
              className="w-full text-xs text-steel-400 file:mr-3 file:px-3 file:py-1.5 file:rounded file:border-0 file:bg-brand/20 file:text-brand file:text-xs file:font-semibold file:cursor-pointer hover:file:bg-brand/30"
            />
            {producto?.imagen_url && !quitarImagen && (
              <button
                type="button"
                onClick={() => {
                  setQuitarImagen(true);
                  setPreview(null);
                }}
                className="mt-2 text-xs text-red-400 hover:text-red-300"
              >
                Quitar imagen actual
              </button>
            )}
            {quitarImagen && (
              <p className="mt-2 text-xs text-amber-400">
                La imagen se quitará al guardar.
              </p>
            )}
            <p className="mt-3 text-[10px] text-steel-500">
              JPG, PNG o WebP. Máximo 5 MB. Recomendado 1200×900 px.
            </p>
          </div>
        </div>

        {/* Datos */}
        <div className="lg:col-span-2 space-y-5">
          <div>
            <label className="block text-xs text-steel-400 uppercase tracking-wider mb-2">
              Nombre del producto *
            </label>
            <input
              type="text"
              name="nombre"
              required
              defaultValue={producto?.nombre}
              placeholder="Ej: Soporte industrial reforzado"
              className="w-full px-4 py-2.5 bg-steel-900 border border-steel-700 rounded-lg text-white placeholder-steel-500 focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-xs text-steel-400 uppercase tracking-wider mb-2">
              Descripción
            </label>
            <textarea
              name="descripcion"
              rows={4}
              defaultValue={producto?.descripcion ?? ""}
              placeholder="Breve descripción del producto que aparecerá en el catálogo público..."
              className="w-full px-4 py-2.5 bg-steel-900 border border-steel-700 rounded-lg text-white placeholder-steel-500 focus:outline-none focus:border-brand resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-steel-400 uppercase tracking-wider mb-2">
                Categoría
              </label>
              <select
                name="categoria_id"
                defaultValue={producto?.categoria_id ?? ""}
                className="w-full px-4 py-2.5 bg-steel-900 border border-steel-700 rounded-lg text-white focus:outline-none focus:border-brand"
              >
                <option value="">Sin categoría</option>
                {categorias.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-steel-400 uppercase tracking-wider mb-2">
                Precio referencia (COP)
              </label>
              <input
                type="number"
                name="precio_referencia"
                min="0"
                step="100"
                defaultValue={producto?.precio_referencia ?? ""}
                placeholder="Dejar vacío = cotización a solicitud"
                className="w-full px-4 py-2.5 bg-steel-900 border border-steel-700 rounded-lg text-white placeholder-steel-500 focus:outline-none focus:border-brand"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-steel-400 uppercase tracking-wider mb-2">
                Orden
              </label>
              <input
                type="number"
                name="orden"
                defaultValue={producto?.orden ?? 0}
                className="w-full px-4 py-2.5 bg-steel-900 border border-steel-700 rounded-lg text-white focus:outline-none focus:border-brand"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-steel-200 cursor-pointer pt-7">
              <input
                type="checkbox"
                name="activo"
                defaultChecked={producto?.activo ?? true}
                className="w-4 h-4 rounded"
              />
              Activo (visible)
            </label>
            <label className="flex items-center gap-2 text-sm text-steel-200 cursor-pointer pt-7">
              <input
                type="checkbox"
                name="destacado"
                defaultChecked={producto?.destacado ?? false}
                className="w-4 h-4 rounded"
              />
              Destacado
            </label>
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="flex items-center justify-between gap-3 pt-4 border-t border-steel-800">
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={pending}
            className="px-6 py-3 bg-brand text-white font-semibold rounded-lg hover:bg-brand-600 disabled:opacity-50"
          >
            {pending
              ? "Guardando..."
              : esEdicion
                ? "Guardar cambios"
                : "Crear producto"}
          </button>
          <Link
            href="/admin/productos"
            className="px-6 py-3 bg-steel-800 text-steel-300 font-semibold rounded-lg hover:bg-steel-700"
          >
            Cancelar
          </Link>
        </div>
        {esEdicion && (
          <button
            type="button"
            onClick={handleEliminar}
            disabled={pending}
            className="px-4 py-3 text-red-400 hover:text-red-300 text-sm disabled:opacity-50"
          >
            Eliminar producto
          </button>
        )}
      </div>
    </form>
  );
}
