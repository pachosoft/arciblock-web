import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "icon" | "with-tagline";
  className?: string;
}

/**
 * Logo Arciblock - usa el JPEG oficial.
 *
 * Variantes:
 * - full: logo completo (bloques + ARCIBLOCK + tagline). Usar en login, footer, etc.
 * - icon: solo bloques + texto ARCIBLOCK al lado. Usar en header.
 * - with-tagline: igual a full pero más enfatizado.
 */
export default function Logo({
  size = "md",
  variant = "full",
  className = "",
}: LogoProps) {
  // Tamaños del logo completo (con bloques + texto)
  const sizes = {
    sm: { width: 110, height: 60 },
    md: { width: 150, height: 82 },
    lg: { width: 260, height: 143 },
    xl: { width: 380, height: 209 },
  };

  const current = sizes[size];

  // Para el header (icon + texto al lado), usamos un layout horizontal compacto
  if (variant === "icon") {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <Image
          src="/images/logo-arciblock.jpg"
          alt="Arciblock"
          width={current.width}
          height={current.height}
          priority
          className="h-10 w-auto md:h-12 object-contain"
        />
      </div>
    );
  }

  // Logo completo (centrado, con tagline visible en la imagen)
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <Image
        src="/images/logo-arciblock.jpg"
        alt="Arciblock - Tradición natural con cada pieza"
        width={current.width}
        height={current.height}
        priority
        className="object-contain"
        style={{ width: current.width, height: "auto" }}
      />
    </div>
  );
}