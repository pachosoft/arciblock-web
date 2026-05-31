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
    const url = `mailto:contacto@arciblock.com?subject=${encodeURIComponent(
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
              <div className="glass-card rounded-2xl p-6">
                <div className="w-10 h-10 bg-brand/10 border border-brand/30 rounded-lg flex items-center justify-center mb-4 text-brand">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold mb-2">Correo</h3>
                <a
                  href="mailto:contacto@arciblock.com"
                  className="text-brand hover:text-brand-400 text-sm break-all transition-colors"
                >
                  contacto@arciblock.com
                </a>
              </div>

              <div className="glass-card rounded-2xl p-6">
                <div className="w-10 h-10 bg-brand/10 border border-brand/30 rounded-lg flex items-center justify-center mb-4 text-brand">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold mb-2">Ubicación</h3>
                <p className="text-steel-300 text-sm">Cúcuta, Norte de Santander</p>
                <p className="text-steel-400 text-sm">Colombia</p>
              </div>

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
    </>
  );
}
