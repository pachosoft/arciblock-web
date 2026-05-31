import { createClient } from "@/lib/supabase/server";
import type { Categoria } from "@/lib/types";
import CategoriasList from "./CategoriasList";

export const dynamic = "force-dynamic";

export default async function AdminCategoriasPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("categorias_catalogo")
    .select("*")
    .order("orden");

  return (
    <div className="p-6 md:p-10 max-w-5xl">
      <header className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
          Categorías
        </h1>
        <p className="text-steel-400">
          Organiza el catálogo público en secciones. Los productos se agrupan por
          categoría en la página /catalogo.
        </p>
      </header>

      <CategoriasList categorias={(data ?? []) as Categoria[]} />
    </div>
  );
}
