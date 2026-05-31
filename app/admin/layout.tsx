import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Panel admin — Arciblock",
};

// Forzar render dinámico (no cachear, esto cambia con la sesión)
export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Verificar que sea Root (defensa adicional al middleware)
  const { data: profile } = await supabase
    .from("profiles")
    .select("rol, email, nombre_completo")
    .eq("id", user.id)
    .single();

  if (!profile || profile.rol !== "root") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex bg-steel-950">
      <AdminSidebar email={profile.email} />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
