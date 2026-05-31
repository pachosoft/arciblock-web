"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/format";

async function getContextoRoot() {
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
  return { supabase, empresaId: profile.empresa_id as string, userId: user.id };
}

function parseFormProducto(formData: FormData) {
  const nombre = String(formData.get("nombre") ?? "").trim();
  const descripcion = String(formData.get("descripcion") ?? "").trim() || null;
  const categoria_id = String(formData.get("categoria_id") ?? "").trim() || null;
  const precioStr = String(formData.get("precio_referencia") ?? "").trim();
  const precio_referencia = precioStr ? Number(precioStr.replace(/[^0-9.]/g, "")) : null;
  const orden = Number(formData.get("orden") ?? 0);
  const destacado = formData.get("destacado") === "on";
  const activo = formData.get("activo") === "on";
  return { nombre, descripcion, categoria_id, precio_referencia, orden, destacado, activo };
}

async function subirImagen(
  supabase: Awaited<ReturnType<typeof createClient>>,
  file: File,
  empresaId: string,
): Promise<string | null> {
  if (!file || file.size === 0) return null;
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("La imagen no puede pesar más de 5 MB");
  }
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeExt = ["jpg", "jpeg", "png", "webp", "gif"].includes(ext) ? ext : "jpg";
  const nombre = `${empresaId}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${safeExt}`;
  const { error } = await supabase.storage
    .from("catalogo-imagenes")
    .upload(nombre, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || `image/${safeExt}`,
    });
  if (error) throw new Error("Error subiendo imagen: " + error.message);

  const { data: pub } = supabase.storage
    .from("catalogo-imagenes")
    .getPublicUrl(nombre);
  return pub.publicUrl;
}

export async function crearProducto(formData: FormData) {
  const { supabase, empresaId } = await getContextoRoot();
  const datos = parseFormProducto(formData);
  if (!datos.nombre) return { error: "Nombre requerido" };

  // Imagen opcional
  let imagen_url: string | null = null;
  const file = formData.get("imagen") as File | null;
  if (file && typeof file === "object" && file.size > 0) {
    try {
      imagen_url = await subirImagen(supabase, file, empresaId);
    } catch (e) {
      return { error: (e as Error).message };
    }
  }

  const slug = slugify(datos.nombre);
  const { data, error } = await supabase
    .from("productos_catalogo")
    .insert({
      empresa_id: empresaId,
      nombre: datos.nombre,
      slug,
      descripcion: datos.descripcion,
      categoria_id: datos.categoria_id,
      precio_referencia: datos.precio_referencia,
      moneda: "COP",
      imagen_url,
      destacado: datos.destacado,
      orden: datos.orden,
      activo: datos.activo,
    })
    .select("id")
    .single();

  if (error) return { error: error.message };
  revalidatePath("/admin/productos");
  revalidatePath("/catalogo");
  redirect(`/admin/productos/${data.id}`);
}

export async function actualizarProducto(id: string, formData: FormData) {
  const { supabase, empresaId } = await getContextoRoot();
  const datos = parseFormProducto(formData);
  if (!datos.nombre) return { error: "Nombre requerido" };

  let imagen_url: string | null | undefined = undefined;

  // Si vino un archivo nuevo, lo subimos
  const file = formData.get("imagen") as File | null;
  if (file && typeof file === "object" && file.size > 0) {
    try {
      imagen_url = await subirImagen(supabase, file, empresaId);
    } catch (e) {
      return { error: (e as Error).message };
    }
  }

  // Si el usuario marcó "quitar imagen" la borramos
  if (formData.get("quitar_imagen") === "on") {
    imagen_url = null;
  }

  const update: Record<string, unknown> = {
    nombre: datos.nombre,
    slug: slugify(datos.nombre),
    descripcion: datos.descripcion,
    categoria_id: datos.categoria_id,
    precio_referencia: datos.precio_referencia,
    destacado: datos.destacado,
    orden: datos.orden,
    activo: datos.activo,
  };
  if (imagen_url !== undefined) update.imagen_url = imagen_url;

  const { error } = await supabase
    .from("productos_catalogo")
    .update(update)
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/productos");
  revalidatePath(`/admin/productos/${id}`);
  revalidatePath("/catalogo");
  return { ok: true };
}

export async function eliminarProducto(id: string) {
  const { supabase } = await getContextoRoot();
  const { error } = await supabase
    .from("productos_catalogo")
    .delete()
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/productos");
  revalidatePath("/catalogo");
  redirect("/admin/productos");
}

export async function toggleActivoProducto(id: string, activo: boolean) {
  const { supabase } = await getContextoRoot();
  const { error } = await supabase
    .from("productos_catalogo")
    .update({ activo })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/productos");
  revalidatePath("/catalogo");
  return { ok: true };
}
