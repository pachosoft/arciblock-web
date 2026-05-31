import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-24 md:pb-32">
        <div className="absolute inset-0 industrial-grid opacity-30 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-steel-800/50 border border-steel-700 rounded-full text-sm text-steel-300 mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-brand rounded-full animate-pulse" />
            Tradición natural con cada pieza
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight max-w-4xl mx-auto animate-slide-up">
            Productos de{" "}
            <span className="brand-gradient-text">arcilla</span> para
            construir bien
          </h1>

          <p className="mt-6 text-lg md:text-xl text-steel-300 max-w-2xl mx-auto leading-relaxed animate-slide-up">
            Bloques H, ladrillos, pisos de gres, fachaletas y adoquines.
            Fabricados en Cúcuta con arcilla de la región, despachados a
            cualquier parte de Colombia.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link
              href="/catalogo"
              className="px-8 py-3.5 bg-brand text-white font-semibold rounded-lg hover:bg-brand-600 transition-all hover:scale-105"
            >
              Ver catálogo
            </Link>
            <Link
              href="/contacto"
              className="px-8 py-3.5 bg-steel-800/50 border border-steel-700 text-white font-semibold rounded-lg hover:bg-steel-800 transition-colors"
            >
              Solicitar cotización
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { num: "5", label: "Líneas de producto" },
              { num: "100%", label: "Arcilla seleccionada" },
              { num: "🇨🇴", label: "Despacho nacional" },
              { num: "ICONTEC", label: "Estándares aplicados" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold brand-gradient-text">
                  {stat.num}
                </div>
                <div className="text-sm text-steel-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LÍNEAS DE PRODUCTO */}
      <section className="py-20 bg-steel-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white">
              Lo que <span className="brand-gradient-text">fabricamos</span>
            </h2>
            <p className="mt-4 text-steel-400 max-w-2xl mx-auto">
              Cinco líneas de productos de arcilla para construcción, vivienda y acabados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Bloques H */}
            <div className="glass-card rounded-2xl p-8 group">
              <div className="w-12 h-12 bg-brand/10 border border-brand/30 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:bg-brand/20 transition-colors">
                🧱
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Bloques H</h3>
              <p className="text-steel-400 text-sm leading-relaxed mb-4">
                Bloques estructurales y de aligeramiento para muros divisorios y
                de carga. Disponibles en distintas medidas.
              </p>
              <ul className="space-y-1.5 text-sm text-steel-300">
                <li className="flex items-center gap-2">
                  <span className="text-brand">•</span> Bloque #4, #5, #6
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand">•</span> Caras lisas o ranuradas
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand">•</span> Ideales para mampostería
                </li>
              </ul>
            </div>

            {/* Ladrillos */}
            <div className="glass-card rounded-2xl p-8 group">
              <div className="w-12 h-12 bg-brand/10 border border-brand/30 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:bg-brand/20 transition-colors">
                🟫
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Ladrillos</h3>
              <p className="text-steel-400 text-sm leading-relaxed mb-4">
                Ladrillo macizo y tolete para mampostería estructural y a la
                vista. Acabado uniforme y resistencia comprobada.
              </p>
              <ul className="space-y-1.5 text-sm text-steel-300">
                <li className="flex items-center gap-2">
                  <span className="text-brand">•</span> Ladrillo tolete común
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand">•</span> Ladrillo prensado a la vista
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand">•</span> Tamaños tradicionales
                </li>
              </ul>
            </div>

            {/* Pisos de gres */}
            <div className="glass-card rounded-2xl p-8 group">
              <div className="w-12 h-12 bg-brand/10 border border-brand/30 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:bg-brand/20 transition-colors">
                🟥
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Pisos de gres</h3>
              <p className="text-steel-400 text-sm leading-relaxed mb-4">
                Pisos rústicos en gres prensado para interiores, terrazas y
                zonas de tráfico. Antideslizantes y de larga duración.
              </p>
              <ul className="space-y-1.5 text-sm text-steel-300">
                <li className="flex items-center gap-2">
                  <span className="text-brand">•</span> Formatos cuadrados y rectangulares
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand">•</span> Color natural de arcilla
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand">•</span> Resistencia al desgaste
                </li>
              </ul>
            </div>

            {/* Fachaletas */}
            <div className="glass-card rounded-2xl p-8 group">
              <div className="w-12 h-12 bg-brand/10 border border-brand/30 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:bg-brand/20 transition-colors">
                🏛️
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Fachaletas y enchapes</h3>
              <p className="text-steel-400 text-sm leading-relaxed mb-4">
                Piezas decorativas para revestimiento de fachadas y muros
                interiores. Estética ladrillo a la vista sin el peso.
              </p>
              <ul className="space-y-1.5 text-sm text-steel-300">
                <li className="flex items-center gap-2">
                  <span className="text-brand">•</span> Fachaleta lisa y rústica
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand">•</span> Variedad de tonos
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand">•</span> Fácil instalación
                </li>
              </ul>
            </div>

            {/* Adoquines */}
            <div className="glass-card rounded-2xl p-8 group">
              <div className="w-12 h-12 bg-brand/10 border border-brand/30 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:bg-brand/20 transition-colors">
                ⬜
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Adoquines</h3>
              <p className="text-steel-400 text-sm leading-relaxed mb-4">
                Adoquines de arcilla para senderos, parqueaderos y zonas
                peatonales. Acabado tradicional y resistencia al tránsito.
              </p>
              <ul className="space-y-1.5 text-sm text-steel-300">
                <li className="flex items-center gap-2">
                  <span className="text-brand">•</span> Formato rectangular clásico
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand">•</span> Para tráfico peatonal y vehicular
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand">•</span> Color natural arcilla
                </li>
              </ul>
            </div>

            {/* CTA card */}
            <div className="rounded-2xl p-8 group bg-gradient-to-br from-brand/20 to-brand/5 border border-brand/30 flex flex-col justify-center items-center text-center">
              <h3 className="text-xl font-bold text-white mb-3">
                ¿Necesitas medidas o cantidades específicas?
              </h3>
              <p className="text-steel-300 text-sm mb-6">
                Cotizamos por volumen y despachamos a tu obra en cualquier parte de Colombia.
              </p>
              <Link
                href="/contacto"
                className="px-5 py-2.5 bg-brand text-white font-semibold rounded-lg hover:bg-brand-600 transition-colors text-sm"
              >
                Pedir cotización
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* POR QUÉ ARCIBLOCK */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-steel-800 to-steel-900 border border-steel-700 rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 md:p-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber/20 text-amber text-xs font-semibold rounded-full mb-4">
                  POR QUÉ ARCIBLOCK
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
                  Producto que aguanta, despacho que cumple
                </h2>

                <div className="space-y-4">
                  <Razon
                    titulo="Arcilla seleccionada"
                    detalle="Materia prima de la región, procesada bajo control para garantizar resistencia y uniformidad de cada pieza."
                  />
                  <Razon
                    titulo="Cocción a temperatura óptima"
                    detalle="Hornos calibrados que dan al producto la dureza adecuada sin grietas ni alabeos."
                  />
                  <Razon
                    titulo="Despacho a obra"
                    detalle="Llegamos a cualquier ciudad de Colombia. Cargamos directo a tu volqueta o coordinamos flete a tu obra."
                  />
                  <Razon
                    titulo="Precio justo por volumen"
                    detalle="Descuentos progresivos para constructores, distribuidores y obras grandes."
                  />
                </div>
              </div>

              {/* Tablero decorativo */}
              <div className="relative flex justify-center">
                <div className="w-full max-w-sm bg-steel-950 rounded-2xl border-2 border-steel-700 p-5 shadow-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-steel-400">DESPACHO PROGRAMADO</span>
                  </div>
                  <div className="text-white text-lg font-bold mb-4">Pedido #2024-0341</div>

                  <div className="bg-brand/10 border border-brand/30 rounded-lg p-3 mb-3">
                    <div className="text-xs text-brand mb-1">Ladrillo tolete</div>
                    <div className="text-white text-2xl font-bold">8.500 uds</div>
                    <div className="text-xs text-steel-400 mt-1">Destino: Bucaramanga</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-steel-800 rounded-lg p-3">
                      <div className="text-[10px] text-steel-400 mb-1">Carga</div>
                      <div className="text-white font-bold text-sm">Lista</div>
                    </div>
                    <div className="bg-steel-800 rounded-lg p-3">
                      <div className="text-[10px] text-steel-400 mb-1">Salida</div>
                      <div className="text-white font-bold text-sm">07:00 am</div>
                    </div>
                  </div>

                  <div className="bg-steel-800 rounded-lg p-3">
                    <div className="text-[10px] text-steel-400 mb-2">CONTROL DE CALIDAD</div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-xs text-white">Lote aprobado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-steel-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Tienes una obra en mente?
          </h2>
          <p className="text-steel-400 mb-8">
            Cuéntanos qué necesitas y en cuánto tiempo. Cotizamos por volumen
            y coordinamos despacho a tu obra.
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

function Razon({ titulo, detalle }: { titulo: string; detalle: string }) {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand/20 flex items-center justify-center mt-0.5">
        <svg className="w-3.5 h-3.5 text-brand" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <h4 className="text-white font-semibold text-sm">{titulo}</h4>
        <p className="text-steel-400 text-sm leading-relaxed">{detalle}</p>
      </div>
    </div>
  );
}
