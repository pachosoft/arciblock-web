"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import Logo from "@/components/Logo";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}

function LoginFallback() {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12">
      <div className="text-steel-400">Cargando...</div>
    </div>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const [mostrar, setMostrar] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCargando(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setError(traducirError(error.message));
      setCargando(false);
      return;
    }

    // Verificar que el usuario sea Root
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("rol")
        .eq("id", user.id)
        .single();

      if (profile?.rol !== "root") {
        await supabase.auth.signOut();
        setError(
          "Tu usuario no tiene permisos para acceder al panel web. Contacta al administrador.",
        );
        setCargando(false);
        return;
      }
    }

    router.push(redirect);
    router.refresh();
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <Logo size="lg" variant="with-tagline" />
          </div>
          <h1 className="text-2xl font-bold text-white mt-6">
            Panel de administración
          </h1>
          <p className="text-steel-400 text-sm mt-2">
            Ingresa con tu cuenta Root para gestionar el sitio.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-5">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs text-steel-400 uppercase tracking-wider mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-steel-900 border border-steel-700 rounded-lg text-white placeholder-steel-500 focus:outline-none focus:border-brand transition-colors"
              placeholder="admin@arciblock.com"
            />
          </div>

          <div>
            <label className="block text-xs text-steel-400 uppercase tracking-wider mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={mostrar ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 bg-steel-900 border border-steel-700 rounded-lg text-white placeholder-steel-500 focus:outline-none focus:border-brand transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setMostrar(!mostrar)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-steel-400 hover:text-white text-xs"
              >
                {mostrar ? "Ocultar" : "Ver"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="w-full px-6 py-3.5 bg-brand text-white font-semibold rounded-lg hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cargando ? "Ingresando..." : "Ingresar"}
          </button>

          <p className="text-center text-xs text-steel-500">
            <Link href="/" className="hover:text-steel-300">
              ← Volver al sitio público
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

function traducirError(msg: string): string {
  const l = msg.toLowerCase();
  if (l.includes("invalid login credentials"))
    return "Correo o contraseña incorrectos.";
  if (l.includes("email not confirmed"))
    return "Debes confirmar tu correo antes de ingresar.";
  if (l.includes("user not found")) return "No existe una cuenta con ese correo.";
  if (l.includes("rate limit"))
    return "Demasiados intentos. Espera unos minutos.";
  return msg;
}