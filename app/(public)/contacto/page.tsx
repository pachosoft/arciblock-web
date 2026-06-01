"use client";

import { useState } from "react";

export default function ContactoPage() {
  const [enviado, setEnviado] = useState(false);
  const [datos, setDatos] = useState({
    nombre: "",
    empresa: "",
    correo: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cuerpo = `Nombre: ${datos.nombre}\nEmpresa: ${datos.empresa}\nTeléfono: ${datos.telefono}\n\nMensaje:\n${datos.mensaje}`;
    const url = `mailto:arciblocksas@gmail.com?subject=${encodeURIComponent(
      datos.asunto || "Consulta desde arciblock.com"
    )}&body=${encodeURIComponent(cuerpo)}`;
    window.location.href = url;
    setEnviado(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight">
            <span className="brand-gradient-text">Hablemos</span>
          </h1>
          <p className="mt-6 text-lg text-steel-300 max-w-2xl mx-auto leading-relaxed">
            Mándanos las cantidades que necesitas y la ciudad de destino. Te
            cotizamos con flete incluido en menos de 24 horas hábiles.
          </p>
        </div>
      </section>

      {/* Contenido */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Información de contacto */}
            <div className="lg:col-span-1 space-y-6">
              {/* Correo */}
              <div className="glass-card rounded-2xl p-6">
                <div className="w-10 h-10 bg-brand/10 border border-brand/30 rounded-lg flex items-center justify-center mb-4 text-brand">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold mb-2">Correo</h3>
                <a
                  href="mailto:arciblocksas@gmail.com"
                  className="text-brand hover:text-brand-400 text-sm break-all transition-colors"
                >
                  arciblocksas@gmail.com
                </a>
              </div>

              {/* WhatsApp */}
              <div className="glass-card rounded-2xl p-6">
                <div className="w-10 h-10 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center justify-center mb-4 text-green-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
                  </svg>
                </div>
                <h3 className="text-white font-bold mb-2">WhatsApp</h3>
                <a
                  href="https://wa.me/573000000000?text=Hola%20Arciblock%2C%20quisiera%20cotizar%20productos%20de%20arcilla"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-sm transition-colors"
                >
                  +57 300 000 0000
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <p className="text-steel-500 text-xs mt-2">Click para abrir chat</p>
              </div>

              {/* Ubicación */}
              <div className="glass-card rounded-2xl p-6">
                <div className="w-10 h-10 bg-brand/10 border border-brand/30 rounded-lg flex items-center justify-center mb-4 text-brand">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold mb-2">Ubicación</h3>
                <p className="text-steel-300 text-sm">Cúcuta, Norte de Santander</p>
                <p className="text-steel-400 text-sm mb-3">Colombia</p>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=7.948265528183545,-72.48604129738278"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-brand hover:text-brand-400 text-xs font-semibold transition-colors"
                >
                  Cómo llegar
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>

              {/* Horario */}
              <div className="glass-card rounded-2xl p-6">
                <div className="w-10 h-10 bg-brand/10 border border-brand/30 rounded-lg flex items-center justify-center mb-4 text-brand">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold mb-2">Horario</h3>
                <p className="text-steel-300 text-sm">Lunes a viernes</p>
                <p className="text-steel-400 text-sm">7:00 AM - 5:00 PM (UTC-5)</p>
              </div>
            </div>

            {/* Formulario */}
            <div className="lg:col-span-2">
              <div className="glass-card rounded-2xl p-8">
                {enviado ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-brand/20 border border-brand/40 rounded-full flex items-center justify-center mx-auto mb-4 text-brand">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-white font-bold text-xl mb-2">
                      Tu correo está casi listo
                    </h3>
                    <p className="text-steel-400 text-sm">
                      Se abrió tu aplicación de correo con el mensaje preparado.
                      Solo envíalo y te responderemos pronto.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-steel-400 uppercase tracking-wider mb-2">
                          Nombre completo *
                        </label>
                        <input
                          type="text"
                          required
                          value={datos.nombre}
                          onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
                          className="w-full px-4 py-3 bg-steel-900 border border-steel-700 rounded-lg text-white placeholder-steel-500 focus:outline-none focus:border-brand transition-colors"
                          placeholder="Juan Pérez"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-steel-400 uppercase tracking-wider mb-2">
                          Empresa
                        </label>
                        <input
                          type="text"
                          value={datos.empresa}
                          onChange={(e) => setDatos({ ...datos, empresa: e.target.value })}
                          className="w-full px-4 py-3 bg-steel-900 border border-steel-700 rounded-lg text-white placeholder-steel-500 focus:outline-none focus:border-brand transition-colors"
                          placeholder="Mi Empresa S.A.S."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-steel-400 uppercase tracking-wider mb-2">
                          Correo *
                        </label>
                        <input
                          type="email"
                          required
                          value={datos.correo}
                          onChange={(e) => setDatos({ ...datos, correo: e.target.value })}
                          className="w-full px-4 py-3 bg-steel-900 border border-steel-700 rounded-lg text-white placeholder-steel-500 focus:outline-none focus:border-brand transition-colors"
                          placeholder="juan@empresa.com"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-steel-400 uppercase tracking-wider mb-2">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          value={datos.telefono}
                          onChange={(e) => setDatos({ ...datos, telefono: e.target.value })}
                          className="w-full px-4 py-3 bg-steel-900 border border-steel-700 rounded-lg text-white placeholder-steel-500 focus:outline-none focus:border-brand transition-colors"
                          placeholder="+57 300 000 0000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-steel-400 uppercase tracking-wider mb-2">
                        Asunto *
                      </label>
                      <select
                        required
                        value={datos.asunto}
                        onChange={(e) => setDatos({ ...datos, asunto: e.target.value })}
                        className="w-full px-4 py-3 bg-steel-900 border border-steel-700 rounded-lg text-white focus:outline-none focus:border-brand transition-colors"
                      >
                        <option value="">Selecciona un tema</option>
                        <option value="Cotización Bloques H">Cotización Bloques H</option>
                        <option value="Cotización Ladrillos">Cotización Ladrillos</option>
                        <option value="Cotización Pisos de gres">Cotización Pisos de gres</option>
                        <option value="Cotización Fachaletas">Cotización Fachaletas/enchapes</option>
                        <option value="Cotización Adoquines">Cotización Adoquines</option>
                        <option value="Cotización mixta">Cotización de varios productos</option>
                        <option value="Distribuidor">Información para distribuidores</option>
                        <option value="Visita a planta">Visita a planta</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-steel-400 uppercase tracking-wider mb-2">
                        Detalles del pedido *
                      </label>
                      <textarea
                        required
                        value={datos.mensaje}
                        onChange={(e) => setDatos({ ...datos, mensaje: e.target.value })}
                        rows={5}
                        className="w-full px-4 py-3 bg-steel-900 border border-steel-700 rounded-lg text-white placeholder-steel-500 focus:outline-none focus:border-brand transition-colors resize-none"
                        placeholder="Producto y cantidad estimada · ciudad de destino · fecha en que necesitas el material · cualquier especificación adicional..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full px-6 py-3.5 bg-brand text-white font-semibold rounded-lg hover:bg-brand-600 transition-colors"
                    >
                      Enviar mensaje
                    </button>

                    <p className="text-xs text-steel-500 text-center">
                      Al enviar este formulario aceptas nuestra{" "}
                      <a href="/legal/privacidad" className="text-brand hover:text-brand-400">
                        política de privacidad
                      </a>
                      .
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAPA - Cómo llegar a la planta */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-steel-800/60">
              <h2 className="font-display text-xl font-bold text-white mb-1">
                Visítanos en planta
              </h2>
              <p className="text-steel-400 text-sm">
                Estamos en Cúcuta, Norte de Santander. Mueve el mapa o haz click para abrir en Google Maps.
              </p>
            </div>
            <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
              <iframe
                src="https://www.google.com/maps?q=7.948265528183545,-72.48604129738278&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, position: "absolute", inset: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Arciblock en Cúcuta"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
