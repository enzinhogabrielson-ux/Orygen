import WhiteLabel from "../components/WhiteLabel.jsx";
import Modules from "../components/Modules.jsx";
import { RowList } from "../components/Sections.jsx";
import {
  usePageMeta, PageHero, Icon, SectionHead, Checklist, Note, Tiles, Tile, Go, PinnedLayers,
  FaqSection, ContactSection, LeadForm,
} from "../components/ui.jsx";
import { BrandPaint } from "../components/Heroes.jsx";
import { Gantt } from "../components/Story.jsx";
import { PhotoBand } from "../components/Photo.jsx";

/* BaaS White Label (ORYGEN Tech). Conteúdo: src/pages/white-label.mjs do site de referência,
   mais a troca de marca, o painel de módulos e os controles de segurança da v4 (telas do site anterior). */

const OFFER = [
  { icon: "tag", title: "Marca e experiência", text: "A experiência do seu cliente com a sua identidade.", items: ["Identidade visual da sua marca", "Jornada do cliente desenhada para o seu público", "Portal e aplicativo, conforme o escopo"] },
  { icon: "wallet", title: "Serviços financeiros integrados", text: "Os serviços disponibilizados pela liquidante contratada, organizados na sua plataforma.", items: ["Contas", "Pix, transferências e pagamentos", "Cobranças, boletos e links"] },
  { icon: "dashboard", title: "Gestão da operação", text: "Ferramentas para a sua equipe acompanhar a operação.", items: ["Recursos administrativos", "Acompanhamento de clientes e movimentações", "Funcionalidades conforme o escopo contratado"] },
  { icon: "plug", title: "Integrações", text: "Conexão entre a plataforma e os sistemas que a sua empresa já usa.", items: ["APIs para o seu produto", "Integração com ERPs e sistemas internos", "Adaptação à API da liquidante"] },
  { icon: "flag", title: "Implantação e suporte", text: "Acompanhamento do projeto, da descoberta ao lançamento.", items: ["Descoberta e definição de escopo", "Integração e homologação", "Lançamento e suporte acordado"] },
];

const MODES = [
  { icon: "code", title: "Integração via API", text: "Para empresas com time de tecnologia que querem incorporar serviços financeiros ao próprio produto, usando as APIs da ORYGEN." },
  { icon: "layers", title: "Plataforma white label", text: "Para empresas que querem uma plataforma pronta para personalizar com a própria marca, com portal e aplicativo conforme o escopo." },
  { icon: "sliders", title: "Projeto personalizado", text: "Para operações com requisitos específicos de jornada, integração ou gestão, avaliadas caso a caso." },
];

const AUDIENCES = [
  { icon: "growth", title: "Fintechs em estruturação", text: "Que precisam de tecnologia para lançar contas e pagamentos com a própria marca." },
  { icon: "grid", title: "Plataformas, ERPs e SaaS", text: "Que querem incorporar serviços financeiros à experiência dos seus usuários." },
  { icon: "users", title: "Negócios com base própria de clientes", text: "Empresas que já se relacionam com uma base de clientes e querem oferecer uma conta com a própria marca." },
  { icon: "building", title: "Empresas com operação digital", text: "Que querem integrar pagamentos e cobranças à jornada digital que já oferecem." },
];

// Controles exibidos nas telas da plataforma (site anterior, v4).
const CONTROLS = [
  ["Favorecido à vista", "Nome, documento e instituição aparecem antes da confirmação de cada Pix."],
  ["Valor reservado", "O valor fica reservado até a instituição de destino confirmar a operação."],
  ["Sem duplicidade", "A mesma ordem enviada duas vezes não gera dois pagamentos."],
  ["Sessão protegida", "Login por provedor de identidade e sessão que expira ao fechar o navegador."],
  ["Comprovante completo", "ID de ponta a ponta (E2E), instituição, data, hora e status em cada transação."],
  ["Domínios separados", "Contas, pagamentos, cobranças e cadastro têm fronteiras claras: evoluções em um domínio têm impacto controlado sobre os demais."],
];

