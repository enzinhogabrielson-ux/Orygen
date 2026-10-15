import {
  usePageMeta, PageHero, Eyebrow, Title, SectionHead, Checklist, Note, Tiles, Tile, PinnedSteps, FaqSection,
} from "../components/ui.jsx";
import { TaxContact, LAWYER_NOTE } from "../components/Tax.jsx";
import { Radar360 } from "../components/Heroes.jsx";
import { ReformaChart } from "../components/Story.jsx";
import { PhotoBand } from "../components/Photo.jsx";

/* Consultoria tributária (ORYGEN Tax). Conteúdo: src/pages/tributario.mjs do site de referência.
   PENDENTE: revisão técnica do conteúdo tributário pelo Ricardo. */

const AREAS = [
  { icon: "search", title: "Diagnóstico e revisão tributária", what: "Levantamento do enquadramento, das apurações, das obrigações acessórias e dos riscos tributários da empresa.", when: "Antes de decisões relevantes, depois de um período de crescimento ou quando há dúvida sobre o regime." },
  { icon: "route", title: "Planejamento tributário", what: "Avaliação de alternativas lícitas de organização das operações, do regime e da estrutura, com projeção dos efeitos sobre a carga tributária.", when: "Na mudança de regime, abertura de unidades, lançamento de produtos, reorganizações societárias e preparação para a reforma tributária." },
  { icon: "fileCheck", title: "Regularização de dívidas tributárias", what: "Análise do passivo e das alternativas previstas em lei, como revisão do débito, parcelamentos e transação tributária.", when: "Com débitos em aberto, inscrição em dívida ativa, execução fiscal ou dificuldade para obter certidões.", link: { to: "/tributario/regularizacao", label: "Ver regularização" } },
  { icon: "recover", title: "Recuperação de créditos tributários", what: "Identificação de valores pagos indevidamente ou a maior e dos caminhos para compensação ou restituição.", when: "Para empresas que querem revisar os últimos cinco anos de apuração.", link: { to: "/tributario/recuperacao-de-creditos", label: "Ver recuperação de créditos" } },
  { icon: "landmark", title: "Planejamento e proteção patrimonial", what: "Organização societária e patrimonial, como holdings e planejamento sucessório, avaliada à luz da legislação e dos efeitos tributários.", when: "Na sucessão da família empresária, na entrada ou saída de sócios e na organização de bens." },
  { icon: "eye", title: "Acompanhamento e orientação", what: "Orientação contínua sobre mudanças na legislação e nas obrigações da empresa, conforme o escopo contratado.", when: "Para empresas que querem apoio recorrente nas decisões tributárias." },
];

const WHEN = [
  "A empresa cresceu e o regime tributário pode não ser mais o adequado.",
  "Há débitos em aberto, parcelamentos em atraso ou inscrição em dívida ativa.",
  "A empresa não consegue emitir certidão de regularidade fiscal.",
  "Existe suspeita de que tributos foram pagos a maior.",
  "Uma operação relevante está em vista: aquisição, nova unidade ou novo produto.",
  "A reforma tributária exige revisar preços, contratos e sistemas.",
  "A família empresária precisa organizar a sucessão e o patrimônio.",
  "A empresa recebeu uma autuação ou notificação do Fisco.",
];

