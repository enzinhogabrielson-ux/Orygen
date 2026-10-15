import { Symbol } from "../brand/Brand.jsx";
import { usePageMeta, Go, Arrow } from "../components/ui.jsx";

const LINKS = [
  ["/", "A ORYGEN", "Página inicial"],
  ["/baas", "Soluções financeiras", "Contas, pagamentos, crédito e recebíveis"],
  ["/white-label", "BaaS White Label", "Tecnologia com a sua marca"],
  ["/tributario", "Consultoria tributária", "Diagnóstico, regularização e recuperação de créditos"],
];

export default function NotFound() {
  usePageMeta({
    title: "Página não encontrada | ORYGEN",
    description: "A página procurada não existe ou mudou de endereço.",
  });
  return (
    <section className="nf dark" aria-labelledby="titulo-pagina">
      <div className="hero-sky" aria-hidden="true" />
      <div className="wrap nf-in">
        <Symbol className="nf-sym hero-in" aria-hidden="true" />
        <p className="eyebrow hero-in" style={{ "--d": "0.05s" }}>Erro 404</p>
        <h1 id="titulo-pagina" className="h2 hero-in" style={{ "--d": "0.12s" }}>
          <span className="w-b">Esta página não existe</span> <span className="w-l">ou mudou de endereço.</span>
        </h1>
        <p className="lede hero-in" style={{ "--d": "0.2s" }}>Confira o endereço digitado ou siga por um dos caminhos abaixo.</p>
        <ul className="nf-links hero-in" style={{ "--d": "0.3s" }}>
          {LINKS.map(([to, t, d]) => (
            <li key={to}>
              <Go to={to}>
                <span><b>{t}</b><small>{d}</small></span>
                <Arrow />
              </Go>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
