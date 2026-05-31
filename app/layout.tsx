import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: false,
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Arciblock — Tradición natural con cada pieza | Productos de arcilla",
  description:
    "Fabricantes de bloques H, ladrillos, pisos de gres, fachaletas y adoquines de arcilla en Cúcuta. Despacho a toda Colombia. Cotización para constructores, distribuidores y obra propia.",
  keywords: [
    "ladrillo Cúcuta",
    "bloque H arcilla",
    "ladrillo tolete",
    "fachaleta arcilla",
    "adoquín arcilla",
    "piso de gres",
    "materiales de construcción Cúcuta",
    "ladrillera Norte de Santander",
    "arcilla cocida construcción",
    "Arciblock",
  ],
  authors: [{ name: "Arciblock" }],
  openGraph: {
    title: "Arciblock — Tradición natural con cada pieza",
    description:
      "Bloques H, ladrillos, pisos de gres, fachaletas y adoquines de arcilla. Fabricados en Cúcuta, despachados a toda Colombia.",
    url: "https://arciblock.com",
    siteName: "Arciblock",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "/images/logo-arciblock.jpg",
        width: 1382,
        height: 760,
        alt: "Arciblock — Tradición natural con cada pieza",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arciblock — Tradición natural con cada pieza",
    description: "Productos de arcilla para construcción. Despacho a toda Colombia.",
    images: ["/images/logo-arciblock.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-screen flex flex-col bg-steel-950">
        {children}
      </body>
    </html>
  );
}
