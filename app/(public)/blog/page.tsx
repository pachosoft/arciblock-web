import Link from "next/link";

export const metadata = {
  title: "Blog — Arciblock",
  description:
    "Guías prácticas sobre productos de arcilla para construcción: cómo elegir bloques, ladrillos, fachaletas y adoquines. Tips para constructores y autoconstructores.",
};

export const posts = [
  {
    slug: "como-calcular-cuantos-bloques-necesito",
    titulo: "Cómo calcular cuántos bloques o ladrillos necesitas para tu obra",
    excerpt:
      "Una guía simple para sacar la cuenta sin equivocarte. Te muestro la fórmula básica por metro cuadrado de muro, cuánto desperdicio considerar y los errores comunes que hacen comprar de menos.",
    fecha: "2026-01-20",
    categoria: "Cálculos",
    minutos: 7,
  },
  {
    slug: "bloque-h-vs-ladrillo-tolete",
    titulo: "Bloque H vs ladrillo tolete: ¿cuál conviene para tu obra?",
    excerpt:
      "Ambos sirven para muros, pero tienen propósitos distintos. Te explico cuándo usar cada uno según el tipo de muro, presupuesto, peso y velocidad de la obra.",
    fecha: "2026-01-10",
    categoria: "Guías",
    minutos: 6,
  },
  {
    slug: "fachaleta-de-arcilla-instalacion",
    titulo: "Fachaleta de arcilla: cómo instalarla y que dure años",
    excerpt:
      "La fachaleta da el toque visual de ladrillo a la vista sin el peso ni el costo. Te cuento cómo prepararla, qué mortero usar y los trucos para evitar que se desprenda con el tiempo.",
    fecha: "2025-12-28",
    categoria: "Instalación",
    minutos: 8,
  },
];

const formatoFecha = (iso: string) => {
  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];
  const d = new Date(iso);
  return `${d.getDate()} de ${meses[d.getMonth()]} de ${d.getFullYear()}`;
};

export default function BlogPage() {
  return (
    <>
      <section className="py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight">
            <span className="brand-gradient-text">Blog</span>
          </h1>
          <p className="mt-6 text-lg text-steel-300 max-w-2xl mx-auto leading-relaxed">
            Guías prácticas y consejos sobre construcción con productos de
            arcilla, escritos para constructores, maestros de obra y
            autoconstructores.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="glass-card rounded-2xl p-8 hover:scale-[1.01] transition-transform cursor-pointer">
                <div className="flex flex-wrap items-center gap-3 mb-3 text-xs">
                  <span className="px-3 py-1 bg-brand/20 text-brand font-semibold rounded-full">
                    {post.categoria}
                  </span>
                  <span className="text-steel-500">{formatoFecha(post.fecha)}</span>
                  <span className="text-steel-500">·</span>
                  <span className="text-steel-500">{post.minutos} min de lectura</span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                  {post.titulo}
                </h2>
                <p className="text-steel-400 leading-relaxed">{post.excerpt}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-brand font-semibold text-sm">
                  Leer artículo
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
