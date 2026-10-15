import {
  usePageMeta, PageHero, Eyebrow, Title, SectionHead, Checklist, Note, Tiles, Tile, Go,  FaqSection,
} from "../components/ui.jsx";
import { FiveYears } from "../components/Heroes.jsx";
import { StackSteps } from "../components/Story.jsx";
import { TaxContact, LAWYER_NOTE, TAX_CRUMB } from "../components/Tax.jsx";

/* Landing page: recuperação de créditos tributários. Conteúdo: src/pages/recuperacao.mjs do site de referência.
   PENDENTE: revisão técnica do conteúdo tributário pelo Ricardo. */

const ORIGINS = [
  { icon: "search", title: "Pagamentos a maior ou indevidos", text: "Erros de cálculo, de alíquota ou de base de cálculo em apurações anteriores." },
  { icon: "layers", title: "Créditos não aproveitados", text: "Créditos previstos em lei que não foram registrados, como os de PIS e Cofins sobre insumos no regime não cumulativo." },
  { icon: "scale", title: "Entendimentos dos tribunais", text: "Decisões do STF e do STJ que alteram a forma de cálculo de tributos, como a que excluiu o ICMS da base de PIS e Cofins." },
  { icon: "clipboard", title: "Classificação e regimes especiais", text: "Classificação fiscal de produtos, benefícios e regimes especiais que deixaram de ser aplicados." },
];

const FAQ = [
  ["Minha empresa certamente tem créditos a recuperar?", "Não necessariamente. A existência de crédito só é confirmada depois da análise das apurações e dos documentos. Se não houver valores consistentes, isso também é informado."],
  ["Como os créditos são utilizados?", "Por compensação com tributos devidos, por meio da declaração própria (na esfera federal, o PER/DCOMP), ou por restituição, administrativa ou judicial, conforme o caso e o tributo."],
  ["Existe risco?", "Como em qualquer procedimento tributário, sim. Por isso o parecer apresenta os fundamentos e os riscos de cada crédito antes de qualquer decisão sobre o uso."],
  ["Empresas do Simples Nacional podem recuperar créditos?", "Em situações específicas, como pagamentos em duplicidade ou tributos que não deveriam compor a base de cálculo do Simples. A análise indica se é o caso da sua empresa."],
  ["Quanto custa a revisão?", "O modelo de honorários é definido conforme o escopo e apresentado por escrito na proposta, antes do início do trabalho."],
];

