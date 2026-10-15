import { Lockup } from "../brand/Brand.jsx";
import { Go, contactChannels } from "./ui.jsx";
import config from "../config.js";

const COLS = [
  {
    t: "Soluções",
    links: [
      ["/baas", "Soluções financeiras"],
      ["/white-label", "BaaS White Label"],
      ["/tributario", "Consultoria tributária"],
      ["/tributario/regularizacao", "Regularização de dívidas tributárias"],
      ["/tributario/recuperacao-de-creditos", "Recuperação de créditos tributários"],
    ],
  },
  {
    t: "A ORYGEN",
    links: [
      ["/", "Apresentação", "apresentacao"],
      ["/", "Áreas de atuação", "solucoes"],
      ["/", "Quem conduz a ORYGEN", "fundadores"],
      ["/", "Como começa o relacionamento", "como-comecamos"],
      ["/", "Perguntas frequentes", "perguntas"],
    ],
  },
  {
    t: "Institucional",
    links: [
      ["/privacidade", "Política de Privacidade"],
      ["/termos", "Termos de Uso"],
      ["/", "Formulário de contato", "contato"],
    ],
  },
];

export default function Footer() {
  const channels = contactChannels();
  const year = new Date().getFullYear();
  return (
    <footer className="foot dark">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand" data-reveal="">
            <Lockup className="foot-logo" title="ORYGEN" />
            <p className="foot-slogan">{config.brand.slogan}</p>
            <p>Soluções financeiras, consultoria tributária e tecnologia conectadas à realidade da sua empresa.</p>
            {channels.length > 0 && (
              <dl className="foot-ch">
                {channels.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
              </dl>
            )}
          </div>
          {COLS.map((c) => (
            <nav key={c.t} className="foot-col" aria-label={`Rodapé: ${c.t}`}>
              <h2>{c.t}</h2>
              <ul>
                {c.links.map(([to, label, section]) => (
                  <li key={label}><Go to={to} section={section}>{label}</Go></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <p className="legal">
          A ORYGEN atua com tecnologia, relacionamento e consultoria. Contas, pagamentos, crédito e demais serviços
          financeiros são executados por instituições parceiras habilitadas, conforme cada produto e contratação.
          Condições, prazos e disponibilidade dependem de análise. Interfaces exibidas no site são ilustrativas, com
          dados e marcas fictícios.
        </p>
        {/* PENDENTE: conferir razão social e CNPJ com o cartão CNPJ atual (config.company.verified). */}
        <p className="legal legal-co">
          © {year} ORYGEN · {config.company.legalName} · CNPJ {config.company.cnpj}
        </p>
      </div>
    </footer>
  );
}
