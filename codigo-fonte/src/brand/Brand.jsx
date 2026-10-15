import symD from "./symbol.d?raw";
import lSym from "./lockup_sym.d?raw";
import lWord from "./lockup_word.d?raw";

// Geometria oficial da marca (símbolo OG infinito fluido + tipografia aprovada).
// Os viewBox são exatamente os de symbol_vb.txt e lockup_vb.txt. Não mude a proporção:
// use só largura (altura automática) e mantenha overflow visível para o desenho nunca ser cortado.
// decorativo (aria-hidden) não leva role/rótulo; caso contrário, é uma imagem com nome
const a11y = (title, p) => (p["aria-hidden"] ? {} : { role: "img", "aria-label": title });

export function Symbol({ className, title = "Orygen", ...p }) {
  return (
    <svg className={className} viewBox="-116.6 -62.6 233.2 125.2" {...a11y(title, p)} overflow="visible" preserveAspectRatio="xMidYMid meet" {...p}>
      <path d={symD} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

export function Lockup({ className, title = "Orygen", ...p }) {
  return (
    <svg className={className} viewBox="-116.6 -62.6 690.8 135.65" {...a11y(title, p)} overflow="visible" preserveAspectRatio="xMidYMid meet" {...p}>
      <path d={lSym} fill="currentColor" fillRule="evenodd" />
      <path d={lWord} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}
