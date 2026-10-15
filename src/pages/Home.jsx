import VerticalMark from "../brand/Verticals.jsx";
import { Convergence, CountUp } from "../components/Story.jsx";
import { PhotoPair } from "../components/Photo.jsx";
import Manifesto from "../components/Manifesto.jsx";
import Hero from "../components/Hero.jsx";
import { Capabilities } from "../components/Sections.jsx";
import {
  usePageMeta, Eyebrow, Title, SectionHead, Icon, Arrow, Go, LinkArrow, Tiles, Tile, Checklist,
  PinnedLayers, PinnedSteps, FaqSection, ContactSection, LeadForm, DEFAULT_NEXT,
} from "../components/ui.jsx";

/* Página institucional. Conteúdo: src/pages/home.mjs e briefing do site de referência (ver LEIA-ME, versão 5). */

const CAPS = [
  "Contas e pagamentos",
  "Cobranças e recebimentos",
  "Crédito e recebíveis",
  "Conta escrow",
  "Consultoria tributária",
  "Regularização de dívidas",
  "Recuperação de créditos",
  "White label e APIs",
];

// PENDENTE: princípios "Como trabalhamos" vêm de valores propostos no branding, ainda sem homologação.
const PRINCIPLES = [
  ["Clareza", "Explicamos custos, condições, responsabilidades e próximos passos."],
  ["Critério", "Entendemos o negócio antes de recomendar um produto."],
  ["Responsabilidade", "Propomos apenas o que a operação pode sustentar."],
  ["Discrição e proximidade", "Preservamos as informações da empresa, com um responsável identificado pelo atendimento."],
];

const PATHS = [
  {
    v: "pay",
    area: "ORYGEN PAY · Soluções financeiras",
    need: "Quero utilizar soluções financeiras na minha empresa.",
    desc: "Contas, pagamentos, cobranças, crédito e recebíveis, operados com a infraestrutura de instituições parceiras.",
    items: ["Conta PJ e PF, Pix, TED e boletos", "Link de pagamento e máquina de cartão", "Crédito, CCB e antecipação de recebíveis", "Conta escrow e estruturas vinculadas"],
    to: "/baas",
    cta: "Conhecer as soluções financeiras",
  },
  {
    v: "tax",
    area: "ORYGEN Tax · Consultoria tributária",
    need: "Quero avaliar e organizar o cenário tributário da minha empresa.",
    desc: "Consultoria tributária 360°, do diagnóstico ao planejamento patrimonial, sempre a partir da realidade da empresa.",
    items: ["Diagnóstico e planejamento tributário", "Regularização de dívidas tributárias", "Recuperação de créditos tributários", "Planejamento e proteção patrimonial"],
    to: "/tributario",
    cta: "Conhecer a consultoria tributária",
  },
  {
    v: "tech",
    area: "ORYGEN Tech · BaaS White Label",
    need: "Quero oferecer uma experiência financeira com a marca da minha empresa.",
    desc: "Tecnologia e APIs para operar contas e pagamentos com a sua marca, conectadas à instituição liquidante que você contratar.",
    items: ["Plataforma white label", "Integração via API", "Projeto personalizado", "Implantação e suporte"],
    to: "/white-label",
    cta: "Conhecer o BaaS White Label",
  },
];

const NEEDS = [
  ["wallet", "Organizar recebimentos e pagamentos", "Soluções financeiras", "/baas", "contas-e-pagamentos"],
  ["barcode", "Cobrar por boleto, link ou cartão", "Soluções financeiras", "/baas", "cobrancas-e-recebimentos"],
  ["growth", "Avaliar capital de giro e antecipação de recebíveis", "Soluções financeiras", "/baas", "credito-e-recebiveis"],
  ["lock", "Vincular movimentações às condições de um contrato", "Soluções financeiras", "/baas", "estruturas-vinculadas"],
  ["fileCheck", "Regularizar débitos com o Fisco", "Consultoria tributária", "/tributario/regularizacao"],
  ["recover", "Identificar créditos tributários a recuperar", "Consultoria tributária", "/tributario/recuperacao-de-creditos"],
  ["landmark", "Planejar tributos e organizar o patrimônio", "Consultoria tributária", "/tributario", "areas"],
  ["layers", "Oferecer serviços financeiros com a própria marca", "BaaS White Label", "/white-label"],
];