const FAQ = [
  ["A consultoria garante redução de impostos?", "Não. Toda recomendação depende da análise da empresa e da legislação aplicável. O que oferecemos é uma avaliação técnica das alternativas, com riscos, custos e efeitos esperados apresentados de forma clara."],
  ["Quanto custa a consultoria?", "Os honorários são definidos conforme o escopo e a complexidade do trabalho e apresentados por escrito na proposta, antes do início."],
  ["Preciso enviar documentos agora?", "Não. A primeira conversa serve para entender a empresa. Se o trabalho avançar, indicamos quais documentos são necessários e combinamos um canal seguro para o envio."],
  ["Vocês atendem empresas de qualquer regime tributário?", "A análise considera as regras de cada regime: Simples Nacional, Lucro Presumido ou Lucro Real. Nosso foco são empresas de médio e grande porte; conte sobre a sua pelo formulário."],
  ["Qual a diferença entre regularização e recuperação de créditos?", "Regularização trata de débitos que a empresa tem com o Fisco. Recuperação trata de valores que a empresa pagou a mais ou indevidamente e pode compensar ou ter restituídos. Os objetivos, as etapas e os critérios são diferentes, e os dois temas podem ser avaliados em conjunto."],
  ["Proteção patrimonial serve para deixar de pagar dívidas?", "Não. O planejamento patrimonial organiza a estrutura societária e os bens dentro da lei, com foco em governança, sucessão e eficiência tributária. Estruturas criadas para frustrar credores podem ser desconsideradas pela Justiça e gerar responsabilização."],
  ["Quem conduz o trabalho?", `A frente tributária conta com a experiência de advogado tributário. ${LAWYER_NOTE}`],
];

