/** Partes compartilhadas entre as páginas da consultoria tributária (src/pages/tax-shared.mjs da referência). */
import { ContactSection, LeadForm } from "./ui.jsx";

export const TAX_NEEDS = [
  ["diagnostico", "Diagnóstico tributário"],
  ["planejamento", "Planejamento tributário"],
  ["regularizacao", "Regularização de dívidas"],
  ["recuperacao", "Recuperação de créditos"],
  ["patrimonial", "Planejamento patrimonial"],
  ["acompanhamento", "Acompanhamento contínuo"],
];

export const REVENUE = [
  ["ate-4-8mi", "Até R$ 4,8 milhões"],
  ["4-8-a-30mi", "De R$ 4,8 a R$ 30 milhões"],
  ["30-a-300mi", "De R$ 30 a R$ 300 milhões"],
  ["acima-300mi", "Acima de R$ 300 milhões"],
  ["nao-informar", "Prefiro não informar"],
];

export const REGIMES = [
  ["simples", "Simples Nacional"],
  ["presumido", "Lucro Presumido"],
  ["real", "Lucro Real"],
  ["nao-sei", "Não sei informar"],
];

// PENDENTE: confirmar como a atuação jurídica é contratada (advogado da equipe ou sociedade de advogados parceira).
export const LAWYER_NOTE = "Quando a estratégia envolve medidas administrativas ou judiciais, a atuação é conduzida por advogado habilitado.";

export const TAX_CRUMB = ["Consultoria tributária", "/tributario"];

export function TaxContact({ form, checked = [], b = "Solicite uma avaliação", l = "tributária.", text }) {
  return (
    <ContactSection
      b={b}
      l={l}
      text={text || "Conte o momento da sua empresa. Um especialista da frente tributária avalia o cenário e indica os próximos passos."}
      next={[
        "Lemos sua mensagem e identificamos o tema tributário envolvido.",
        "Um especialista conversa com você para entender a empresa.",
        "Se fizer sentido, você recebe uma proposta com escopo, honorários e próximos passos.",
      ]}
      form={
        <LeadForm
          area="consultoria-tributaria"
          form={form}
          title="Solicite uma avaliação tributária"
          intro="Campos com * são obrigatórios. Não envie documentos fiscais por aqui."
          submit="Solicitar avaliação tributária"
          extra={[
            { name: "regime_tributario", type: "select", label: "Regime tributário", options: REGIMES },
            { name: "faturamento_anual", type: "select", label: "Faturamento anual", options: REVENUE },
            { name: "necessidades", type: "checks", label: "Principal necessidade", options: TAX_NEEDS, checked },
          ]}
        />
      }
    />
  );
}