const SEGMENTS = [
  ["factory", "Indústria", "Ciclo de caixa, prazo de fornecedores, recebíveis e capital de giro.", "Sócios, diretoria financeira e controladoria."],
  ["truck", "Transportes e logística", "Descompasso entre recebimentos e despesas, cobranças e capital de giro.", "Sócios, financeiro e operação."],
  ["clipboard", "Licitações e contratos públicos", "Prazos contratuais, previsibilidade de caixa e organização de recebíveis.", "Sócios, financeiro e responsável por contratos."],
  ["users", "Negócios com base própria de clientes", "Fintechs em estruturação, plataformas e ERPs que querem oferecer serviços financeiros com a própria marca.", "Sócios, produto e tecnologia."],
];

const FIRST_TALK = [
  "Qual problema financeiro mais atrapalha a operação hoje?",
  "Como a empresa recebe e quais compromissos concentram os pagamentos?",
  "Quais soluções já utiliza e onde encontra dificuldade?",
  "Existe uma necessidade de crédito, de organização dos fluxos ou tributária?",
  "Quem participa da decisão e qual é o prazo necessário?",
];

const FAQ = [
  ["O que a ORYGEN faz?", "A ORYGEN reúne três frentes: soluções financeiras para empresas (ORYGEN PAY), consultoria tributária (ORYGEN Tax) e tecnologia white label para quem quer oferecer serviços financeiros com a própria marca (ORYGEN Tech). Em todas, o trabalho começa pelo entendimento da operação da empresa."],
  ["A ORYGEN é um banco?", "Não. A ORYGEN atua com tecnologia, relacionamento e consultoria. Contas, pagamentos, crédito e demais serviços financeiros são executados por instituições parceiras habilitadas, responsáveis por cada operação conforme o produto contratado. Em cada proposta, informamos quem executa o quê."],
  ["Qual é a diferença entre soluções financeiras e BaaS White Label?", "Nas soluções financeiras, a sua empresa usa contas, pagamentos, cobranças e crédito no dia a dia. No BaaS White Label, a sua empresa contrata a tecnologia para oferecer uma experiência financeira com a sua marca aos seus próprios clientes, conectada a uma instituição liquidante contratada por você."],
  ["Onde a ORYGEN atende?", "Nosso foco comercial inicial está em São Paulo e no Rio de Janeiro. Se a sua empresa está em outra localidade, conte sobre a operação pelo formulário e avaliaremos o atendimento."],
  ["Quanto custa?", "Depende da solução, do volume e do escopo. Custos, critérios e condições são apresentados por escrito na proposta, depois da conversa inicial e da avaliação do cenário."],
  ["Preciso enviar documentos para a primeira conversa?", "Não. Para começar, basta descrever a necessidade. Se a solução avançar, informamos quais documentos são necessários e combinamos um canal seguro para o envio. Não envie documentos, extratos ou senhas pelo formulário do site."],
];

