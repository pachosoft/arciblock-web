"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/format";

async function getEmpresaIdYverificarRoot(): Promise<string> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("No autenticado");

  const { data: profile } = await supabase
    .from("profiles")
    .select("empresa_id, rol")
    .eq("id", user.id)
    .single();
  if (!profile || profile.rol !== "root") throw new Error("Solo Root puede ejecutar esto");
  return profile.empresa_id as string;
}

export async function crearCategoria(formData: FormData) {
  const supabase = await createClient();
  const empresa_id = await getEmpresaIdYverificarRoot();

  const nombre = String(formData.get("nombre") ?? "").trim();
  const orden = Number(formData.get("orden") ?? 0);

  if (!nombre) return { error: "Nombre requerido" };

  const slug = slugify(nombre);
  const { error } = await supabase.from("categorias_catalogo").insert({
    empresa_id,
    nombre,
    slug,
    orden,
    activo: true,
  });

  if (error) return { error: error.message };
  revalidatePath("/admin/categorias");
  revalidatePath("/catalogo");
  return { ok: true };
}

export async function actualizarCategoria(id: string, formData: FormData) {
  const supabase = await createClient();
  await getEmpresaIdYverificarRoot();

  const nombre = String(formData.get("nombre") ?? "").trim();
  const orden = Number(formData.get("orden") ?? 0);
  const activo = formData.get("activo") === "on";

  if (!nombre) return { error: "Nombre requerido" };

  const { error } = await supabase
    .from("categorias_catalogo")
    .update({ nombre, slug: slugify(nombre), orden, activo })
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/categorias");
  revalidatePath("/catalogo");
  return { ok: true };
}

export async function eliminarCategoria(id: string) {
  const supabase = await createClient();
  await getEmpresaIdYverificarRoot();

  const { error } = await supabase
    .from("categorias_catalogo")
    .delete()
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/categorias");
  revalidatePath("/catalogo");
  return { ok: true };
}
