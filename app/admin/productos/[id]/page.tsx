import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Categoria, Producto } from "@/lib/types";
import ProductoForm from "../ProductoForm";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditarProductoPage({ params }: PageProps) {
  const { id } = await params;

  if (id === "nuevo") notFound(); // ya hay una ruta /nuevo aparte

  const supabase = await createClient();
  const [{ data: producto }, { data: categorias }] = await Promise.all([
    supabase.from("productos_catalogo").select("*").eq("id", id).single(),
    supabase
      .from("categorias_catalogo")
      .select("*")
      .eq("activo", true)
      .order("orden"),
  ]);

  if (!producto) notFound();

  return (
    <div className="p-6 md:p-10">
      <header className="mb-8 flex items-start justify-between flex-wrap gap-4">
        <div>
          <Link
            href="/admin/productos"
            className="text-sm text-steel-400 hover:text-brand mb-3 inline-block"
          >
            ← Volver al catálogo
          </Link>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
            Editar producto
          </h1>
          <p className="text-steel-400">
            <code className="text-xs text-steel-500">{producto.slug}</code>
          </p>
        </div>
        <Link
          href={`/catalogo#${producto.slug}`}
          target="_blank"
          className="px-4 py-2 text-sm bg-steel-800 text-steel-300 rounded-lg hover:bg-steel-700"
        >
          Ver en sitio público ↗
        </Link>
      </header>

      <ProductoForm
        categorias={(categorias ?? []) as Categoria[]}
        producto={producto as Producto}
      />
    </div>
  );
}