export default function Home() {
  usePageMeta({
    title: "ORYGEN | Soluções financeiras, tributárias e tecnologia",
    description: "Soluções financeiras, consultoria tributária e tecnologia white label para empresas de médio e grande porte, com foco em São Paulo e Rio de Janeiro.",
  });

  return (
    <>
      <Hero />
      <Capabilities label="A ORYGEN conecta" items={CAPS} />

      {/* Apresentação */}
      <section className="sec light" id="apresentacao" aria-labelledby="apresentacao-t">
        <div className="wrap split">
          <div>
            <Eyebrow>A ORYGEN</Eyebrow>
            <Title id="apresentacao-t" b="Uma visão integrada" l="da operação financeira e tributária." />
          </div>
          <div className="prose">
            <p className="lede" data-reveal="">
              A ORYGEN conecta empresários a soluções financeiras, crédito e inteligência tributária. Combinamos
              relacionamento, tecnologia e visão da operação para ajudar cada empresa a avaliar caminhos e organizar suas
              decisões, com a participação de parceiros habilitados conforme a solução.
            </p>
            <p data-reveal="">
              O nome vem das ideias de origem, originação e geração de oportunidades. Começamos entendendo como a sua
              empresa recebe, paga e precisa crescer. A partir desse diagnóstico, avaliamos soluções financeiras e
              tributárias adequadas ao momento e acompanhamos os próximos passos.
            </p>
          </div>
        </div>
        <div className="wrap">
          <h3 className="mini-h" data-reveal="">Como trabalhamos</h3>
          <ul className="principles" data-reveal="">
            {PRINCIPLES.map(([t, d]) => (
              <li key={t}><h4>{t}</h4><p>{d}</p></li>
            ))}
          </ul>
        </div>
      </section>

      {/* Três áreas de atuação */}
      <Manifesto />

      <section className="sec alt" id="solucoes" aria-labelledby="solucoes-t">
        <div className="wrap">
          <SectionHead
            eyebrow="Áreas de atuação"
            id="solucoes-t"
            b="Três frentes, um mesmo ponto de partida:"
            l="entender a sua empresa."
            text="Escolha o caminho mais próximo da sua necessidade. BaaS (Banking as a Service) é a integração de serviços financeiros por meio da infraestrutura de instituições parceiras."
          />
          <div className="paths" data-reveal="">
            {PATHS.map((p) => (
              <article className="path" key={p.to}>
                <span className="path-mark"><VerticalMark v={p.v} /></span>
                <p className="path-area">{p.area}</p>
                <h3 className="path-need">“{p.need}”</h3>
                <p className="path-desc">{p.desc}</p>
                <ul className="path-list">{p.items.map((i) => <li key={i}>{i}</li>)}</ul>
                <LinkArrow to={p.to}>{p.cta}</LinkArrow>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Quem faz o quê: camadas presas na tela (animação da v4) */}
      <PinnedLayers
        id="como-atuamos"
        eyebrow="Quem faz o quê"
        b="Cada parte"
        l="com uma função clara."
        lede="Saber quem faz o quê é parte da segurança da operação. Em cada proposta, informamos quem executa cada serviço."
        planes={["Sua empresa", "ORYGEN", "Instituições parceiras"]}
        items={[
          { title: "Sua empresa", sub: "O ponto de partida", text: "Como a empresa recebe, paga, se financia e cumpre suas obrigações tributárias orienta cada recomendação." },
          { title: "ORYGEN", sub: "Tecnologia, relacionamento e consultoria", text: "Atendimento consultivo, diagnóstico da operação, consultoria tributária, tecnologia e acompanhamento depois da ativação." },
          {
            title: "Instituições parceiras",
            sub: "Execução financeira",
            text: "Contas, pagamentos, crédito e demais serviços financeiros são executados por instituições parceiras habilitadas, conforme cada produto e contratação.",
            link: { to: "/baas", section: "parceiros", label: "Ver as responsabilidades" },
          },
        ]}
      />

      {/* Necessidades empresariais */}
      <section className="sec alt" id="necessidades" aria-labelledby="necessidades-t">
        <div className="wrap">
          <SectionHead
            eyebrow="Necessidades empresariais"
            id="necessidades-t"
            b="O que a sua empresa"
            l="precisa resolver?"
            text="Algumas das demandas que ajudamos empresas a avaliar e organizar."
          />
          <ul className="needs" data-reveal="">
            {NEEDS.map(([ic, t, area, to, section], i) => (
              <li key={t} style={{ "--i": i }}>
                <Go className="need" to={to} section={section}>
                  <Icon name={ic} />
                  <span><b>{t}</b><small>{area}</small></span>
                  <Arrow />
                </Go>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Fundadores */}
      <section className="sec dark founders" id="fundadores" aria-labelledby="fundadores-t">
        <div className="wrap founders-grid">
          <div className="founders-txt">
            <SectionHead
              split={false}
              eyebrow="Quem conduz a ORYGEN"
              id="fundadores-t"
              b="Experiência bancária, tributária e tecnológica"
              l="na mesma mesa."
              text="A combinação dessas trajetórias sustenta uma abordagem que une diagnóstico empresarial, relacionamento e estruturação financeira com inteligência tributária."
            />
            {/* "11+" é a experiência dos fundadores, não a idade da empresa (briefing). */}
            <div className="exp-fig" data-reveal="">
              <CountUp to={11} suffix="+" />
              <span>anos de experiência dos fundadores no relacionamento com instituições financeiras, na originação de negócios e na formação de carteiras.</span>
            </div>
          </div>
          <Convergence />
        </div>
      </section>

      {/* Públicos prioritários */}
      <section className="sec light" id="publicos" aria-labelledby="publicos-t">
        <div className="wrap">
          <SectionHead
            eyebrow="Públicos prioritários"
            id="publicos-t"
            b="Para empresas com operação real"
            l="e decisões que não podem esperar."
            text="Atendemos empresários e empresas de médio e grande porte. O foco comercial inicial está em São Paulo e no Rio de Janeiro."
          />
          <PhotoPair
            items={[
              ["sao-paulo.jpg", "Vista de São Paulo ao anoitecer, a partir de um escritório envidraçado.", "São Paulo", "Foco comercial inicial"],
              ["rio.jpg", "Vista do Rio de Janeiro ao anoitecer, com a Baía de Guanabara e o Pão de Açúcar.", "Rio de Janeiro", "Foco comercial inicial"],
            ]}
          />
          <Tiles cols={4}>
            {SEGMENTS.map(([ic, t, need, who]) => (
              <Tile key={t} icon={ic} title={t} meta={[["Com quem conversamos", who]]}>
                <p>{need}</p>
              </Tile>
            ))}
          </Tiles>
        </div>
      </section>

      {/* Como começa o relacionamento: régua presa na tela (animação da v4) */}
      <PinnedSteps
        id="como-comecamos"
        eyebrow="Como começa o relacionamento"
        b="Antes de qualquer proposta,"
        l="entendemos a operação."
        lede="O atendimento é consultivo: primeiro ouvimos, depois avaliamos, e só então recomendamos."
        steps={[
          ["Entender a necessidade", "Conversamos sobre como a empresa recebe, paga, se financia e cumpre suas obrigações tributárias. Nesta etapa não é preciso enviar documentos."],
          ["Avaliar o cenário", "Analisamos fluxo financeiro, recebíveis, crédito e tributos para identificar quais soluções são compatíveis com a operação e com os critérios dos parceiros envolvidos."],
          ["Apresentar a solução", "Você recebe uma proposta com escopo, custos, critérios e próximos passos. A contratação só acontece se fizer sentido para a empresa."],
        ]}
      />

      <section className="sec light" id="primeira-conversa" aria-labelledby="primeira-t">
        <div className="wrap split">
          <div>
            <Eyebrow>Primeira conversa</Eyebrow>
            <Title id="primeira-t" b="Perguntas" l="da primeira conversa." />
            <p className="lede" data-reveal="">Para começar, basta descrever a necessidade. Estas são as perguntas que costumam orientar o primeiro contato.</p>
          </div>
          <Checklist items={FIRST_TALK} />
        </div>
      </section>

      <FaqSection alt title={["Dúvidas comuns", "sobre a ORYGEN."]} items={FAQ} />

      <ContactSection
        b="Converse"
        l="com a ORYGEN."
        text="Conte qual é a principal necessidade da sua empresa. Vamos direcionar seu atendimento ao responsável adequado."
        next={DEFAULT_NEXT}
        form={<LeadForm form="institucional" title="Fale sobre sua empresa" submit="Enviar mensagem" />}
      />
    </>
  );
}