export default function Tributario() {
  usePageMeta({
    title: "Consultoria tributária para empresas | ORYGEN",
    description: "Consultoria tributária 360° para empresas: diagnóstico, planejamento, regularização de dívidas, recuperação de créditos e planejamento patrimonial.",
  });

  return (
    <>
      <PageHero
        mark="tax"
        eyebrow="ORYGEN Tax · Consultoria tributária"
        b="Inteligência tributária"
        l="para decisões mais consistentes."
        lead="Consultoria tributária 360°: diagnóstico, planejamento, regularização de dívidas, recuperação de créditos e planejamento patrimonial, a partir da realidade de cada empresa."
        ctas={[{ label: "Solicite uma avaliação tributária", section: "contato" }, { label: "Ver áreas de atuação", section: "areas" }]}
        variant="tax"
        visual={<Radar360 />}
      />

      <section className="sec light" id="visao-360" aria-labelledby="visao-t">
        <div className="wrap split">
          <div>
            <Eyebrow>Visão 360°</Eyebrow>
            <Title id="visao-t" b="Uma consultoria que olha" l="a empresa inteira." />
          </div>
          <div className="prose">
            <p className="lede" data-reveal="">
              Tributos, dívidas, créditos e patrimônio se influenciam. Uma mudança de regime afeta o caixa; um débito em
              aberto pode travar uma operação de crédito ou uma licitação; a forma como o patrimônio está organizado pesa na
              sucessão e na carga tributária.
            </p>
            <p data-reveal="">
              Por isso a análise começa pela visão completa da empresa e só depois chega às recomendações, sempre com
              riscos, custos e alternativas apresentados de forma clara.
            </p>
            <Note icon="scale">{LAWYER_NOTE}</Note>
          </div>
        </div>
      </section>

      <section className="sec alt" id="areas" aria-labelledby="areas-t">
        <div className="wrap">
          <SectionHead
            eyebrow="Áreas de atuação"
            id="areas-t"
            b="O que a consultoria"
            l="tributária envolve."
            text="Cada frente pode ser contratada isoladamente ou combinada, conforme o momento da empresa."
          />
          <Tiles cols={3}>
            {AREAS.map((a) => (
              <Tile key={a.title} icon={a.icon} title={a.title} meta={[["Quando faz sentido", a.when]]} link={a.link}>
                <p>{a.what}</p>
              </Tile>
            ))}
          </Tiles>
        </div>
      </section>

      <PhotoBand
        src="sala.jpg"
        alt="Sala de reunião ao anoitecer, com documentos organizados sobre a mesa e a cidade ao fundo."
        eyebrow="Decisões com base"
        text="Antes de recomendar, entendemos a empresa: regime, histórico, operação e objetivos."
        align="right"
      />

      <section className="sec light" id="quando" aria-labelledby="quando-t">
        <div className="wrap">
          <SectionHead eyebrow="Quando procurar" id="quando-t" b="Situações em que vale" l="ouvir um especialista." />
          <Checklist items={WHEN} cols={2} />
        </div>
      </section>

      <PinnedSteps
        id="como-funciona"
        eyebrow="Como funciona"
        b="Do entendimento da empresa"
        l="à execução."
        lede="Cada etapa tem um objetivo claro, e a seguinte só começa com a sua concordância."
        steps={[
          ["Entendimento da empresa", "Conversa sobre atividade, regime, histórico e objetivos. Nesta etapa não é preciso enviar documentos."],
          ["Levantamento de informações", "Definimos juntos quais dados e documentos são necessários e o canal seguro para o envio."],
          ["Análise técnica e jurídica", "Revisão de apurações, débitos, créditos e estrutura, considerando a legislação e a jurisprudência aplicáveis."],
          ["Apresentação de alternativas", "Os caminhos possíveis, com riscos, custos, prazos estimados e documentação necessária para cada um."],
          ["Execução e acompanhamento", "Implementação das medidas escolhidas e acompanhamento, conforme o escopo contratado."],
        ]}
      />

      <section className="sec light" id="analise" aria-labelledby="analise-t">
        <div className="wrap split even">
          <div>
            <Eyebrow>Análise individual</Eyebrow>
            <Title id="analise-t" b="Cada empresa," l="uma análise." />
            <p className="lede" data-reveal="">Não trabalhamos com soluções prontas. A análise considera:</p>
            <Checklist
              items={[
                "Regime tributário e atividade da empresa.",
                "Operações, mercados atendidos e cadeia de fornecedores.",
                "Histórico de apurações, débitos e parcelamentos.",
                "Estrutura societária e patrimonial.",
                "Objetivos e prazos da empresa.",
              ]}
            />
            <h3 className="mini-h" data-reveal="">O que você pode esperar</h3>
            <Checklist
              items={[
                "Alternativas apresentadas com riscos, custos e prazos estimados.",
                "Escopo e honorários definidos por escrito antes do início.",
                "Recomendações baseadas na legislação vigente e na realidade da empresa.",
                "Sigilo sobre as informações compartilhadas.",
              ]}
            />
          </div>
          <aside className="box" data-reveal="" aria-labelledby="ter-t">
            <h3 id="ter-t">Para a primeira conversa, tenha em mãos</h3>
            <Checklist
              reveal={false}
              items={[
                "Regime tributário atual.",
                "Faturamento anual aproximado.",
                "Principais tributos e obrigações da operação.",
                "Existência de débitos, parcelamentos ou processos.",
                "Suas principais dúvidas e prazos.",
              ]}
            />
            <Note icon="lock">Documentos fiscais são solicitados depois, por um canal seguro combinado com você. Não envie documentos pelo formulário do site.</Note>
          </aside>
        </div>
      </section>

      <section className="sec alt" id="reforma" aria-labelledby="reforma-t">
        <div className="wrap split">
          <div>
            <Eyebrow>Reforma tributária</Eyebrow>
            <Title id="reforma-t" b="Um bom momento para revisar" l="a estrutura tributária." />
          </div>
          <div className="prose">
            <p data-reveal="">
              A reforma tributária sobre o consumo (Emenda Constitucional 132/2023 e Lei Complementar 214/2025) substitui
              gradualmente PIS, Cofins, ICMS e ISS pela CBS e pelo IBS. A transição começou em 2026 e tem conclusão prevista
              para 2033.
            </p>
            <p data-reveal="">
              A mudança afeta preços, contratos, sistemas e o aproveitamento de créditos. Avaliar o cenário atual e os
              efeitos da transição ajuda a empresa a decidir com antecedência.
            </p>
          </div>
        </div>
        <div className="wrap">
          <ReformaChart />
        </div>
      </section>

      <FaqSection title={["Dúvidas sobre", "a consultoria tributária."]} items={FAQ} />

      <TaxContact form="consultoria-tributaria" />
    </>
  );
}
