import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Categoria } from "@/lib/types";
import ProductoForm from "../ProductoForm";

export const dynamic = "force-dynamic";

export default async function NuevoProductoPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("categorias_catalogo")
    .select("*")
    .eq("activo", true)
    .order("orden");

  return (
    <div className="p-6 md:p-10">
      <header className="mb-8">
        <Link
          href="/admin/productos"
          className="text-sm text-steel-400 hover:text-brand mb-3 inline-block"
        >
          ← Volver al catálogo
        </Link>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
          Nuevo producto
        </h1>
        <p className="text-steel-400">
          Los campos marcados con * son obligatorios. Una vez creado, podrás
          editarlo cuando quieras.
        </p>
      </header>

      <ProductoForm categorias={(data ?? []) as Categoria[]} />
    </div>
  );
}
