import { usePageMeta, PageHero, Pending, Go } from "../components/ui.jsx";
import config from "../config.js";

/* Política de Privacidade e Termos de Uso: minutas de src/pages/legal.mjs do site de referência.
   PENDENTE: revisão jurídica (bases legais, retenção, encarregado/DPO, fornecedores, foro). */

const controller = `${config.company.legalName}, inscrita no CNPJ sob o nº ${config.company.cnpj}`;

const ContactLine = () =>
  config.contact.email ? (
    <>pelo e-mail <strong>{config.contact.email}</strong></>
  ) : (
    <>pelo canal <Pending>e-mail ou canal oficial de privacidade</Pending></>
  );

function LegalDoc({ sections }) {
  return (
    <section className="sec light legal-sec" aria-label="Conteúdo do documento">
      <div className="wrap legal-grid">
        <nav className="toc" aria-label="Seções do documento">
          <p className="toc-k">Neste documento</p>
          <ol>
            {sections.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>)}
          </ol>
        </nav>
        <div className="legal-doc">
          <p className="note review">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5M12 16.5h.01" /></svg>
            <span>
              <strong>Minuta sujeita à revisão jurídica.</strong> Este texto organiza a estrutura do documento e não deve ser
              publicado antes da validação pelo responsável jurídico da ORYGEN. Trechos marcados como pendentes dependem de
              definição.
            </span>
          </p>
          {sections.map((s) => (
            <section key={s.id} aria-labelledby={s.id}>
              <h2 id={s.id} tabIndex={-1}>{s.title}</h2>
              {s.body}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Privacidade() {
  usePageMeta({
    title: "Política de Privacidade | ORYGEN",
    description: "Como a ORYGEN trata os dados pessoais informados no site, com base na Lei Geral de Proteção de Dados (LGPD).",
  });
  const sections = [
    { id: "controlador", title: "1. Quem é o controlador", body: <p>O controlador dos dados pessoais tratados neste site é a {controller}, com sede em {config.contact.address || <Pending>endereço</Pending>}.</p> },
    {
      id: "dados", title: "2. Quais dados coletamos", body: (
        <>
          <p>Coletamos apenas os dados necessários para responder às solicitações feitas pelo site:</p>
          <ul>
            <li><strong>Dados de contato informados nos formulários:</strong> nome, empresa, e-mail profissional, telefone, área de interesse e a descrição da necessidade.</li>
            <li><strong>Informações de qualificação opcionais:</strong> segmento, faixa de faturamento, regime tributário, tipo de negócio, base aproximada de clientes, estágio do projeto e necessidades de integração.</li>
            <li><strong>Origem do contato:</strong> o endereço da página em que o formulário foi preenchido, enviado apenas junto com o formulário.</li>
            <li><strong>Dados técnicos:</strong> registros de acesso mantidos pelo provedor de hospedagem, como endereço IP, data e hora, conforme o Marco Civil da Internet.</li>
          </ul>
          <p>Não solicitamos CPF, documentos, extratos ou senhas pelos formulários do site.</p>
        </>
      ),
    },
    {
      id: "finalidades", title: "3. Para que usamos os dados", body: (
        <ul>
          <li>Responder à sua solicitação e direcionar o atendimento ao responsável adequado.</li>
          <li>Avaliar a necessidade da empresa e preparar uma eventual proposta.</li>
          <li>Manter o histórico do relacionamento comercial.</li>
          <li>Entender quais canais trazem contatos, para melhorar a comunicação da ORYGEN.</li>
          <li>Cumprir obrigações legais e regulatórias.</li>
        </ul>
      ),
    },
    { id: "bases", title: "4. Bases legais", body: <p>Os dados são tratados com base nos procedimentos preliminares relacionados a contrato, a pedido do titular (art. 7º, V, da LGPD), no legítimo interesse da ORYGEN para análise da origem dos contatos e melhoria da comunicação (art. 7º, IX), e no cumprimento de obrigação legal (art. 7º, II), conforme o caso. <Pending>validar bases legais com o jurídico</Pending></p> },
    {
      id: "compartilhamento", title: "5. Compartilhamento", body: (
        <>
          <p>Os dados podem ser compartilhados com:</p>
          <ul>
            <li>Fornecedores de tecnologia que apoiam a operação, como hospedagem, CRM e ferramentas de comunicação, sob obrigação de confidencialidade. <Pending>listar categorias de fornecedores e países</Pending></li>
            <li>Instituições parceiras, quando a solicitação avançar para a contratação de um produto executado por elas, com o seu conhecimento.</li>
            <li>Autoridades públicas, quando houver obrigação legal ou ordem judicial.</li>
          </ul>
          <p>A ORYGEN não vende dados pessoais.</p>
        </>
      ),
    },
    { id: "cookies", title: "6. Cookies e tecnologias de medição", body: <p>Este site não utiliza cookies de publicidade nem ferramentas de análise de navegação, e a fonte tipográfica é hospedada no próprio site. Caso ferramentas de medição ou publicidade sejam adotadas, esta política será atualizada e o seu consentimento será solicitado quando exigido.</p> },
    { id: "retencao", title: "7. Por quanto tempo guardamos", body: <p>Os dados de contato são mantidos pelo tempo necessário para atender à solicitação e ao relacionamento comercial decorrente dela, observados os prazos legais aplicáveis. <Pending>definir prazo de retenção para contatos que não avançam</Pending></p> },
    {
      id: "direitos", title: "8. Seus direitos", body: (
        <>
          <p>Você pode solicitar, a qualquer momento: confirmação da existência de tratamento; acesso aos dados; correção de dados incompletos ou desatualizados; anonimização, bloqueio ou eliminação de dados desnecessários; portabilidade; informação sobre compartilhamentos; e revisão de decisões, nos termos do art. 18 da LGPD.</p>
          <p>As solicitações podem ser feitas <ContactLine />.</p>
        </>
      ),
    },
    { id: "seguranca", title: "9. Segurança", body: <p>Adotamos medidas técnicas e administrativas para proteger os dados pessoais contra acessos não autorizados e situações acidentais ou ilícitas. Nenhum documento sensível deve ser enviado pelos formulários do site; quando necessário, um canal seguro é combinado diretamente com você.</p> },
    { id: "encarregado", title: "10. Encarregado de dados (DPO)", body: <p>Encarregado pelo tratamento de dados pessoais: <Pending>nome e canal de contato do encarregado</Pending>.</p> },
    { id: "alteracoes", title: "11. Alterações", body: <p>Esta política pode ser atualizada. A versão vigente estará sempre disponível nesta página, com a data da última atualização.</p> },
  ];
  return (
    <>
      <PageHero
        compact
        eyebrow="Documentos"
        b="Política de Privacidade"
        lead="Como a ORYGEN trata os dados pessoais informados neste site, conforme a Lei Geral de Proteção de Dados Pessoais (Lei 13.709/2018, LGPD)."
        note={<>Última atualização: <Pending>data de publicação</Pending></>}
      />
      <LegalDoc sections={sections} />
    </>
  );
}

export function Termos() {
  usePageMeta({
    title: "Termos de Uso | ORYGEN",
    description: "Condições de uso do site da ORYGEN e natureza das informações publicadas.",
  });
  const sections = [
    { id: "aceite", title: "1. Aceite", body: <p>Ao navegar neste site, você concorda com estes Termos de Uso. O site é mantido pela {controller}.</p> },
    {
      id: "natureza", title: "2. Natureza das informações", body: (
        <>
          <p>O conteúdo do site tem caráter informativo e institucional. Ele não constitui oferta de crédito, proposta comercial, recomendação de investimento nem aconselhamento jurídico ou tributário para um caso específico.</p>
          <p>Condições, custos, prazos e disponibilidade de cada solução dependem de análise e são apresentados por escrito na proposta. Exemplos e interfaces exibidos no site são ilustrativos.</p>
        </>
      ),
    },
    { id: "parceiros", title: "3. Serviços executados por parceiros", body: <p>A ORYGEN atua com tecnologia, relacionamento e consultoria. Contas, pagamentos, crédito e demais serviços financeiros são executados por instituições parceiras habilitadas, conforme cada produto. As condições desses serviços são regidas pelos contratos firmados com as respectivas instituições.</p> },
    { id: "formularios", title: "4. Uso dos formulários", body: <p>Ao enviar um formulário, você declara que as informações são verdadeiras e que tem autorização para compartilhá-las em nome da empresa indicada. Não envie documentos, dados bancários, senhas ou informações de terceiros pelos formulários.</p> },
    { id: "propriedade", title: "5. Propriedade intelectual", body: <p>A marca ORYGEN, o monograma OG, os textos, as imagens e o layout deste site pertencem à ORYGEN ou são utilizados com autorização. É proibida a reprodução sem autorização prévia.</p> },
    { id: "links", title: "6. Links externos", body: <p>O site pode conter links para páginas de terceiros. A ORYGEN não se responsabiliza pelo conteúdo ou pelas práticas de privacidade desses sites.</p> },
    { id: "responsabilidade", title: "7. Responsabilidade", body: <p>A ORYGEN busca manter as informações atualizadas, mas elas podem sofrer alterações sem aviso. Decisões empresariais devem ser tomadas a partir de análise específica e da proposta formal. <Pending>revisar limitação de responsabilidade com o jurídico</Pending></p> },
    { id: "lei", title: "8. Lei aplicável e foro", body: <p>Estes termos são regidos pela legislação brasileira. Fica eleito o foro de <Pending>comarca</Pending> para dirimir eventuais controvérsias, salvo disposição legal em contrário.</p> },
    { id: "contato-termos", title: "9. Contato", body: <p>Dúvidas sobre estes termos podem ser enviadas <ContactLine /> ou pelo <Go to="/" section="contato">formulário de contato</Go>.</p> },
  ];
  return (
    <>
      <PageHero
        compact
        eyebrow="Documentos"
        b="Termos de Uso"
        lead="Condições para uso deste site e natureza das informações publicadas pela ORYGEN."
        note={<>Última atualização: <Pending>data de publicação</Pending></>}
      />
      <LegalDoc sections={sections} />
    </>
  );
}
