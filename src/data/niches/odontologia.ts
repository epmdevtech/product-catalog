import type { NicheConfig } from "@/types/niche";

export const odontologia: NicheConfig = {
  slug: "odontologia",
  nomeInterno: "Odontologia",
  tom: "clinico",
  termos: {
    profissional: {
      singular: "dentista",
      plural: "dentistas",
      artigo: "o",
      deArtigo: "do",
      emArtigo: "no",
    },
    cliente: {
      singular: "paciente",
      plural: "pacientes",
      artigo: "o",
      deArtigo: "do",
      emArtigo: "no",
    },
    estabelecimento: {
      singular: "clínica",
      artigo: "a",
      deArtigo: "da",
      emArtigo: "na",
    },
    unidade: {
      singular: "unidade",
      plural: "unidades",
      artigo: "a",
      deArtigo: "da",
      emArtigo: "na",
    },
    atendimento: {
      singular: "consulta",
      plural: "consultas",
      artigo: "a",
      deArtigo: "da",
      emArtigo: "na",
    },
    agendamento: {
      singular: "agendamento",
      plural: "agendamentos",
      artigo: "o",
      deArtigo: "do",
      emArtigo: "no",
    },
  },
  demoUrl: "https://odontologia.epmdevtech.com.br/",
  hero: {
    titulo: "Estrutura digital completa e agendamento para sua clínica",
    subtitulo:
      "Site institucional de alto padrão com agenda online integrada: seus pacientes marcam consultas em poucos toques, sem conflito de horários.",
  },
  retorno: {
    ticketMedioPadrao: 250,
    atendimentosRecuperadosPadrao: 3,
    rotuloAtendimento: "consultas recuperadas por mês",
  },
  seguranca: {
    titulo: "Proteção de dados de saúde e conformidade estrita com a LGPD",
    itens: [
      {
        titulo: "Tratamento de Dados Pessoais de Saúde (LGPD)",
        descricao:
          "Dados sensíveis e histórico de agendamentos protegidos com criptografia de ponta a ponta e armazenamento seguro.",
      },
      {
        titulo: "Backups Automatizados Diários",
        descricao:
          "Cópias de segurança contínuas para garantir que a agenda da sua clínica esteja sempre protegida contra incidentes.",
      },
      {
        titulo: "Controle Estrito de Acesso",
        descricao:
          "Permissões individualizadas por profissional e recepcionista, evitando visualização não autorizada de horários.",
      },
      {
        titulo: "Suporte e Manutenção Técnica Contínua",
        descricao:
          "Monitoramento ativo de servidores, garantia de estabilidade e suporte técnico direto para manter sua clínica no ar.",
      },
    ],
    textoTratamentoDados:
      "Todo o fluxo de agendamento cumpre integralmente as exigências da LGPD relativas a dados sensíveis de saúde e sigilo profissional.",
  },
  faq: [
    {
      pergunta: "A comunicação respeita as normas de publicidade ética do CFO/CRO?",
      resposta:
        "Sim. A estrutura visual e as seções informativas são desenhadas respeitando os preceitos éticos do Conselho Federal de Odontologia, com identificação clara de responsáveis técnicos e apresentação sóbria dos tratamentos.",
    },
    {
      pergunta: "Como a agenda lida com dentistas que atendem em turnos específicos?",
      resposta:
        "Cada profissional da clínica possui sua grade horária personalizada, com definição exata de dias da semana, turnos, intervalos e duração estimada por tipo de consulta.",
    },
  ],
  extrasOrcamento: [
    "Integração bidirecional com prontuário eletrônico legado ou software de gestão clínica externo",
    "Módulo de teleodontologia com videoconferência integrada e termo de consentimento digital",
    "Campanhas automatizadas de reativação de pacientes inativos via WhatsApp marketing",
  ],
  contrato: {
    prazoMinimoMeses: 12,
    regraCancelamento:
      "Aviso prévio formal de 30 dias após o período inicial de 12 meses, sem cobrança de multas rescisórias.",
    titularidadeDominio:
      "O domínio institucional (.com.br) permanece registrado em nome e titularidade exclusiva da clínica.",
    titularidadeCodigo:
      "Arquitetura de front-end cedida para operação contínua, com fornecimento de exportação completa dos dados em caso de rescisão.",
    titularidadeDados:
      "A clínica é a única e exclusiva controladora dos dados de seus pacientes, podendo requisitar exportação em formato padrão a qualquer momento.",
    regraPublicacao:
      "A publicação definitiva em produção ocorre somente após aprovação formal na etapa de homologação e quitação integral da taxa de implantação.",
    avisoRevisaoJuridica:
      "TODO: Este documento contém cláusulas com placeholders comerciais que requerem revisão jurídica antes da formalização do contrato definitivo.",
  },
  whatsappMensagemTemplate:
    "Olá! Montei uma simulação para a minha clínica na EPM DevTech: Plano {plano}, com {profissionais} dentista(s) e {unidades} unidade(s). Valores de referência: Implantação R$ {implantacao} e Mensalidade R$ {mensalidade}. Gostaria de tirar algumas dúvidas!",
};
