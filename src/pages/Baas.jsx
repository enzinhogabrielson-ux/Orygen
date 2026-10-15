import {
  usePageMeta, PageHero, Eyebrow, Title, SectionHead, Icon, Badge, Checklist, Note, Tabs, Tiles, Tile,
  LinkArrow, FaqSection, ContactSection, LeadForm,
} from "../components/ui.jsx";
import { FlowVisual } from "../components/Heroes.jsx";
import { EscrowFlow, VTimeline } from "../components/Story.jsx";
import { PhotoBand } from "../components/Photo.jsx";

/* Soluções financeiras (ORYGEN PAY). Conteúdo: src/pages/baas.mjs do site de referência. */

/* Disponibilidade por produto.
   status: "" (sem selo) | "consulta" (selo "Sob consulta") | "estruturacao" (selo "Em estruturação").
   PENDENTE: confirmar com a direção quais soluções entram no lançamento. */
const STATUS_LABEL = { consulta: "Sob consulta", estruturacao: "Em estruturação" };
const status = (s) => (s ? <Badge warn>{STATUS_LABEL[s]}</Badge> : null);

const ACCOUNT_TABS = [
  {
    id: "conta", label: "Conta PJ e PF", icon: "building", status: "",
    title: "Conta digital para a empresa e para os sócios",
    what: "Conta de pagamento para pessoa jurídica (PJ) e pessoa física (PF), aberta e mantida por instituição parceira habilitada, com relacionamento e tecnologia ORYGEN.",
    purpose: "Concentrar recebimentos, organizar pagamentos e separar as finanças da empresa das finanças pessoais dos sócios.",
    examples: ["Centralizar em uma conta os recebimentos de clientes da operação.", "Manter a conta pessoal dos sócios separada da conta da empresa."],
    condition: "Abertura sujeita à análise cadastral e às políticas da instituição parceira.",
  },
  {
    id: "pix", label: "Pix", icon: "bolt", status: "",
    title: "Pix para receber e pagar a qualquer hora",
    what: "Pagamentos e recebimentos instantâneos, 24 horas por dia, por chave, dados bancários ou QR Code.",
    purpose: "Receber de clientes e pagar fornecedores com liquidação imediata, inclusive fora do horário comercial.",
    examples: ["Receber de clientes por QR Code no momento da venda ou da entrega.", "Pagar fornecedores e despesas operacionais no mesmo dia."],
    condition: "Limites e funcionalidades seguem as regras do Pix e da instituição parceira.",
  },
  {
    id: "ted", label: "TED e transferências", icon: "transfer", status: "",
    title: "TED e transferências entre instituições",
    what: "Transferências para contas em outras instituições, dentro da grade horária do sistema de pagamentos.",
    purpose: "Movimentar recursos entre contas da empresa e pagar fornecedores e parceiros que preferem TED.",
    examples: ["Transferir recursos entre contas da empresa em instituições diferentes.", "Pagar fornecedores com dados bancários informados em contrato."],
    condition: "Horários e tarifas conforme a proposta e a instituição parceira.",
  },
  {
    id: "boletos", label: "Pagamento de boletos", icon: "barcode", status: "",
    title: "Pagamento de boletos e contas",
    what: "Pagamento de boletos, contas de consumo e guias a partir da conta, com comprovantes organizados.",
    purpose: "Concentrar os pagamentos da operação e manter o histórico em um só lugar.",
    examples: ["Pagar boletos de fornecedores dentro do calendário financeiro do mês.", "Reunir comprovantes para a conciliação da contabilidade."],
    condition: "Guias e convênios aceitos conforme a instituição parceira.",
  },
  {
    id: "cartoes", label: "Cartões", icon: "card", status: "consulta",
    title: "Cartões para despesas da empresa",
    what: "Cartões vinculados à conta para despesas da operação.",
    purpose: "Dar autonomia a sócios e equipes, com acompanhamento das despesas.",
    examples: ["Despesas de viagem e de rota.", "Assinaturas e compras recorrentes da empresa."],
    condition: "Modalidade, bandeira e disponibilidade dependem do parceiro emissor.",
  },
];

