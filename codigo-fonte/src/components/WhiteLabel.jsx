import { useRef, useState } from "react";

// Marcas fictícias, só para demonstrar a troca de identidade.
// Tons sóbrios da mesma família de azuis; a diferença entre as marcas vem do nome, da tipografia e do monograma.
const BRANDS = [
  { name: "Fluxo", c: "#0C2065", font: 600, track: "-0.02em", up: false, shape: "50%" },
  { name: "Lúmen", c: "#1E3A6E", font: 500, track: "0.14em", up: true, shape: "4px" },
  { name: "Selva", c: "#24406A", font: 700, track: "-0.03em", up: false, shape: "50% 50% 4px 50%" },
  { name: "Aurora", c: "#3B3F8F", font: 400, track: "0.02em", up: false, shape: "50%" },
  { name: "Ônix", c: "#111522", font: 600, track: "0.2em", up: true, shape: "2px" },
];

const slug = (n) => n.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

/* Troca de marca: a mesma base com identidades diferentes. Radiogroup com setas, como o padrão nativo. */
export default function WhiteLabel({ id = "personalizacao", eyebrow = "White label", b: tb = "A mesma base.", l: tl = "Qualquer marca.", lede }) {
  const [i, setI] = useState(0);
  const refs = useRef([]);
  const b = BRANDS[i];
  const onKey = (e) => {
    const n = BRANDS.length;
    let k = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") k = (i + 1) % n;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") k = (i - 1 + n) % n;
    if (k === null) return;
    e.preventDefault();
    setI(k);
    refs.current[k]?.focus();
  };
  return (
    <section className="sec wl dark" id={id} aria-labelledby={`${id}-t`} style={{ "--b": b.c }}>
      <div className="wrap wl-grid">
        <div className="wl-txt">
          <p className="eyebrow" data-reveal>{eyebrow}</p>
          <h2 id={`${id}-t`} className="h2" data-reveal>
            <span className="w-b">{tb}</span> <span className="w-l">{tl}</span>
          </h2>
          {lede && <p className="lede" data-reveal>{lede}</p>}
          <div className="wl-pick" role="radiogroup" aria-label="Escolha uma marca de exemplo" data-reveal onKeyDown={onKey}>
            {BRANDS.map((x, k) => (
              <button
                key={x.name}
                ref={(el) => (refs.current[k] = el)}
                type="button"
                role="radio"
                aria-checked={k === i}
                tabIndex={k === i ? 0 : -1}
                className={k === i ? "on" : ""}
                onClick={() => setI(k)}
              >
                {x.name}
              </button>
            ))}
          </div>
          <p className="fine" data-reveal>Marcas fictícias, criadas para esta demonstração.</p>
        </div>

        <div className="wl-stage" data-reveal>
          <div className="wl-app" key={b.name} role="img" aria-label={`Ilustração de aplicativo com a marca fictícia ${b.name}, com saldo, atalhos e movimentações. Dados fictícios.`}>
            <div className="wl-top">
              <b style={{ fontWeight: b.font, letterSpacing: b.track, textTransform: b.up ? "uppercase" : "none" }}>
                <i style={{ borderRadius: b.shape }} aria-hidden="true" />
                {b.name}
              </b>
              <span>{slug(b.name)}.com.br</span>
            </div>
            <div className="wl-bal">
              <small>Saldo disponível</small>
              <b>R$ 12.480,90</b>
              <div className="wl-acts">
                <span>Pix</span><span>Boleto</span><span>Link</span><span>Extrato</span>
              </div>
            </div>
            <ul className="wl-list">
              <li><span>Pix recebido</span><b>+ R$ 709,71</b></li>
              <li><span>Link de pagamento</span><b>+ R$ 349,90</b></li>
              <li><span>Pix enviado</span><b>− R$ 150,00</b></li>
            </ul>
          </div>
          <p className="wl-base">Tecnologia ORYGEN · marcas e dados fictícios</p>
        </div>
      </div>
    </section>
  );
}
