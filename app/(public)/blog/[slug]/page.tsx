import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "../page";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const contenidos: Record<string, { titulo: string; html: string }> = {
  "como-calcular-cuantos-bloques-necesito": {
    titulo: "Cómo calcular cuántos bloques o ladrillos necesitas para tu obra",
    html: `
<p>Una de las preguntas más frecuentes que recibimos es: <strong>"¿Cuántos bloques voy a necesitar?"</strong>. Calcularlo bien evita dos errores costosos: comprar de menos (y parar la obra esperando despacho) o comprar de más (plata congelada en material que sobra).</p>

<h2>Fórmula básica</h2>
<p>El cálculo se hace por <strong>metros cuadrados de muro</strong>. La idea es saber cuántas unidades caben en 1 m² de muro y multiplicar por el área total.</p>
<p><strong>Unidades por m² = (1 metro / largo del bloque + junta) × (1 metro / alto del bloque + junta)</strong></p>

<h2>Referencias prácticas</h2>
<p>Estos son rendimientos típicos por m² considerando juntas de 1 a 1.5 cm:</p>
<ul>
  <li><strong>Bloque H #4 (10×20×30 cm):</strong> 12 a 13 unidades por m².</li>
  <li><strong>Bloque H #5 (12×20×30 cm):</strong> 12 a 13 unidades por m².</li>
  <li><strong>Bloque H #6 (15×20×30 cm):</strong> 12 a 13 unidades por m².</li>
  <li><strong>Ladrillo tolete común (6×12×24 cm):</strong> 55 a 60 unidades por m² (muro de soga) o 110 a 120 (muro de tizón).</li>
  <li><strong>Fachaleta (1.5×6×24 cm):</strong> 55 a 65 unidades por m² (varía con la junta).</li>
  <li><strong>Adoquín rectangular (5×10×20 cm):</strong> 50 unidades por m².</li>
</ul>

<h2>Paso a paso para un muro</h2>
<ol>
  <li>Mide largo y alto del muro en metros → multiplica para sacar el área en m².</li>
  <li>Si el muro tiene puertas o ventanas, resta esas áreas.</li>
  <li>Multiplica el área neta por las unidades/m² del producto que vas a usar.</li>
  <li>Suma un <strong>5% a 8% extra</strong> por desperdicios, cortes y rotura.</li>
</ol>

<h2>Ejemplo</h2>
<p>Quieres levantar una pared de 4 m de largo por 2.5 m de alto con bloque H #5:</p>
<ul>
  <li>Área: 4 × 2.5 = <strong>10 m²</strong></li>
  <li>Si tiene una ventana de 1×1 m: 10 − 1 = <strong>9 m²</strong></li>
  <li>9 m² × 12 bloques/m² = <strong>108 bloques</strong></li>
  <li>+7% desperdicio: 108 × 1.07 ≈ <strong>116 bloques</strong></li>
</ul>

<h2>Errores comunes</h2>
<ul>
  <li><strong>No considerar el desperdicio:</strong> los cortes para esquinas y remates siempre generan piezas que no se reutilizan.</li>
  <li><strong>Olvidar las juntas:</strong> el mortero entre piezas ocupa espacio. Si no lo consideras, te quedas corto.</li>
  <li><strong>Pedir justo lo calculado:</strong> nunca pidas exactamente lo que dice la fórmula. Siempre suma el porcentaje extra.</li>
  <li><strong>No verificar las medidas reales del producto:</strong> los nominales y los reales no siempre coinciden. Pregunta antes de comprar.</li>
</ul>

<h2>¿Te ayudamos con el cálculo?</h2>
<p>Si tienes los planos o las medidas, escríbenos y te enviamos un cálculo detallado sin compromiso. <a href="/contacto">Pídenos cotización</a> y agregamos el cálculo de cantidades exactas.</p>
`,
  },
  "bloque-h-vs-ladrillo-tolete": {
    titulo: "Bloque H vs ladrillo tolete: ¿cuál conviene para tu obra?",
    html: `
<p>Dos productos clásicos de arcilla, ambos para muros, pero con propósitos distintos. Si no tienes claro cuál elegir, esta guía te ayuda a decidir.</p>

<h2>Qué es cada uno</h2>
<p><strong>Bloque H:</strong> pieza hueca, más grande y más liviana. Tiene "agujeros" (las perforaciones que le dan el nombre) que reducen el peso y permiten pasar instalaciones.</p>
<p><strong>Ladrillo tolete:</strong> pieza maciza o con perforaciones pequeñas, más pequeña y más pesada por unidad. Ideal para muros más sólidos y para acabados a la vista.</p>

<h2>Cuándo usar bloque H</h2>
<ul>
  <li><strong>Muros divisorios interiores:</strong> separan ambientes sin cargar peso de la estructura.</li>
  <li><strong>Cuando necesitas pasar tuberías:</strong> los huecos del bloque facilitan pasar conduit eléctrico o tuberías hidrosanitarias.</li>
  <li><strong>Obras donde el tiempo importa:</strong> al ser más grande, cubres más m² por unidad colocada. Avanzas más rápido.</li>
  <li><strong>Cuando el peso de la estructura es restricción:</strong> los bloques son livianos y reducen la carga sobre la cimentación.</li>
</ul>

<h2>Cuándo usar ladrillo tolete</h2>
<ul>
  <li><strong>Muros estructurales o de carga:</strong> el tolete macizo aguanta más peso, ideal para muros que soportan losa o cubierta.</li>
  <li><strong>Acabado a la vista:</strong> si quieres que el muro quede sin pañetar, el ladrillo prensado da una estética cálida e impecable.</li>
  <li><strong>Muros exteriores:</strong> el tolete bien colocado y curado tiene excelente resistencia al clima.</li>
  <li><strong>Cuando buscas durabilidad máxima:</strong> el ladrillo macizo es más resistente al impacto y al desgaste.</li>
</ul>

<h2>Comparación rápida</h2>
<p>Resumen para escoger sin perderte:</p>
<ul>
  <li><strong>Peso de la obra:</strong> bloque H gana (más liviano).</li>
  <li><strong>Velocidad de pega:</strong> bloque H gana (más grande, menos unidades).</li>
  <li><strong>Resistencia estructural:</strong> ladrillo tolete gana.</li>
  <li><strong>Acabado a la vista:</strong> ladrillo tolete gana (la fachaleta sería otra opción).</li>
  <li><strong>Pase de instalaciones:</strong> bloque H gana (huecos internos).</li>
  <li><strong>Precio por m² terminado:</strong> generalmente bloque H es más económico, pero depende del proyecto.</li>
</ul>

<h2>¿Se pueden combinar?</h2>
<p>Sí, y de hecho es lo más común en obras profesionales:</p>
<ul>
  <li>Ladrillo tolete para muros estructurales y fachadas a la vista.</li>
  <li>Bloque H para divisiones interiores y muros no portantes.</li>
</ul>
<p>Así aprovechas las fortalezas de cada uno y optimizas el costo.</p>

<h2>¿Necesitas asesoría?</h2>
<p>Si tienes los planos o una idea clara de tu obra, podemos ayudarte a definir qué producto usar en cada parte. <a href="/contacto">Escríbenos</a> y te orientamos sin compromiso.</p>
`,
  },
  "fachaleta-de-arcilla-instalacion": {
    titulo: "Fachaleta de arcilla: cómo instalarla y que dure años",
    html: `
<p>La fachaleta es uno de los productos más versátiles que vendemos. Te da la estética del ladrillo a la vista (esa textura cálida y artesanal) pero sin el peso ni el costo de un muro de tolete completo. La pegas como un enchape sobre la pared ya construida.</p>
<p>Bien instalada, dura décadas. Mal instalada, empieza a desprenderse en uno o dos años. Aquí va la diferencia.</p>

<h2>Lo que necesitas antes de empezar</h2>
<ul>
  <li><strong>Pared limpia y estable:</strong> debe estar firme, sin polvo, sin grasa y bien adherida al sustrato.</li>
  <li><strong>Pañete áspero o malla de gallinero:</strong> la fachaleta necesita "agarre". Una pared completamente lisa no es buena base.</li>
  <li><strong>Mortero adhesivo apropiado:</strong> mezcla de cemento, arena fina y un aditivo adhesivo (o usar mortero especial para enchape ya preparado).</li>
  <li><strong>Crucetas:</strong> espaciadores plásticos para mantener juntas uniformes.</li>
  <li><strong>Nivel, plomada, hilo guía:</strong> alineación es lo más importante.</li>
</ul>

<h2>Paso a paso</h2>
<h3>1. Preparar la pared</h3>
<p>Si la pared está muy lisa, raya con cincel o aplica un puente de adherencia. Humedécela ligeramente antes de empezar (no empapada, solo húmeda).</p>

<h3>2. Marcar línea base</h3>
<p>Usa hilo o láser para trazar una línea horizontal perfectamente nivelada en la parte baja. Es el cimiento de todo: si la primera hilada queda torcida, todo queda torcido.</p>

<h3>3. Preparar la fachaleta</h3>
<p>Sumerge las piezas en agua unos 5 minutos antes de pegar. La arcilla está reseca y, si no la humedeces, absorbe el agua del mortero y la junta se debilita.</p>

<h3>4. Aplicar mortero</h3>
<p>Aplica una capa de 8 a 10 mm de mortero en la pared con llana dentada. No prepares de más: úsalo en máximo 30 minutos para que no pierda adherencia.</p>

<h3>5. Pegar las piezas</h3>
<p>Presiona cada fachaleta firmemente, con leve movimiento de vaivén para que el mortero llene los huecos. Pon crucetas entre piezas para juntas uniformes.</p>

<h3>6. Verificar nivel cada 3-4 hiladas</h3>
<p>No esperes a terminar para verificar nivel. Cada pocas filas, revisa con nivel y ajusta. Es mucho más fácil corregir antes de que el mortero fragüe.</p>

<h3>7. Hacer las juntas</h3>
<p>Espera 24 horas a que el mortero adhesivo esté firme. Luego retira las crucetas y rellena las juntas con boquilla o lechada. Limpia el exceso antes de que seque.</p>

<h3>8. Limpieza final</h3>
<p>Después de 48 horas, limpia los restos de mortero de la cara de la fachaleta con cepillo suave o paño húmedo. <strong>No uses ácido</strong> sin saber lo que haces — puede manchar la arcilla.</p>

<h2>Los 5 errores que hacen que se caiga</h2>
<ol>
  <li><strong>No humedecer las piezas:</strong> es el error más común y el más caro de corregir.</li>
  <li><strong>Pared lisa sin preparación:</strong> el mortero no agarra y todo se viene abajo en meses.</li>
  <li><strong>Mortero muy seco o muy líquido:</strong> debe tener consistencia de "mantequilla blanda".</li>
  <li><strong>Aplicar capas muy gruesas o muy delgadas de mortero:</strong> ni mucho ni poco. Entre 8 y 10 mm es lo correcto.</li>
  <li><strong>No respetar tiempo de fraguado antes de juntar:</strong> querer apurar y trabajar las juntas el mismo día puede aflojar piezas recién pegadas.</li>
</ol>

<h2>Cuidado posterior</h2>
<p>La fachaleta de arcilla, una vez instalada, prácticamente no requiere mantenimiento. Solo:</p>
<ul>
  <li>Limpieza ocasional con agua y cepillo suave.</li>
  <li>Si quieres realzar el color, hay selladores transparentes para arcilla.</li>
  <li>Revisar cada año si hay juntas agrietadas y resellarlas con boquilla.</li>
</ul>

<h2>¿Necesitas fachaleta?</h2>
<p>Tenemos varios tonos y acabados disponibles. <a href="/contacto">Cuéntanos qué buscas</a> y te enviamos muestras y cotización.</p>
`,
  },
};

