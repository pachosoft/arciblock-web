"use client";

import { useState, useTransition } from "react";
import type { Categoria } from "@/lib/types";
import {
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from "./actions";

export default function CategoriasList({
  categorias,
}: {
  categorias: Categoria[];
}) {
  const [editando, setEditando] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleCrear = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await crearCategoria(fd);
      if (res.error) setError(res.error);
      else (e.target as HTMLFormElement).reset();
    });
  };

  const handleEliminar = async (id: string, nombre: string) => {
    if (!confirm(`¿Eliminar la categoría "${nombre}"? Los productos asignados quedarán sin categoría.`)) return;
    setError(null);
    startTransition(async () => {
      const res = await eliminarCategoria(id);
      if (res.error) setError(res.error);
    });
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-lg">
          {error}
        </div>
      )}

      {/* Formulario crear */}
      <form
        onSubmit={handleCrear}
        className="glass-card rounded-2xl p-5 flex flex-col md:flex-row gap-3 items-stretch md:items-end"
      >
        <div className="flex-1">
          <label className="block text-xs text-steel-400 uppercase tracking-wider mb-2">
            Nueva categoría
          </label>
          <input
            type="text"
            name="nombre"
            required
            placeholder="Ej: Componentes metalmecánicos"
            className="w-full px-4 py-2.5 bg-steel-900 border border-steel-700 rounded-lg text-white placeholder-steel-500 focus:outline-none focus:border-brand"
          />
        </div>
        <div className="md:w-28">
          <label className="block text-xs text-steel-400 uppercase tracking-wider mb-2">
            Orden
          </label>
          <input
            type="number"
            name="orden"
            defaultValue={categorias.length + 1}
            className="w-full px-4 py-2.5 bg-steel-900 border border-steel-700 rounded-lg text-white focus:outline-none focus:border-brand"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="px-5 py-2.5 bg-brand text-white font-semibold rounded-lg hover:bg-brand-600 disabled:opacity-50"
        >
          {pending ? "Guardando..." : "Crear"}
        </button>
      </form>

      {/* Tabla */}
      {categorias.length === 0 ? (
        <div className="glass-card rounded-2xl p-10 text-center text-steel-400">
          Aún no hay categorías. Crea la primera arriba.
        </div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-steel-900/50 border-b border-steel-800">
              <tr>
                <th className="px-5 py-3 text-left text-steel-400 text-xs uppercase tracking-wider w-16">
                  Orden
                </th>
                <th className="px-5 py-3 text-left text-steel-400 text-xs uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-5 py-3 text-left text-steel-400 text-xs uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((c) => (
                <FilaCategoria
                  key={c.id}
                  categoria={c}
                  editando={editando === c.id}
                  onEditar={() => setEditando(c.id)}
                  onCancelar={() => setEditando(null)}
                  onGuardado={() => setEditando(null)}
                  onEliminar={() => handleEliminar(c.id, c.nombre)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function FilaCategoria({
  categoria,
  editando,
  onEditar,
  onCancelar,
  onGuardado,
  onEliminar,
}: {
  categoria: Categoria;
  editando: boolean;
  onEditar: () => void;
  onCancelar: () => void;
  onGuardado: () => void;
  onEliminar: () => void;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await actualizarCategoria(categoria.id, fd);
      if (res.error) setError(res.error);
      else onGuardado();
    });
  };

  if (editando) {
    return (
      <tr className="border-b border-steel-800/60 last:border-0 bg-steel-900/30">
        <td colSpan={4} className="p-4">
          <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 items-end">
            <div className="w-20">
              <label className="block text-[10px] text-steel-500 uppercase mb-1">
                Orden
              </label>
              <input
                type="number"
                name="orden"
                defaultValue={categoria.orden}
                className="w-full px-3 py-2 bg-steel-900 border border-steel-700 rounded text-white text-sm"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-[10px] text-steel-500 uppercase mb-1">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                defaultValue={categoria.nombre}
                required
                className="w-full px-3 py-2 bg-steel-900 border border-steel-700 rounded text-white text-sm"
              />
            </div>
            <label className="flex items-center gap-2 text-xs text-steel-300 px-3 py-2">
              <input
                type="checkbox"
                name="activo"
                defaultChecked={categoria.activo}
                className="rounded"
              />
              Activo
            </label>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={pending}
                className="px-3 py-2 bg-brand text-white text-xs font-semibold rounded hover:bg-brand-600 disabled:opacity-50"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={onCancelar}
                className="px-3 py-2 bg-steel-800 text-steel-300 text-xs rounded hover:bg-steel-700"
              >
                Cancelar
              </button>
            </div>
            {error && (
              <div className="w-full text-red-400 text-xs">{error}</div>
            )}
          </form>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-b border-steel-800/60 last:border-0">
      <td className="px-5 py-3 text-steel-500 text-xs">{categoria.orden}</td>
      <td className="px-5 py-3 text-white">{categoria.nombre}</td>
      <td className="px-5 py-3">
        {categoria.activo ? (
          <span className="inline-flex items-center gap-1.5 text-xs text-green-400">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
            Activa
          </span>
        ) : (
          <span className="text-xs text-steel-500">Inactiva</span>
        )}
      </td>
      <td className="px-5 py-3 text-right">
        <div className="inline-flex gap-3">
          <button
            onClick={onEditar}
            className="text-brand hover:text-brand-400 text-xs"
          >
            Editar
          </button>
          <button
            onClick={onEliminar}
            className="text-red-400 hover:text-red-300 text-xs"
          >
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
}
