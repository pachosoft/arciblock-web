/**
 * Logo Arciblock — replica el diseño oficial:
 * dos bloques 3D (terracota con "A" + azul marino con "B")
 * en disposición de torre, evocando construcción.
 */

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "icon" | "with-tagline";
  className?: string;
}

const TERRACOTA = "#B54E2B";
const NAVY = "#2C303D";

export default function Logo({
  size = "md",
  variant = "full",
  className = "",
}: LogoProps) {
  const sizes = {
    sm: { icon: 32, text: "text-xl", tagline: "text-[9px]" },
    md: { icon: 44, text: "text-2xl", tagline: "text-[10px]" },
    lg: { icon: 72, text: "text-4xl", tagline: "text-xs" },
    xl: { icon: 110, text: "text-6xl", tagline: "text-sm" },
  };

  const current = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Ícono: dos bloques 3D apilados */}
      <svg
        width={current.icon}
        height={current.icon}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        aria-label="Arciblock"
      >
        {/* ===== BLOQUE SUPERIOR IZQUIERDO (terracota - letra A) ===== */}
        {/* Cara frontal */}
        <path
          d="M8 25 L34 25 L34 47 L8 47 Z"
          fill={TERRACOTA}
        />
        {/* Cara superior (perspectiva 3D) */}
        <path
          d="M8 25 L14 19 L40 19 L34 25 Z"
          fill={TERRACOTA}
          opacity="0.85"
        />
        {/* Cara lateral derecha */}
        <path
          d="M34 25 L40 19 L40 41 L34 47 Z"
          fill={TERRACOTA}
          opacity="0.7"
        />
        {/* Hueco 1 del bloque superior (lado izq) */}
        <rect x="11" y="28" width="4" height="6" fill="#161922" opacity="0.45" />
        {/* Hueco 2 del bloque superior (lado der) */}
        <rect x="27" y="28" width="4" height="6" fill="#161922" opacity="0.45" />
        {/* Letra A en la cara frontal */}
        <text
          x="21"
          y="42"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="13"
          fontWeight="800"
          fill="#ffffff"
        >
          A
        </text>

        {/* ===== BLOQUE SUPERIOR DERECHO (azul marino - letra B) ===== */}
        <path
          d="M38 28 L64 28 L64 50 L38 50 Z"
          fill={NAVY}
        />
        <path
          d="M38 28 L44 22 L70 22 L64 28 Z"
          fill={NAVY}
          opacity="0.85"
        />
        <path
          d="M64 28 L70 22 L70 44 L64 50 Z"
          fill={NAVY}
          opacity="0.7"
        />
        <rect x="41" y="31" width="4" height="6" fill="#0a0c10" opacity="0.55" />
        <rect x="57" y="31" width="4" height="6" fill="#0a0c10" opacity="0.55" />
        <text
          x="51"
          y="45"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="13"
          fontWeight="800"
          fill="#ffffff"
        >
          B
        </text>

        {/* ===== BLOQUE INFERIOR IZQUIERDO (terracota) ===== */}
        <path
          d="M8 53 L34 53 L34 71 L8 71 Z"
          fill={TERRACOTA}
        />
        <path
          d="M8 53 L14 47 L40 47 L34 53 Z"
          fill={TERRACOTA}
          opacity="0.85"
        />
        <path
          d="M34 53 L40 47 L40 65 L34 71 Z"
          fill={TERRACOTA}
          opacity="0.7"
        />
        <rect x="14" y="58" width="14" height="3" fill="#161922" opacity="0.35" />

        {/* ===== BLOQUE INFERIOR DERECHO (azul marino) ===== */}
        <path
          d="M38 56 L64 56 L64 74 L38 74 Z"
          fill={NAVY}
        />
        <path
          d="M38 56 L44 50 L70 50 L64 56 Z"
          fill={NAVY}
          opacity="0.85"
        />
        <path
          d="M64 56 L70 50 L70 68 L64 74 Z"
          fill={NAVY}
          opacity="0.7"
        />
        <rect x="44" y="61" width="14" height="3" fill="#0a0c10" opacity="0.45" />
      </svg>

      {/* Texto del logo */}
      {variant !== "icon" && (
        <div className="flex flex-col leading-none">
          <span
            className={`${current.text} font-display font-extrabold tracking-tight`}
          >
            <span style={{ color: TERRACOTA }}>ARCI</span>
            <span className="text-white">BLOCK</span>
          </span>
          {variant === "with-tagline" && (
            <span
              className={`${current.tagline} mt-1 text-steel-300 uppercase tracking-[0.18em] font-medium`}
            >
              Tradición natural con cada pieza
            </span>
          )}
        </div>
      )}
    </div>
  );
}
