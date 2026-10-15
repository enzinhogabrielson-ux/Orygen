import { lazy, Suspense, useRef } from "react";
import { Symbol } from "../brand/Brand.jsx";
import useSectionProgress from "../hooks/useSectionProgress.js";
import useReducedMotion from "../hooks/useReducedMotion.js";
import { Words } from "./ui.jsx";
const OGParticles = lazy(() => import("./OGParticles.jsx"));

/*
  Topo preso na tela (seção alta). Com a rolagem:
  0 → 0,3   o texto de abertura sai devagar;
  0 → 1     o símbolo em partículas vai para o centro e se separa em camadas de profundidade;
  0,42 → 1  entra a frase "A ORYGEN conecta soluções financeiras, consultoria tributária e tecnologia."
*/
export default function Hero() {
  const reduce = useReducedMotion();
  const [ref, progress] = useSectionProgress();
  const anchor = useRef(null);

  return (
    <section className="hero dark" ref={ref} aria-labelledby="titulo-pagina">
      <div className="hero-pin">
        <div className="hero-sky" aria-hidden="true" />
        <Suspense fallback={null}>
          <OGParticles progressRef={progress} anchorRef={anchor} reduce={reduce} />
        </Suspense>

        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow hero-in" style={{ "--d": "0.1s" }}>ORYGEN · Soluções Financeiras</p>
            {/* slogan aprovado, escrito exatamente assim */}
            <h1 id="titulo-pagina" className="hero-t tw-in" style={{ "--d": "0.2s" }}>
              <span className="w-b"><Words text="A inteligência por trás" /></span> <span className="w-l"><Words text="do próximo passo." from={4} /></span>
            </h1>
            <p className="hero-lede hero-in" style={{ "--d": "0.35s" }}>
              Soluções financeiras, consultoria tributária e tecnologia conectadas à realidade da sua empresa.
            </p>
            <div className="ctas hero-in" style={{ "--d": "0.5s" }}>
              <a className="btn btn-solid" href="#solucoes">Conheça nossas soluções</a>
              <a className="btn btn-line" href="#contato">Converse com a ORYGEN</a>
            </div>
          </div>
          {/* lugar do símbolo: o WebGL lê a posição desta caixa; sem WebGL mostra o símbolo vetorial */}
          <div className="hero-mark-box" ref={anchor} aria-hidden="true">
            <Symbol className="og-fallback" aria-hidden="true" />
          </div>
        </div>

        <p className="hero-second wrap">
          <span className="w-b">A ORYGEN conecta soluções financeiras,</span> <span className="w-l">consultoria tributária e tecnologia.</span>
        </p>

        <div className="scroll-cue" aria-hidden="true">
          <i />
        </div>
      </div>
    </section>
  );
}