const GROUPS = [
  {
    id: "cobrancas-e-recebimentos", index: "02", title: "Cobranças e recebimentos",
    text: "Formas de cobrar clientes e acompanhar o que entra, no balcão, a distância ou a prazo.",
    items: [
      { icon: "barcode", title: "Emissão de boletos", status: "", what: "Boletos de cobrança emitidos pela empresa para seus clientes, com acompanhamento da liquidação.", uses: "Vendas a prazo, contratos e mensalidades.", cond: "Custos por boleto e regras de emissão na proposta." },
      { icon: "link", title: "Link de pagamento", status: "", what: "Um link enviado por mensagem ou e-mail para o cliente pagar a distância.", uses: "Vendas remotas, sinal de pedidos e cobranças avulsas.", cond: "Meios de pagamento aceitos conforme a configuração contratada." },
      { icon: "pos", title: "Máquina de cartão", status: "", what: "Terminal para receber pagamentos com cartão de crédito e débito presencialmente.", uses: "Balcão, entregas, eventos e atendimento externo.", cond: "Taxas, prazos de recebimento e bandeiras conforme proposta e credenciadora parceira." },
    ],
  },
  {
    id: "credito-e-recebiveis", index: "03", title: "Crédito e recebíveis",
    text: "Alternativas de capital avaliadas a partir da operação: o que a empresa vende, recebe e precisa financiar.",
    items: [
      { icon: "growth", title: "Crédito empresarial", status: "", what: "Alternativas de capital de giro e financiamento da operação, avaliadas a partir do fluxo de caixa e da documentação da empresa.", uses: "Reforço de caixa em períodos sazonais; compra de insumos para atender um contrato.", cond: "Sujeito à análise de crédito e às políticas da instituição concedente. Taxas e garantias na proposta." },
      { icon: "calendar", title: "Antecipação de recebíveis", status: "", what: "Receber antes valores que a empresa já tem a receber, como vendas no cartão, duplicatas ou parcelas de contratos.", uses: "Equilibrar prazos de clientes e fornecedores; atravessar o intervalo entre faturar e receber.", cond: "Sujeita à análise dos recebíveis, dos devedores e da instituição parceira." },
      { icon: "document", title: "Operações por CCB", status: "", what: "A Cédula de Crédito Bancário (CCB) é o título que formaliza operações de crédito. A ORYGEN estrutura a operação e a emissão ocorre por meio de instituição habilitada.", uses: "Capital de giro com cronograma de pagamento definido; operações com garantias.", cond: "A instituição credora é identificada na proposta e no contrato." },
    ],
  },
];

const EXAMPLES = [
  { icon: "factory", title: "Indústria", situation: "Prazos longos concedidos a clientes e prazos curtos com fornecedores pressionam o caixa.", options: ["Antecipação de duplicatas", "Boletos para organizar os recebimentos", "Capital de giro formalizado por CCB"] },
  { icon: "truck", title: "Transportes e logística", situation: "Combustível, pedágio e folha saem antes do pagamento dos fretes.", options: ["Antecipação de recebíveis de fretes", "Pix e TED para pagamentos da operação", "Cartões para despesas de rota (sob consulta)"] },
  { icon: "clipboard", title: "Contratos públicos", situation: "O contrato garante receita, mas os pagamentos seguem o cronograma do órgão contratante.", options: ["Organização dos recebíveis do contrato", "Avaliação de capital de giro durante a execução", "Conta escrow quando o contrato exigir movimentação vinculada"] },
];