const FAQ = [
  ["Qual é a diferença entre BaaS e white label?", "BaaS (Banking as a Service) é o modelo em que serviços financeiros são oferecidos por meio da infraestrutura de instituições habilitadas. White label é a camada de tecnologia e experiência com a marca da sua empresa. A ORYGEN fornece essa camada; a infraestrutura financeira vem da instituição liquidante contratada por você."],
  ["Preciso ter contrato com uma instituição liquidante?", "Sim. A ORYGEN fornece somente a tecnologia e as APIs. Para operar contas e pagamentos, sua empresa precisa de contrato com uma liquidante (provedora de BaaS) do mercado. A plataforma é configurada de acordo com a liquidante escolhida."],
  ["Contratar a tecnologia torna minha empresa uma instituição financeira?", "Não. A contratação da plataforma não substitui autorizações regulatórias. As operações financeiras são executadas pela instituição liquidante, que responde pelas exigências aplicáveis a cada serviço."],
  ["O que pode ser personalizado?", "Identidade visual, jornada do cliente, comunicação e, conforme o escopo, portal e aplicativo. Os serviços financeiros disponíveis dependem da liquidante contratada e da etapa de homologação."],
  ["Como são definidas as integrações?", "Na etapa de descoberta, mapeamos os sistemas da sua empresa, a API da liquidante e as jornadas desejadas. O escopo de integração é definido por escrito antes do desenvolvimento."],
  ["Como o projeto é avaliado?", "Começamos entendendo o modelo de negócio, a base de clientes, o estágio do projeto e a relação com a liquidante. A partir disso, indicamos a modalidade mais adequada e apresentamos escopo, cronograma estimado e investimento."],
  ["O que depende de contratação e homologação?", "Funcionalidades, integrações, prazos e níveis de serviço são definidos em contrato. O lançamento depende da homologação técnica com a liquidante e da conclusão das etapas acordadas."],
];

