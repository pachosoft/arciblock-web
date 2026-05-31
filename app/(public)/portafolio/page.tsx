import Link from "next/link";

export const metadata = {
  title: "Portafolio — Arciblock",
  description:
    "Proyectos donde participamos como proveedor de productos de arcilla: viviendas, edificaciones, espacios públicos y obras de acabados.",
};

// NOTA: Estos son proyectos genéricos de ejemplo.
// Reemplazar con casos reales cuando los tengas.
const proyectos = [
  {
    id: "urbanizacion-vis",
    titulo: "Urbanización VIS — 80 viviendas",
    cliente: "Constructor regional",
    descripcion:
      "Suministro de bloque H #5 y ladrillo tolete para muros estructurales y divisorios de 80 unidades de vivienda de interés social.",
    tags: ["Bloque H", "Ladrillo tolete", "Volumen"],
    destacado: true,
    href: "/contacto",
    metrics: [
      { label: "Unidades", value: "350K" },
      { label: "Tiempo despacho", value: "6 sem" },
    ],
  },
  {
    id: "casa-campestre",
    titulo: "Casa campestre con fachaleta",
    cliente: "Particular",
    descripcion:
      "Suministro de fachaleta rústica para revestimiento exterior. La casa quedó con estética colonial moderna que el cliente buscaba.",
    tags: ["Fachaleta", "Acabados", "Vivienda"],
  },
  {
    id: "andenes-parque",
    titulo: "Andenes y senderos de parque",
    cliente: "Obra municipal",
    descripcion:
      "Adoquines de arcilla para 1.200 m² de andenes peatonales en parque público. Acabado tradicional que armoniza con el entorno.",
    tags: ["Adoquines", "Espacio público", "1.200 m²"],
  },
  {
    id: "remodelacion-finca",
    titulo: "Remodelación de finca cafetera",
    cliente: "Cliente particular",
    descripcion:
      "Suministro de piso de gres para corredores y zona social. El cliente quería el aire rústico característico de las fincas cafeteras.",
    tags: ["Piso de gres", "Remodelación", "Rústico"],
  },
  {
    id: "deposito-distribuidor",
    titulo: "Abastecimiento de depósito de materiales",
    cliente: "Distribuidor",
    descripcion:
      "Surtido mensual de productos para depósito de materiales de construcción en Bucaramanga. Despacho programado quincenal.",
    tags: ["Distribuidor", "Recurrente", "Bucaramanga"],
  },
  {
    id: "fachada-comercial",
    titulo: "Fachada de local comercial",
    cliente: "Diseñador",
    descripcion:
      "Ladrillo prensado a la vista para fachada de local comercial. El diseñador quería textura industrial cálida que destacara en la calle.",
    tags: ["Ladrillo a la vista", "Comercial", "Diseño"],
  },
];

export default function PortafolioPage() {
  const destacado = proyectos.find((p) => p.destacado);
  const otros = proyectos.filter((p) => !p.destacado);

  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight">
            Nuestras <span className="brand-gradient-text">obras</span>
          </h1>
          <p className="mt-6 text-lg text-steel-300 max-w-2xl mx-auto leading-relaxed">
            Una selección de proyectos donde nuestros productos de arcilla
            forman parte de la obra terminada.
          </p>
        </div>
      </section>

      {destacado && (
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href={destacado.href || "#"}>
              <div className="group bg-gradient-to-br from-steel-800 to-steel-900 border border-steel-700 hover:border-brand/50 rounded-3xl overflow-hidden transition-all hover:scale-[1.01]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 md:p-12">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/20 text-brand text-xs font-semibold rounded-full mb-4">
                      PROYECTO DESTACADO
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                      {destacado.titulo}
                    </h2>
                    <p className="text-brand text-sm mb-4">{destacado.cliente}</p>
                    <p className="text-steel-300 leading-relaxed mb-6">
                      {destacado.descripcion}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {destacado.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-steel-800 text-steel-300 text-xs rounded-md border border-steel-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {destacado.metrics && (
                      <div className="grid grid-cols-2 gap-6 mb-6">
                        {destacado.metrics.map((m) => (
                          <div key={m.label}>
                            <div className="text-2xl font-bold brand-gradient-text">
                              {m.value}
                            </div>
                            <div className="text-xs text-steel-400 mt-1">{m.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="inline-flex items-center gap-2 text-brand font-semibold">
                      Cotizar caso similar
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>

                  <div className="relative flex justify-center">
                    <div className="w-full max-w-sm bg-steel-950 rounded-2xl border-2 border-steel-700 p-5 shadow-2xl">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs text-steel-400">PEDIDO EN CURSO</span>
                      </div>
                      <div className="text-white text-lg font-bold mb-4">VIS - Etapa 2</div>

                      <div className="bg-brand/10 border border-brand/30 rounded-lg p-3 mb-3">
                        <div className="text-xs text-brand mb-1">Bloque H #5</div>
                        <div className="text-white text-2xl font-bold">280K uds</div>
                        <div className="text-xs text-steel-400 mt-1">Despachadas a obra</div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-steel-800 rounded-lg p-3">
                          <div className="text-[10px] text-steel-400 mb-1">Avance</div>
                          <div className="text-white font-bold">80%</div>
                        </div>
                        <div className="bg-steel-800 rounded-lg p-3">
                          <div className="text-[10px] text-steel-400 mb-1">QA</div>
                          <div className="text-white font-bold">100%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-white mb-8">
            Otros proyectos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otros.map((p) => (
              <div
                key={p.id}
                className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-transform"
              >
                <h3 className="text-white font-bold text-lg mb-1">{p.titulo}</h3>
                <p className="text-brand text-xs mb-3">{p.cliente}</p>
                <p className="text-steel-400 text-sm leading-relaxed mb-4">
                  {p.descripcion}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-steel-800 text-steel-300 text-[11px] rounded border border-steel-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-steel-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Tu obra será la siguiente?
          </h2>
          <p className="text-steel-400 mb-8">
            Sea una vivienda, un proyecto urbanístico o solo el patio de tu
            casa, te ayudamos con el material correcto.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand text-white font-semibold rounded-lg hover:bg-brand-600 transition-all hover:scale-105"
          >
            Pedir cotización
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