const FAQ = [
  ["Posso abrir a conta pelo site?", "Ainda não. A abertura começa com uma conversa com a nossa equipe e segue para a análise cadastral da instituição parceira. Use o formulário abaixo para iniciar."],
  ["Preciso deixar meu banco atual?", "Não. As soluções podem complementar as contas e os serviços que a empresa já utiliza. Na conversa inicial, entendemos o que faz sentido manter e o que pode ser organizado."],
  ["Quem executa as operações financeiras?", "A instituição parceira responsável por cada produto: ela mantém as contas, processa os pagamentos e, quando for o caso, concede o crédito. A ORYGEN cuida do relacionamento, do diagnóstico, da tecnologia e do acompanhamento. Os responsáveis são identificados na proposta e nos contratos."],
  ["O crédito é garantido?", "Não. Toda operação de crédito ou de antecipação depende de análise e das políticas da instituição concedente. A ORYGEN ajuda a organizar a demanda e a documentação para que a análise seja feita sobre a realidade da empresa."],
  ["Quais são as tarifas?", "Variam conforme o produto, o volume e o parceiro envolvido. Todas as tarifas e condições são apresentadas por escrito na proposta, antes de qualquer contratação."],
  ["A ORYGEN atende pessoa física?", "A conta PF faz parte das soluções. Nosso atendimento é voltado a empresários e empresas, e a abertura segue a análise cadastral da instituição parceira."],
  ["Quais documentos serão pedidos?", "Dependem do produto e da análise da instituição parceira. Informamos a lista na etapa de cadastro e combinamos um canal seguro para o envio. Não envie documentos pelo formulário do site."],
];

const ROLES_ORYGEN = ["Relacionamento e atendimento consultivo", "Diagnóstico da operação financeira", "Tecnologia e experiência digital", "Estruturação de operações de crédito e recebíveis", "Acompanhamento depois da ativação"];
const ROLES_PARTNERS = ["Abertura e manutenção das contas", "Processamento e liquidação dos pagamentos", "Análise e concessão de crédito, conforme políticas próprias", "Emissão de cartões e credenciamento, quando aplicável", "Cumprimento das exigências regulatórias de cada serviço"];

function GroupHead({ index, title, text }) {
  return (
    <div className="group-head" data-reveal="">
      <div><span className="group-n" aria-hidden="true">{index}</span><h3>{title}</h3></div>
      <p>{text}</p>
    </div>
  );
}

