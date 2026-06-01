export const metadata = {
  title: "Política de privacidad — Arciblock",
  description: "Política de tratamiento de datos personales de Arciblock.",
};

export default function PrivacidadPage() {
  return (
    <article className="py-20 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
          Política de privacidad
        </h1>
        <p className="text-steel-400 text-sm mb-12">
          Última actualización: enero 2026
        </p>

        <div className="text-steel-200 leading-relaxed space-y-5 article-content">
          <p>
            Arciblock (en adelante &quot;nosotros&quot;, &quot;nuestro&quot;) respeta tu privacidad y
            está comprometido con la protección de tus datos personales. Esta
            política describe cómo recopilamos, usamos y protegemos tu
            información cuando usas nuestro sitio web arciblock.com.
          </p>

          <h2>1. Información que recopilamos</h2>
          <p>Podemos recopilar los siguientes tipos de información:</p>
          <ul>
            <li>
              <strong>Información de contacto:</strong> nombre, correo electrónico,
              teléfono, empresa, cuando llenas formularios.
            </li>
            <li>
              <strong>Información comercial:</strong> requerimientos técnicos,
              volúmenes estimados, especificaciones, cuando solicitas cotización.
            </li>
            <li>
              <strong>Información técnica:</strong> dirección IP, tipo de
              navegador, sistema operativo, páginas visitadas.
            </li>
          </ul>

          <h2>2. Cómo usamos la información</h2>
          <p>Usamos tus datos para:</p>
          <ul>
            <li>Atender tus solicitudes de cotización</li>
            <li>Responder a tus consultas</li>
            <li>Gestionar relaciones comerciales y proyectos productivos</li>
            <li>Mejorar nuestros servicios</li>
            <li>Cumplir con obligaciones legales</li>
          </ul>

          <h2>3. Compartición con terceros</h2>
          <p>
            No vendemos ni alquilamos tu información personal. Solo
            compartimos datos con:
          </p>
          <ul>
            <li>
              <strong>Proveedores de servicios:</strong> Vercel (hosting),
              proveedores de correo y herramientas de gestión interna.
            </li>
            <li>
              <strong>Autoridades:</strong> cuando sea legalmente requerido.
            </li>
          </ul>

          <h2>4. Almacenamiento y seguridad</h2>
          <p>
            Tus datos se almacenan en servidores con protección estándar de la
            industria (encriptación TLS en tránsito, controles de acceso).
            Sin embargo, ningún sistema es 100% seguro.
          </p>

          <h2>5. Tus derechos (Ley 1581 de 2012 - Colombia)</h2>
          <p>De acuerdo con la legislación colombiana, tienes derecho a:</p>
          <ul>
            <li>Conocer, actualizar y rectificar tus datos</li>
            <li>Solicitar prueba de la autorización otorgada</li>
            <li>Ser informado sobre el uso de tus datos</li>
            <li>Revocar la autorización y/o solicitar la supresión</li>
            <li>Acceder gratuitamente a tus datos personales</li>
          </ul>

          <h2>6. Cookies</h2>
          <p>
            Nuestro sitio web puede usar cookies técnicas necesarias para su
            funcionamiento. No usamos cookies de marketing ni rastreo de
            terceros.
          </p>

          <h2>7. Menores de edad</h2>
          <p>
            Nuestros servicios no están dirigidos a menores de 18 años. No
            recopilamos intencionalmente datos de menores.
          </p>

          <h2>8. Cambios a esta política</h2>
          <p>
            Podemos actualizar esta política periódicamente. Te notificaremos
            sobre cambios significativos publicando la nueva versión en este
            sitio.
          </p>

          <h2>9. Contacto</h2>
          <p>
            Para cualquier consulta sobre esta política o el manejo de tus
            datos, escríbenos a:{" "}
            <a href="mailto:arciblocksas@gmail.com">
              arciblocksas@gmail.com
            </a>
          </p>

          <p className="text-sm text-steel-500 mt-12 pt-6 border-t border-steel-800">
            <strong>Responsable:</strong> Arciblock<br />
            <strong>Ubicación:</strong> Cúcuta, Norte de Santander, Colombia<br />
            <strong>Correo:</strong> arciblocksas@gmail.com
          </p>
        </div>

        <style>{`
          .article-content h2 {
            font-family: var(--font-manrope), system-ui, sans-serif;
            font-size: 1.5rem;
            font-weight: 700;
            color: white;
            margin-top: 2rem;
            margin-bottom: 1rem;
          }
          .article-content p {
            margin-bottom: 1.25rem;
          }
          .article-content strong {
            color: white;
            font-weight: 600;
          }
          .article-content a {
            color: #0ea5e9;
            text-decoration: underline;
          }
          .article-content ul {
            margin-bottom: 1.25rem;
            padding-left: 1.5rem;
          }
          .article-content ul li {
            list-style: disc;
            margin-bottom: 0.5rem;
          }
        `}</style>
      </div>
    </article>
  );
}
