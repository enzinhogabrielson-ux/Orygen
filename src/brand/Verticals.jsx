/*
  Marcas das vertentes ORYGEN — mesma grade (48 × 48), mesmo traço (3,4) e pontas arredondadas.
  PAY  → o anel do "O" com a barra do "G" virando fluxo (pagamentos que circulam)
  TAX  → visão 360°: o círculo dividido nas seis frentes, com a empresa no centro
  TECH → camadas: a tecnologia por baixo da experiência com a marca
*/
const S = { fill: "none", stroke: "currentColor", strokeWidth: 3.4, strokeLinecap: "round", strokeLinejoin: "round" };

const MARKS = {
  pay: (
    <>
      <circle cx="17" cy="24" r="10" {...S} />
      <path d="M17 24H40" {...S} />
      <path d="M34 18l6 6-6 6" {...S} />
    </>
  ),
  tax: (
    <>
      <circle cx="24" cy="24" r="14" {...S} pathLength="60" strokeDasharray="7.6 2.4" transform="rotate(-81 24 24)" />
      <circle cx="24" cy="24" r="3.6" fill="currentColor" />
    </>
  ),
  tech: (
    <>
      <path d="M24 9l15 8-15 8-15-8z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 24l15 8 15-8" {...S} />
      <path d="M9 31l15 8 15-8" {...S} />
    </>
  ),
};

export const VERTICAL_NAMES = { pay: "ORYGEN PAY", tax: "ORYGEN TAX", tech: "ORYGEN TECH" };

export default function VerticalMark({ v, className = "", title }) {
  return (
    <svg viewBox="0 0 48 48" className={`vmark ${className}`} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : "true"} focusable="false">
      {MARKS[v]}
    </svg>
  );
}
