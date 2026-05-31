/**
 * Formateadores comunes para presentación.
 */

export function formatMoneda(valor: number | null | undefined, moneda = "COP"): string {
  if (valor == null) return "—";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: moneda,
    maximumFractionDigits: 0,
  }).format(valor);
}

export function formatNumero(valor: number | null | undefined): string {
  if (valor == null) return "0";
  return new Intl.NumberFormat("es-CO", {
    maximumFractionDigits: 2,
  }).format(valor);
}

export function formatFecha(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}

export function fechaIso(d: Date): string {
  return d.toISOString().substring(0, 10);
}

export function slugify(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
