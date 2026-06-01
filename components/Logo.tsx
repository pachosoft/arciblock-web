import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "icon" | "with-tagline";
  className?: string;
}

/**
 * Logo Arciblock.
 * - icon: solo los bloques 3D (header)
 * - full: bloques + texto ARCIBLOCK
 * - with-tagline: full + slogan en CSS debajo
 */
export default function Logo({
  size = "md",
  variant = "full",
  className = "",
}: LogoProps) {
  const heightClasses = {
    sm: variant === "icon" ? "h-9" : "h-12",
    md: variant === "icon" ? "h-12" : "h-16",
    lg: variant === "icon" ? "h-16" : "h-24",
    xl: variant === "icon" ? "h-24" : "h-32",
  };

  const imgSrc =
    variant === "icon" ? "/images/logo-arciblock-icon.png" : "/images/logo-arciblock.png";

  // Dimensiones reales del archivo para que Next no se queje
  const dims =
    variant === "icon"
      ? { width: 1391, height: 451 }
      : { width: 1395, height: 654 };

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <Image
        src={imgSrc}
        alt="Arciblock"
        width={dims.width}
        height={dims.height}
        priority
        className={`${heightClasses[size]} w-auto object-contain`}
      />
      {variant === "with-tagline" && (
        <span className="mt-2 text-[10px] md:text-xs text-steel-300 uppercase tracking-[0.18em] font-medium">
          Tradición natural con cada pieza
        </span>
      )}
    </div>
  );
}