import {
  usePageMeta, PageHero, Eyebrow, Title, SectionHead, Icon, Checklist, Note, Tiles, Tile, Go, 
  FaqSection,
} from "../components/ui.jsx";
import { Untangle } from "../components/Heroes.jsx";
import { StackSteps } from "../components/Story.jsx";
import { TaxContact, LAWYER_NOTE, TAX_CRUMB } from "../components/Tax.jsx";

/* Landing page: regularização de dívidas tributárias. Conteúdo: src/pages/regularizacao.mjs do site de referência.
   PENDENTE: revisão técnica do conteúdo tributário pelo Ricardo. */

const SITUATIONS = [
  ["Débitos inscritos em dívida ativa", "A cobrança passa à procuradoria e ganha encargos adicionais."],
  ["Execução fiscal em andamento", "O processo pode levar a bloqueios de contas e penhora de bens."],
  ["Certidão de regularidade indisponível", "Sem a certidão, licitações, crédito e contratos ficam travados."],
  ["Parcelamento em atraso ou rescindido", "O saldo volta a ser cobrado integralmente, com acréscimos."],
  ["Protesto da dívida ativa", "O protesto restringe o crédito da empresa no mercado."],
  ["Autuação ou notificação do Fisco", "Prazos de defesa curtos exigem análise rápida e técnica."],
];

const PATHS = [
  { icon: "search", title: "Revisão do débito", text: "Verificação de prescrição, decadência, erros de cálculo e cobranças indevidas antes de qualquer negociação." },
  { icon: "calendar", title: "Parcelamento", text: "Modalidades ordinárias e especiais de parcelamento previstas na legislação de cada ente." },
  { icon: "document", title: "Transação tributária", text: "Acordo com o Fisco previsto em lei (na esfera federal, a Lei 13.988/2020), que pode envolver descontos sobre juros, multas e encargos e prazos ampliados, conforme a modalidade e a capacidade de pagamento." },
  { icon: "scale", title: "Defesa administrativa e judicial", text: "Impugnações, recursos e defesas em execução fiscal, conduzidos por advogado habilitado." },
  { icon: "shield", title: "Garantia e suspensão da cobrança", text: "Alternativas para garantir o débito ou suspender sua exigibilidade, permitindo a certidão positiva com efeitos de negativa quando cabível." },
];

const FAQ = [
  ["Existe desconto nas dívidas tributárias?", "A legislação prevê modalidades de transação e programas que podem reduzir juros, multas e encargos, segundo critérios próprios de cada modalidade e da capacidade de pagamento da empresa. Se algum benefício se aplica ao seu caso, isso só é confirmado depois da análise."],
  ["Ainda é possível regularizar com uma execução fiscal em andamento?", "Em muitos casos, sim. Parcelamento, transação, garantia ou defesa podem ser avaliados mesmo com a execução em curso. O que é possível depende da fase do processo e do tipo de débito."],
  ["A regularização permite emitir a certidão?", "Quando o débito é parcelado, transacionado, garantido ou tem a exigibilidade suspensa, a empresa pode obter a certidão positiva com efeitos de negativa, conforme as regras do órgão emissor."],
  ["Quanto tempo leva?", "Depende da quantidade de débitos, das esferas envolvidas e da alternativa escolhida. Os prazos estimados são apresentados junto com as alternativas, antes de qualquer decisão."],
  ["A análise inclui débitos estaduais e municipais?", "Sim. O levantamento pode abranger débitos federais, estaduais e municipais, e as alternativas são avaliadas conforme as regras de cada ente."],
];