export default async function ArticuloPage({ params }: PageProps) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  const contenido = contenidos[slug];

  if (!post || !contenido) notFound();

  const formatoFecha = (iso: string) => {
    const meses = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    const d = new Date(iso);
    return `${d.getDate()} de ${meses[d.getMonth()]} de ${d.getFullYear()}`;
  };

  return (
    <>
      <article className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-steel-400 hover:text-brand text-sm mb-8 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al blog
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4 text-xs">
            <span className="px-3 py-1 bg-brand/20 text-brand font-semibold rounded-full">
              {post.categoria}
            </span>
            <span className="text-steel-500">{formatoFecha(post.fecha)}</span>
            <span className="text-steel-500">·</span>
            <span className="text-steel-500">{post.minutos} min de lectura</span>
          </div>

          <h1 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-8">
            {contenido.titulo}
          </h1>

          <div
            className="article-content text-steel-200 leading-relaxed space-y-5"
            dangerouslySetInnerHTML={{ __html: contenido.html }}
          />

          <div className="mt-16 p-8 glass-card rounded-2xl text-center">
            <h3 className="font-display text-xl font-bold text-white mb-3">
              ¿Listo para tu pedido?
            </h3>
            <p className="text-steel-400 mb-5 text-sm">
              Te ayudamos a calcular cantidades y elegir el producto correcto.
              Cotización en menos de 24 horas hábiles.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-lg hover:bg-brand-600 transition-colors"
            >
              Pedir cotización
            </Link>
          </div>
        </div>
      </article>

      <style>{`
        .article-content h2 {
          font-family: var(--font-manrope), system-ui, sans-serif;
          font-size: 1.75rem;
          font-weight: 700;
          color: white;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .article-content h3 {
          font-family: var(--font-manrope), system-ui, sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .article-content p {
          margin-bottom: 1.25rem;
        }
        .article-content strong {
          color: white;
          font-weight: 600;
        }
        .article-content code {
          background: rgb(68 64 60 / 0.6);
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
          font-size: 0.9em;
          color: #38bdf8;
        }
        .article-content a {
          color: #0ea5e9;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .article-content a:hover {
          color: #38bdf8;
        }
        .article-content ul, .article-content ol {
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
        }
        .article-content ul li {
          list-style: disc;
          margin-bottom: 0.5rem;
        }
        .article-content ol li {
          list-style: decimal;
          margin-bottom: 0.5rem;
        }
      `}</style>
    </>
  );
}
