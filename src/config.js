/**
 * Configuração central do site ORYGEN.
 * Tudo o que depende de confirmação da direção fica aqui. Campo vazio = pendência:
 * o site não exibe nem inventa o dado.
 */
export const config = {
  brand: {
    name: "ORYGEN",
    descriptor: "Soluções Financeiras",
    slogan: "A inteligência por trás do próximo passo.",
  },

  // Manifesto (home). embed vazio = usa o arquivo local public/video/manifesto.mp4.
  // Para hospedar fora, cole o link de incorporação (ex.: https://player.vimeo.com/video/ID ou https://www.youtube.com/embed/ID).
  manifesto: { embed: "" },

  // Indexação: false = ambiente de homologação (meta robots "noindex").
  // Troque para true somente no domínio definitivo.
  indexable: false,

  company: {
    legalName: "ORYGEN TECNOLOGIA EM PAGAMENTOS & CONSULTORIA TRIBUTARIA LTDA",
    cnpj: "61.269.447/0001-55",
    // PENDENTE: conferir razão social e CNPJ com o cartão CNPJ atual antes de publicar.
    verified: false,
  },

  // PENDENTE: todos os canais. Campo vazio = canal não exibido.
  contact: {
    email: "", //       ex.: contato@dominio.com.br
    phone: "", //       ex.: (21) 0000-0000 (exibição)
    phoneE164: "", //   ex.: +552100000000 (link tel:)
    whatsappE164: "", // ex.: 5521900000000 (somente dígitos, link wa.me)
    // PENDENTE: endereço comercial. A versão anterior do site exibia
    // "Av. João Cabral de Mello Neto, 850, Bloco 003, Sala 1501, Barra da Tijuca, Rio de Janeiro/RJ".
    // Ele só volta a aparecer quando for confirmado e preenchido aqui.
    address: "",
    hours: "",
  },

  social: {
    // PENDENTE: URL oficial da página da empresa no LinkedIn.
    linkedin: "",
    instagram: "",
  },
};

export default config;
