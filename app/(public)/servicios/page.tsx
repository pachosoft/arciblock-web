import Link from "next/link";

export const metadata = {
  title: "Servicios — Arciblock",
  description:
    "Venta directa, despacho a obra y asesoría técnica para constructores, distribuidores y autoconstructores. Productos de arcilla con cobertura nacional.",
};

const servicios = [
  {
    id: "venta-directa",
    titulo: "Venta directa de fábrica",
    descripcion:
      "Compra los productos al precio de fábrica, sin intermediarios. Disponible para constructores, distribuidores y particulares.",
    items: [
      {
        nombre: "Precio por volumen",
        detalle:
          "Descuentos progresivos según la cantidad. Mientras más unidades pidas, mejor precio por unidad. Cotización clara y por escrito.",
      },
      {
        nombre: "Carga en planta",
        detalle:
          "Vienes con tu vehículo o volqueta y cargas directamente en nuestras instalaciones. Lote ya separado y listo cuando llegas.",
      },
      {
        nombre: "Pedidos pequeños y grandes",
        detalle:
          "Desde una camionada para una vivienda particular hasta volúmenes para proyectos de cientos de unidades de vivienda.",
      },
      {
        nombre: "Productos siempre disponibles",
        detalle:
          "Nuestras líneas principales (bloques H, ladrillos, gres, fachaletas, adoquines) tienen stock permanente para despacho ágil.",
      },
    ],
  },
  {
    id: "despacho-nacional",
    titulo: "Despacho a obra en toda Colombia",
    descripcion:
      "Llegamos a cualquier parte del país coordinando el flete con transportadores aliados. Tú recibes en tu obra sin moverte.",
    items: [
      {
        nombre: "Cotización con flete incluido",
        detalle:
          "Si nos dices la dirección de destino, calculamos el flete y te entregamos un precio total con todo incluido para que no tengas sorpresas.",
      },
      {
        nombre: "Coordinación logística",
        detalle:
          "Nos encargamos de programar la salida desde planta y de mantenerte informado del tiempo estimado de llegada a tu obra.",
      },
      {
        nombre: "Despacho consolidado o exclusivo",
        detalle:
          "Si tu pedido no llena una volqueta, podemos consolidar con otros despachos a la misma zona para optimizar el costo del flete.",
      },
      {
        nombre: "Embalaje cuidadoso",
        detalle:
          "Acomodamos la carga para minimizar rotura en tránsito. Si llegan piezas dañadas por nuestro embalaje, las reponemos.",
      },
    ],
  },
  {
    id: "asesoria",
    titulo: "Asesoría técnica para tu obra",
    descripcion:
      "Te ayudamos a calcular cantidades, elegir el producto correcto y resolver dudas técnicas. Sin costo y sin compromiso.",
    items: [
      {
        nombre: "Cálculo de cantidades",
        detalle:
          "Envíanos los metros cuadrados de muro, fachada o piso, y te decimos cuántas unidades necesitas, con un porcentaje de desperdicio realista.",
      },
      {
        nombre: "Recomendación de producto",
        detalle:
          "¿Bloque #4, #5 o #6? ¿Tolete a la vista o prensado? Te orientamos según el tipo de obra, presupuesto y acabado que buscas.",
      },
      {
        nombre: "Compatibilidad de medidas",
        detalle:
          "Verificamos que el producto que necesitas encaje en los módulos de diseño de tu obra para evitar cortes innecesarios.",
      },
      {
        nombre: "Recomendaciones de instalación",
        detalle:
          "Tips prácticos sobre mortero, juntas, curado y limpieza para que la obra terminada se vea profesional y dure años.",
      },
    ],
  },
];

export default function ServiciosPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight">
            Nuestros <span className="brand-gradient-text">servicios</span>
          </h1>
          <p className="mt-6 text-lg text-steel-300 max-w-2xl mx-auto leading-relaxed">
            Venta directa de fábrica, despacho a toda Colombia y asesoría
            técnica para que tu obra avance con el material correcto.
          </p>
        </div>
      </section>

      {/* Servicios detallados */}
      {servicios.map((servicio, idx) => (
        <section
          key={servicio.id}
          id={servicio.id}
          className={`py-16 ${idx % 2 === 0 ? "bg-steel-950" : ""}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-24">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/20 text-brand text-xs font-semibold rounded-full mb-4">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                    {servicio.titulo}
                  </h2>
                  <p className="text-steel-300 leading-relaxed">
                    {servicio.descripcion}
                  </p>
                  <Link
                    href="/contacto"
                    className="inline-flex items-center gap-2 mt-6 text-brand hover:text-brand-400 font-semibold transition-colors"
                  >
                    Pedir cotización
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {servicio.items.map((item) => (
                  <div key={item.nombre} className="glass-card rounded-xl p-6">
                    <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-brand rounded-full" />
                      {item.nombre}
                    </h3>
                    <p className="text-steel-400 text-sm leading-relaxed">
                      {item.detalle}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 bg-steel-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para tu próximo pedido?
          </h2>
          <p className="text-steel-400 mb-8">
            Mándanos las medidas de tu obra y te enviamos cotización con todo
            incluido (producto + flete) en menos de 24 horas hábiles.
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