export default function Recuperacao() {
  usePageMeta({
    title: "Recuperação de créditos tributários | ORYGEN",
    description: "Revisão de tributos pagos indevidamente ou a maior nos últimos cinco anos e dos caminhos para compensação ou restituição, com base técnica e jurídica.",
  });

  return (
    <>
      <PageHero
        mark="tax"
        crumbs={[TAX_CRUMB, ["Recuperação de créditos"]]}
        eyebrow="ORYGEN Tax · Recuperação de créditos"
        b="Recuperação de créditos"
        l="tributários."
        lead="Revisão de tributos pagos indevidamente ou a maior nos últimos cinco anos e dos caminhos para compensação ou restituição, com base técnica e jurídica."
        ctas={[{ label: "Solicite uma avaliação tributária", section: "contato" }, { label: "Entender como funciona", section: "o-que-e" }]}
        variant="rec"
        visual={<FiveYears />}
      />

      <section className="sec light" id="o-que-e" aria-labelledby="oque-t">
        <div className="wrap split">
          <div>
            <Eyebrow>Entenda</Eyebrow>
            <Title id="oque-t" b="O que são créditos" l="tributários a recuperar." />
          </div>
          <div className="prose">
            <p className="lede" data-reveal="">
              São valores que a empresa pagou a mais ou indevidamente, ou créditos que deixou de aproveitar na apuração.
              Podem surgir de erros de classificação, mudanças de entendimento dos tribunais, regimes especiais não
              aplicados ou créditos não registrados.
            </p>
            <p data-reveal="">
              Em regra, o pedido alcança pagamentos feitos nos últimos cinco anos (art. 168 do Código Tributário Nacional).
              Por isso, o período analisado é sempre limitado e a revisão precisa de método.
            </p>
          </div>
        </div>
      </section>

      <section className="sec alt" id="origens" aria-labelledby="origens-t">
        <div className="wrap">
          <SectionHead
            eyebrow="Origens comuns"
            id="origens-t"
            b="De onde costumam vir"
            l="os créditos."
            text="Exemplos de origem. Cada um depende da atividade, do regime e do histórico de apuração da empresa."
          />
          <Tiles cols={4}>
            {ORIGINS.map((o) => (
              <Tile key={o.title} icon={o.icon} title={o.title}><p>{o.text}</p></Tile>
            ))}
          </Tiles>
          <Note>A existência de crédito só é confirmada após a análise dos documentos. Nem toda empresa tem valores a recuperar.</Note>
        </div>
      </section>

      <section className="sec light" id="para-quem" aria-labelledby="paraquem-t">
        <div className="wrap split even">
          <div>
            <Eyebrow>Para quem faz mais sentido</Eyebrow>
            <Title id="paraquem-t" b="Perfis com maior chance" l="de encontrar créditos." />
          </div>
          <Checklist
            items={[
              "Empresas do Lucro Real ou do Lucro Presumido com operações de maior volume.",
              "Indústrias e empresas com grande volume de compras de insumos.",
              "Empresas que mudaram de regime, de atividade ou de sistema de gestão.",
              "Empresas que nunca revisaram as apurações dos últimos anos.",
            ]}
          />
        </div>
      </section>

      <StackSteps
        id="etapas"
        eyebrow="Como funciona"
        b="Etapas"
        l="da recuperação."
        steps={[
          ["Levantamento", "Entendemos a operação e definimos período, tributos e documentos a analisar."],
          ["Revisão das apurações", "Cruzamos escrituração, guias e declarações para identificar inconsistências e oportunidades."],
          ["Quantificação e parecer", "Cada crédito é quantificado, com fundamentos e riscos documentados."],
          ["Compensação ou restituição", "Definimos com a empresa a via de aproveitamento e preparamos os pedidos cabíveis."],
          ["Acompanhamento", "Acompanhamos a análise do Fisco e eventuais questionamentos, conforme o escopo."],
        ]}
      />

      <section className="sec light" id="cuidados" aria-labelledby="cuidados-t">
        <div className="wrap split">
          <div>
            <Eyebrow>Segurança do processo</Eyebrow>
            <Title id="cuidados-t" b="Por que a análise vem" l="antes da compensação." />
          </div>
          <div className="prose">
            <p data-reveal="">
              Compensações sem fundamento técnico podem não ser homologadas pela Receita Federal, com cobrança do valor
              compensado, acréscimos e possíveis penalidades. Por isso cada crédito é quantificado e documentado antes de
              ser utilizado.
            </p>
            <p data-reveal="">
              A transição da reforma tributária também altera as regras de créditos. Revisar o histórico agora ajuda a
              empresa a entrar no novo modelo com a apuração organizada.
            </p>
            <Note icon="scale">{LAWYER_NOTE}</Note>
          </div>
        </div>
      </section>

      <FaqSection
        alt
        title={["Dúvidas sobre", "recuperação de créditos."]}
        items={FAQ}
        aside={<p className="aside-link" data-reveal="">Veja também a <Go to="/tributario/regularizacao">regularização de dívidas tributárias</Go>.</p>}
      />

      <TaxContact
        form="recuperacao-creditos"
        checked={["recuperacao"]}
        b="Avalie se sua empresa tem"
        l="créditos a recuperar."
        text="Conte sobre a operação e o regime tributário. Um especialista indica se a revisão faz sentido e qual seria o escopo."
      />
    </>
  );
}