export default function WhiteLabelPage() {
  usePageMeta({
    title: "BaaS White Label: plataforma com sua marca | ORYGEN",
    description: "Tecnologia white label e APIs para oferecer contas e pagamentos com a sua marca, conectados à instituição liquidante contratada pela sua empresa.",
  });

  return (
    <>
      <PageHero
        mark="tech"
        eyebrow="ORYGEN Tech · BaaS White Label"
        b="Sua marca."
        l="Sua experiência financeira."
        lead="Tecnologia white label para conectar contas, pagamentos e serviços financeiros ao seu negócio."
        ctas={[{ label: "Vamos estruturar sua operação", section: "contato" }, { label: "Entender o modelo", section: "modelo" }]}
        layout="center"
        variant="wl"
        band={<BrandPaint />}
      />

      <PinnedLayers
        id="modelo"
        eyebrow="Como o modelo funciona"
        b="Três camadas,"
        l="cada uma com uma responsabilidade clara."
        lede="BaaS (Banking as a Service) é a integração de serviços financeiros por meio da infraestrutura de instituições habilitadas. No white label, a tecnologia ORYGEN liga essa infraestrutura à experiência com a sua marca."
        planes={["Sua empresa", "Tecnologia ORYGEN", "Instituição liquidante"]}
        uiLabel="sua marca"
        items={[
          { title: "Sua empresa", sub: "Marca, clientes e jornada", text: "Dona da marca e do relacionamento com os clientes. Define a jornada, o público e a proposta de valor." },
          { title: "Tecnologia ORYGEN", sub: "Plataforma, APIs, gestão e integrações", text: "Plataforma, APIs, painel de gestão e integrações, configurados para a sua marca e adaptados à liquidante escolhida." },
          { title: "Instituição liquidante", sub: "Contas, liquidação e regulação", text: "Contratada pela sua empresa. Mantém as contas, liquida as operações e responde pelas exigências regulatórias de cada serviço." },
        ]}
      />

      <section className="sec alt" id="oferta" aria-labelledby="oferta-t">
        <div className="wrap">
          <Note>
            Para operar, sua empresa precisa de contrato com uma instituição liquidante (provedora de BaaS) do mercado. A
            ORYGEN fornece somente a tecnologia e as APIs, personalizadas conforme a liquidante contratada. A contratação
            da plataforma não substitui autorizações regulatórias.
          </Note>
          <SectionHead
            eyebrow="O que a plataforma reúne"
            id="oferta-t"
            b="Tecnologia para a sua"
            l="operação financeira."
            text="Componentes definidos conforme o escopo de cada projeto e as funcionalidades disponibilizadas pela liquidante."
          />
          <Tiles cols={3}>
            {OFFER.map((o) => (
              <Tile key={o.title} icon={o.icon} title={o.title}>
                <p>{o.text}</p>
                <Checklist items={o.items} reveal={false} />
              </Tile>
            ))}
            <article className="tile tile-cta">
              <h3 className="tile-t">Tem um projeto em mente?</h3>
              <p>Conte o modelo de negócio e o estágio do projeto. Indicamos a modalidade mais adequada.</p>
              <Go className="btn btn-solid" section="contato">Vamos estruturar sua operação</Go>
            </article>
          </Tiles>
        </div>
      </section>

      <WhiteLabel
        id="personalizacao"
        eyebrow="Personalização"
        b="A mesma base."
        l="Qualquer marca."
        lede="Identidade visual, jornada do cliente e comunicação com a sua marca; portal e aplicativo conforme o escopo. Os serviços financeiros disponíveis dependem da liquidante contratada e da homologação."
      />

      <Modules
        id="modulos"
        eyebrow="Interface ilustrativa"
        b="O painel,"
        l="módulo a módulo."
        lede="Escolha um módulo para ver uma tela ilustrativa, com dados fictícios. As funcionalidades de cada projeto dependem do escopo e da liquidante."
      />

      <PhotoBand
        src="celular.jpg"
        alt="Mãos segurando um celular com um aplicativo financeiro, em um escritório ao anoitecer."
        eyebrow="A experiência do seu cliente"
        text="Sua marca na mão do cliente. A tecnologia e a liquidação ficam invisíveis, como devem ficar."
        align="right"
      />

      <section className="sec light" id="modalidades" aria-labelledby="modalidades-t">
        <div className="wrap">
          <SectionHead
            eyebrow="Modalidades"
            id="modalidades-t"
            b="Três formas de trabalhar"
            l="com a ORYGEN Tech."
            text="Modalidades para avaliação. Funcionalidades, prazos e investimento são definidos na proposta, depois da descoberta."
          />
          <Tiles cols={3}>
            {MODES.map((m) => (
              <Tile key={m.title} icon={m.icon} title={m.title}><p>{m.text}</p></Tile>
            ))}
          </Tiles>
        </div>
      </section>

      <Gantt
        id="implantacao"
        eyebrow="Implantação"
        b="Da descoberta"
        l="ao lançamento."
        lede="Cada etapa tem entregas definidas, e algumas avançam em paralelo. O cronograma é estimado na proposta, depois da descoberta."
        note="Esquema ilustrativo, sem escala de tempo. Prazos de cada projeto são definidos na proposta."
        rows={[
          { t: "Descoberta", d: "Modelo de negócio, público, liquidante e sistemas envolvidos.", a: 0, b: 0.18 },
          { t: "Definição de escopo", d: "Funcionalidades, integrações, marca e jornadas por escrito.", a: 0.12, b: 0.32 },
          { t: "Integração", d: "Plataforma configurada e conectada à liquidante e aos seus sistemas.", a: 0.28, b: 0.68 },
          { t: "Homologação", d: "Testes técnicos e de jornada com a liquidante.", a: 0.6, b: 0.86 },
          { t: "Lançamento", d: "Entrada em operação e suporte nos termos acordados.", a: 0.84, b: 1 },
        ]}
      />

      <PhotoBand
        src="tech.jpg"
        alt="Escritório de engenharia de software à noite, visto através do vidro, com monitores acesos."
        eyebrow="Arquitetura e segurança"
        text="Plataforma organizada por domínios de negócio, com controles em cada transação."
      />

      <RowList
        id="arquitetura"
        eyebrow="Arquitetura e segurança"
        b="Organizada por"
        l="domínios de negócio."
        intro={
          <>
            <p className="lede" data-reveal="">
              A plataforma segue uma arquitetura de monólito modular: contas, pagamentos, cobranças e cadastro têm
              fronteiras claras dentro de uma mesma aplicação. Domínios separados facilitam adaptar a plataforma a cada
              liquidante sem reescrever o restante.
            </p>
            <Note>
              As práticas de segurança da informação tomam a norma ISO/IEC 27001 como referência de boas práticas. Isso
              não representa certificação.
            </Note>
          </>
        }
        items={CONTROLS}
      />

      <section className="sec alt" id="para-quem" aria-labelledby="paraquem-t">
        <div className="wrap">
          <SectionHead
            eyebrow="Para quem é"
            id="paraquem-t"
            b="Para empresas que querem oferecer"
            l="serviços financeiros com a própria marca."
          />
          <Tiles cols={4}>
            {AUDIENCES.map((a) => (
              <Tile key={a.title} icon={a.icon} title={a.title}><p>{a.text}</p></Tile>
            ))}
          </Tiles>
          <p className="cross" data-reveal="">
            <Icon name="wallet" />
            <span>
              Procura serviços financeiros para usar na sua própria empresa? Veja as <Go to="/baas">soluções financeiras</Go>.
            </span>
          </p>
        </div>
      </section>

      <FaqSection title={["Dúvidas sobre", "o BaaS White Label."]} items={FAQ} />

      <ContactSection
        b="Vamos estruturar"
        l="sua operação."
        text="Conte sobre o seu negócio, a base de clientes e o estágio do projeto. Avaliamos a modalidade mais adequada e os próximos passos."
        next={[
          "Lemos as informações do projeto e o estágio em que ele está.",
          "Marcamos uma conversa de descoberta com o seu time.",
          "Se fizer sentido, apresentamos escopo, cronograma estimado e investimento.",
        ]}
        form={
          <LeadForm
            area="white-label"
            form="white-label"
            title="Conte sobre o seu projeto"
            submit="Enviar projeto"
            extra={[
              { name: "tipo_negocio", type: "select", label: "Tipo de negócio", required: true, err: "Selecione o tipo de negócio.", options: [["fintech", "Fintech em estruturação"], ["plataforma-erp-saas", "Plataforma, ERP ou SaaS"], ["base-propria", "Empresa com base própria de clientes"], ["operacao-digital", "Empresa com operação digital"], ["outro", "Outro"]] },
              { name: "base_clientes", type: "select", label: "Base aproximada de clientes", options: [["ate-1mil", "Até 1 mil"], ["1-10mil", "De 1 mil a 10 mil"], ["10-100mil", "De 10 mil a 100 mil"], ["acima-100mil", "Acima de 100 mil"], ["pre-lancamento", "Ainda não lançamos"]] },
              { name: "estagio", type: "select", label: "Estágio do projeto", required: true, err: "Selecione o estágio do projeto.", options: [["pesquisando", "Pesquisando alternativas"], ["escopo-definido", "Escopo em definição"], ["pronto", "Pronto para iniciar"], ["migracao", "Já opero e quero migrar"]] },
              { name: "liquidante", type: "select", label: "Contrato com liquidante", required: true, err: "Informe a situação do contrato com a liquidante.", hint: "Instituição que executa as operações (provedora de BaaS).", options: [["sim", "Já tenho contrato"], ["negociacao", "Em negociação"], ["nao", "Ainda não tenho"]] },
              { name: "integracoes", type: "checks", label: "Necessidades de integração", options: [["contas", "Contas"], ["pix-pagamentos", "Pix e pagamentos"], ["cobrancas", "Boletos e cobranças"], ["app", "Aplicativo com a marca"], ["portal", "Portal web"], ["erp", "Integração com ERP ou sistema próprio"]] },
            ]}
            message={{ label: "Conte um pouco sobre o projeto", hint: "Modelo de negócio, público e o que espera da plataforma. Não inclua credenciais ou dados de clientes." }}
          />
        }
      />
    </>
  );
}
