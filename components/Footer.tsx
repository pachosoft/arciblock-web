import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-steel-950 border-t border-steel-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo + descripción */}
          <div className="md:col-span-2">
			<Logo size="lg" />
            <p className="mt-5 text-steel-400 text-sm max-w-md leading-relaxed">
              Fabricantes de productos de arcilla para construcción en Cúcuta.
              Bloques H, ladrillos, pisos de gres, fachaletas y adoquines con
              despacho a toda Colombia.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-steel-400 hover:text-brand transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="text-steel-400 hover:text-brand transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-steel-400 hover:text-brand transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/portafolio" className="text-steel-400 hover:text-brand transition-colors">
                  Portafolio
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-steel-400 hover:text-brand transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contacto
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:contacto@arciblock.com"
                  className="text-steel-400 hover:text-brand transition-colors break-all"
                >
                  contacto@arciblock.com
                </a>
              </li>
              <li className="text-steel-400">Cúcuta, Colombia</li>
              <li>
                <Link
                  href="/contacto"
                  className="text-brand hover:text-brand-400 transition-colors"
                >
                  Solicitar cotización →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisora + copyright */}
        <div className="mt-12 pt-8 border-t border-steel-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-steel-500 text-sm">
            © {currentYear} Arciblock. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              href="/legal/privacidad"
              className="text-steel-500 hover:text-steel-300 transition-colors"
            >
              Política de privacidad
            </Link>
            <Link
              href="/login"
              className="text-steel-600 hover:text-steel-400 transition-colors text-xs"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