export default function Regularizacao() {
  usePageMeta({
    title: "Regularização de dívidas tributárias | ORYGEN",
    description: "Análise do passivo tributário e das alternativas previstas em lei, como revisão do débito, parcelamento e transação, para débitos federais, estaduais e municipais.",
  });

  return (
    <>
      <PageHero
        mark="tax"
        crumbs={[TAX_CRUMB, ["Regularização de dívidas"]]}
        eyebrow="ORYGEN Tax · Regularização"
        b="Regularização de dívidas"
        l="tributárias."
        lead="Análise do passivo e das alternativas previstas em lei para organizar débitos com a Receita Federal, a Procuradoria-Geral da Fazenda Nacional (PGFN), estados e municípios."
        ctas={[{ label: "Solicite uma avaliação tributária", section: "contato" }, { label: "Ver alternativas", section: "caminhos" }]}
        layout="band"
        variant="reg"
        band={<Untangle />}
      />

      <section className="sec light" id="situacoes" aria-labelledby="situacoes-t">
        <div className="wrap">
          <SectionHead
            eyebrow="Situações comuns"
            id="situacoes-t"
            b="Reconhece alguma"
            l="destas situações?"
            text="Débitos tributários afetam o caixa, o acesso a crédito e a participação em contratos. Quanto antes o passivo é mapeado, mais alternativas costumam estar disponíveis."
          />
          <ul className="needs static" data-reveal="">
            {SITUATIONS.map(([t, d]) => (
              <li key={t}>
                <div className="need">
                  <Icon name="alert" />
                  <span><b>{t}</b><small>{d}</small></span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec alt" id="caminhos" aria-labelledby="caminhos-t">
        <div className="wrap">
          <SectionHead
            eyebrow="Alternativas"
            id="caminhos-t"
            b="Caminhos que podem"
            l="ser avaliados."
            text="A escolha depende do tipo de débito, da fase da cobrança e da capacidade de pagamento da empresa. Muitas vezes, mais de um caminho é combinado."
          />
          <Tiles cols={3}>
            {PATHS.map((p) => (
              <Tile key={p.title} icon={p.icon} title={p.title}><p>{p.text}</p></Tile>
            ))}
            <article className="tile tile-cta">
              <h3 className="tile-t">Não sabe por onde começar?</h3>
              <p>O primeiro passo é mapear o passivo. A partir dele, indicamos as alternativas viáveis e a ordem recomendada.</p>
              <Go className="btn btn-solid" section="contato">Solicitar avaliação</Go>
            </article>
          </Tiles>
          <Note>A viabilidade de cada alternativa depende do caso concreto e das regras vigentes em cada esfera. Descontos, prazos e resultados não são garantidos.</Note>
        </div>
      </section>

      <StackSteps
        id="etapas"
        eyebrow="Como funciona"
        b="Etapas"
        l="da regularização."
        steps={[
          ["Levantamento do passivo", "Identificamos débitos, esferas, situação de cobrança e parcelamentos existentes."],
          ["Análise técnica e jurídica", "Revisamos a validade e os valores cobrados e avaliamos as alternativas cabíveis."],
          ["Alternativas com custos e riscos", "Apresentamos os caminhos possíveis, com prazos estimados e impacto no caixa."],
          ["Execução e acompanhamento", "Adesões, pedidos e defesas são feitos e acompanhados conforme o escopo contratado."],
        ]}
      />

      <section className="sec light" id="preparar" aria-labelledby="preparar-t">
        <div className="wrap split even">
          <div>
            <Eyebrow>Para começar</Eyebrow>
            <Title id="preparar-t" b="O que ajuda" l="na primeira conversa." />
            <p className="lede" data-reveal="">Não é preciso ter tudo organizado. Se faltar alguma informação, orientamos como obtê-la.</p>
          </div>
          <div className="prose">
            <Checklist
              items={[
                "Uma noção dos débitos: tributos, esferas e valores aproximados.",
                "Parcelamentos ativos ou anteriores.",
                "Notificações, autos de infração ou processos recebidos.",
                "Regime tributário e faturamento anual aproximado.",
              ]}
            />
            <Note icon="lock">Documentos são solicitados depois, por canal seguro. Não envie documentos pelo formulário. {LAWYER_NOTE}</Note>
          </div>
        </div>
      </section>

      <FaqSection
        alt
        title={["Dúvidas sobre", "regularização."]}
        items={FAQ}
        aside={<p className="aside-link" data-reveal="">Veja também a <Go to="/tributario/recuperacao-de-creditos">recuperação de créditos tributários</Go>.</p>}
      />

      <TaxContact
        form="regularizacao-tributaria"
        checked={["regularizacao"]}
        b="Mapeie o passivo"
        l="da sua empresa."
        text="Conte quais débitos preocupam a empresa hoje. Um especialista avalia o cenário e indica as alternativas que podem ser analisadas."
      />
    </>
  );
}