export default function Baas() {
  usePageMeta({
    title: "Soluções financeiras para empresas | ORYGEN",
    description: "Conta PJ e PF, Pix, TED, boletos, link de pagamento, máquina de cartão, crédito, CCB, antecipação de recebíveis e conta escrow com instituições parceiras.",
  });

  const tabs = ACCOUNT_TABS.map((t) => ({
    id: t.id,
    label: t.label,
    content: (
      <div className="tab-grid">
        <div>
          <div className="tab-h"><Icon name={t.icon} /><h4>{t.title}</h4>{status(t.status)}</div>
          <p>{t.what}</p>
          <LinkArrow section="contato">Avaliar para minha empresa</LinkArrow>
        </div>
        <dl className="facts">
          <div><dt>Para que serve</dt><dd>{t.purpose}</dd></div>
          <div><dt>Exemplos de uso</dt><dd><ul>{t.examples.map((e) => <li key={e}>{e}</li>)}</ul></dd></div>
          <div><dt>Condições</dt><dd className="muted">{t.condition}</dd></div>
        </dl>
      </div>
    ),
  }));

  return (
    <>
      <PageHero
        mark="pay"
        eyebrow="ORYGEN PAY · Soluções financeiras"
        b="Soluções financeiras"
        l="conectadas à sua operação."
        lead="Contas, pagamentos, cobranças, crédito e recebíveis para empresas, com o relacionamento da ORYGEN e a infraestrutura de instituições parceiras habilitadas."
        ctas={[{ label: "Fale sobre sua operação", section: "contato" }, { label: "Ver as soluções", section: "solucoes" }]}
        variant="pay"
        visual={<FlowVisual />}
      />

      <section className="sec light" id="visao-geral" aria-labelledby="visao-t">
        <div className="wrap split">
          <div>
            <Eyebrow>Visão geral</Eyebrow>
            <Title id="visao-t" b="Serviços financeiros com relacionamento" l="e visão da operação." />
          </div>
          <div className="prose">
            <p className="lede" data-reveal="">
              BaaS (Banking as a Service) é a integração de serviços financeiros por meio da infraestrutura de
              instituições parceiras. Na prática, sua empresa usa contas, pagamentos, cobranças e crédito com o
              atendimento e a tecnologia da ORYGEN, enquanto a execução financeira fica com instituições habilitadas.
            </p>
            <Checklist
              items={[
                "Um responsável identificado para acompanhar a empresa.",
                "Diagnóstico do fluxo financeiro antes da recomendação de produtos.",
                "Custos, critérios e responsabilidades apresentados por escrito.",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="sec alt" id="solucoes" aria-labelledby="solucoes-t">
        <div className="wrap">
          <SectionHead
            eyebrow="Soluções"
            id="solucoes-t"
            b="O que sua empresa"
            l="pode utilizar."
            text="Soluções organizadas pelo uso na empresa. A disponibilidade de cada uma depende da análise e da instituição parceira responsável."
          />

          <div className="group" id="contas-e-pagamentos">
            <GroupHead index="01" title="Contas e pagamentos" text="O dia a dia financeiro da empresa: conta, Pix, transferências, pagamentos e cartões, em produtos complementares." />
            <Tabs label="Contas e pagamentos" tabs={tabs} />
          </div>

          {GROUPS.map((g) => (
            <div className="group" id={g.id} key={g.id}>
              <GroupHead index={g.index} title={g.title} text={g.text} />
              <Tiles cols={3}>
                {g.items.map((p) => (
                  <Tile
                    key={p.title}
                    as="h4"
                    icon={p.icon}
                    badge={status(p.status)}
                    title={p.title}
                    meta={[["Exemplos de uso", p.uses], ["Condições", p.cond]]}
                    link={{ section: "contato", label: "Solicitar uma avaliação" }}
                  >
                    <p>{p.what}</p>
                  </Tile>
                ))}
              </Tiles>
            </div>
          ))}

          <div className="group" id="estruturas-vinculadas">
            <GroupHead index="04" title="Estruturas vinculadas" text="Para operações em que o dinheiro só deve circular quando condições combinadas forem cumpridas." />
            <article className="escrow" data-reveal="">
              <div className="escrow-copy">
                <Icon name="lock" />
                <h4>Conta escrow</h4>
                <p>Conta em que os recursos ficam reservados e só são liberados quando as condições acordadas entre as partes são cumpridas. Dá segurança às duas pontas de uma negociação.</p>
                <dl className="tile-meta">
                  <div><dt>Exemplos de uso</dt><dd>Compra e venda de empresas ou ativos; contratos de fornecimento com etapas de entrega; garantia de recebíveis em operações de crédito.</dd></div>
                  <div><dt>Condições</dt><dd>Estrutura, custos e regras de liberação definidos em contrato, conforme viabilidade e instituição parceira.</dd></div>
                </dl>
                <LinkArrow section="contato">Avaliar uma estrutura</LinkArrow>
              </div>
              <div>
                <h5 className="mini-h">Como funciona a conta escrow</h5>
                <EscrowFlow />
              </div>
            </article>
          </div>
        </div>
      </section>

      <PhotoBand
        src="galpao.jpg"
        alt="Galpão logístico ao anoitecer, com prateleiras altas e caminhões na doca."
        eyebrow="Operações reais"
        text="Indústria, transportes e contratos públicos: as soluções entram onde a empresa recebe, paga e precisa de capital."
      />

      <section className="sec light" id="exemplos" aria-labelledby="exemplos-t">
        <div className="wrap">
          <SectionHead
            eyebrow="Exemplos de aplicação"
            id="exemplos-t"
            b="Como as soluções se combinam"
            l="em operações reais."
            text="Situações comuns nos segmentos que atendemos e as soluções que podem ser avaliadas em cada uma."
          />
          <Tiles cols={3}>
            {EXAMPLES.map((e) => (
              <Tile key={e.title} icon={e.icon} badge={<Badge>Exemplo ilustrativo</Badge>} title={e.title}>
                <p>{e.situation}</p>
                <p className="tile-k">Soluções que podem ser avaliadas</p>
                <Checklist items={e.options} reveal={false} />
              </Tile>
            ))}
          </Tiles>
          <Note>Exemplos hipotéticos para ilustrar aplicações. Não representam clientes nem resultados obtidos.</Note>
        </div>
      </section>

      <VTimeline
        id="contratacao"
        eyebrow="Contratação"
        b="Como funciona"
        l="a contratação."
        lede="Da primeira conversa à ativação, você sabe em que etapa está e o que falta para avançar."
        steps={[
          ["Conversa sobre a operação", "Você conta como a empresa recebe, paga e onde estão as principais dificuldades."],
          ["Diagnóstico", "Avaliamos fluxo financeiro, recebíveis e necessidade de crédito para indicar as soluções compatíveis."],
          ["Proposta", "Escopo, custos, critérios, prazos e a instituição parceira responsável por cada serviço, por escrito."],
          ["Cadastro e análise", "A instituição parceira faz a análise cadastral e, quando for o caso, de crédito. Os documentos são enviados por canal seguro."],
          ["Ativação e acompanhamento", "Com a aprovação, os serviços são ativados e a empresa segue com um responsável identificado na ORYGEN."],
        ]}
      />

      <section className="sec light" id="parceiros" aria-labelledby="parceiros-t">
        <div className="wrap">
          <SectionHead
            eyebrow="Responsabilidades"
            id="parceiros-t"
            b="O papel da ORYGEN"
            l="e das instituições parceiras."
            text="Cada parte tem uma função clara. Saber quem faz o quê é parte da segurança da operação."
          />
          <div className="roles" data-reveal="">
            <div className="role brand">
              <h3>ORYGEN</h3>
              <Checklist items={ROLES_ORYGEN} reveal={false} />
            </div>
            <div className="role">
              <h3>Instituições parceiras</h3>
              <Checklist items={ROLES_PARTNERS} reveal={false} />
            </div>
          </div>
          <Note>As instituições parceiras de cada produto são identificadas na proposta e nos contratos.</Note>
        </div>
      </section>

      <FaqSection alt title={["Dúvidas sobre", "as soluções financeiras."]} items={FAQ} />

      <ContactSection
        b="Fale sobre"
        l="sua operação."
        text="Conte como sua empresa recebe, paga e o que precisa organizar. Um especialista avalia quais soluções fazem sentido."
        next={[
          "Lemos sua mensagem e identificamos as soluções relacionadas.",
          "Um especialista conversa com você sobre a operação.",
          "Se fizer sentido, você recebe uma proposta com custos, critérios e próximos passos.",
        ]}
        form={
          <LeadForm
            area="solucoes-financeiras"
            form="solucoes-financeiras"
            title="Solicite uma avaliação"
            submit="Solicitar avaliação"
            extra={[
              { name: "segmento", type: "select", label: "Segmento", options: [["industria", "Indústria"], ["transportes-logistica", "Transportes e logística"], ["contratos-publicos", "Licitações e contratos públicos"], ["comercio", "Comércio"], ["servicos", "Serviços"], ["outro", "Outro"]] },
              { name: "faturamento_anual", type: "select", label: "Faturamento anual", options: [["ate-4-8mi", "Até R$ 4,8 milhões"], ["4-8-a-30mi", "De R$ 4,8 a R$ 30 milhões"], ["30-a-300mi", "De R$ 30 a R$ 300 milhões"], ["acima-300mi", "Acima de R$ 300 milhões"], ["nao-informar", "Prefiro não informar"]] },
              { name: "solucoes", type: "checks", label: "Soluções de interesse", options: [["contas-pagamentos", "Conta e pagamentos"], ["cobrancas", "Cobranças e recebimentos"], ["credito", "Crédito e capital de giro"], ["antecipacao", "Antecipação de recebíveis"], ["escrow", "Conta escrow"], ["nao-sei", "Ainda não sei"]] },
            ]}
          />
        }
      />
    </>
  );
}
