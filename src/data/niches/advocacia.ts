import type { NicheConfig } from "@/types/niche";

export const advocacia: NicheConfig = {
  slug: "advocacia",
  nomeInterno: "Advocacia",
  tom: "sobrio",
  termos: {
    profissional: {
      singular: "advogado",
      plural: "advogados",
      artigo: "o",
      deArtigo: "do",
      emArtigo: "no",
    },
    cliente: {
      singular: "cliente",
      plural: "clientes",
      artigo: "o",
      deArtigo: "do",
      emArtigo: "no",
    },
    estabelecimento: {
      singular: "escritório",
      artigo: "o",
      deArtigo: "do",
      emArtigo: "no",
    },
    unidade: {
      singular: "unidade",
      plural: "unidades",
      artigo: "a",
      deArtigo: "da",
      emArtigo: "na",
    },
    atendimento: {
      singular: "reunião",
      plural: "reuniões",
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
  demoUrl: "",
  hero: {
    titulo: "Presença digital institucional e triagem qualificada para seu escritório",
    subtitulo:
      "Site institucional sóbrio e moderno com agendamento online integrado: seus clientes solicitam reuniões e consultas jurídicas com total discrição e agilidade.",
  },
  retorno: {
    ticketMedioPadrao: 400,
    atendimentosRecuperadosPadrao: 2,
    rotuloAtendimento: "reuniões recuperadas por mês",
  },
  seguranca: {
    titulo: "Sigilo profissional inviolável, conformidade com a OAB e LGPD",
    itens: [
      {
        titulo: "Sigilo Profissional e Confidencialidade",
        descricao:
          "Preservação do dever de sigilo estabelecido pelo Estatuto da Advocacia e da OAB, com canais blindados de contato inicial.",
      },
      {
        titulo: "Conformidade com Provimento 205/2021 da OAB",
        descricao:
          "Arquitetura visual estritamente informativa e sóbria, vedando qualquer tom mercantilista ou promessas de resultado.",
      },
      {
        titulo: "Criptografia e Proteção de Dados (LGPD)",
        descricao:
          "Armazenamento de informações preliminares de clientes com camadas reforçadas de segurança e controle de permissões.",
      },
      {
        titulo: "Backups Automatizados e Suporte Técnico",
        descricao:
          "Monitoramento contínuo da infraestrutura para que o escritório mantenha disponibilidade ininterrupta sem preocupações técnicas.",
      },
    ],
    textoTratamentoDados:
      "A comunicação e triagem de atendimento respeitam integralmente os preceitos de publicidade jurídica ética da OAB e as normas da LGPD. (TODO: Este modelo de comunicação exige revisão jurídica antes da publicação definitiva).",
  },
  faq: [
    {
      pergunta: "A comunicação respeita o Provimento 205/2021 e o Código de Ética da OAB?",
      resposta:
        "Sim. A linguagem, a apresentação das áreas de atuação e os fluxos de contato são desenhados para manter caráter exclusivamente informativo e discreto, sem qualquer forma de captação indevida ou mercantilização.",
    },
    {
      pergunta: "Como o escritório gerencia a triagem prévia antes de aceitar uma reunião?",
      resposta:
        "O agendamento pode funcionar tanto como confirmação direta quanto em modo solicitação com aprovação da equipe, permitindo verificar impedimentos éticos antes de firmar o horário.",
    },
  ],
  extrasOrcamento: [
    "Integração com softwares jurídicos legados ou sistemas de gestão processual (ERP jurídico)",
    "Área do cliente autenticada para consulta de peças processuais ou andamentos de processos",
    "Formulários jurídicos com validação de assinatura digital ou certificado ICP-Brasil",
  ],
  contrato: {
    prazoMinimoMeses: 12,
    regraCancelamento:
      "Aviso prévio formal de 30 dias após o período inicial de 12 meses, sem imposição de multas rescisórias.",
    titularidadeDominio:
      "O domínio institucional do escritório permanece de propriedade exclusiva da banca advocatícia.",
    titularidadeCodigo:
      "Direito de uso contínuo da aplicação, com disponibilização dos dados históricos e suporte à transição caso necessário.",
    titularidadeDados:
      "O escritório de advocacia é o titular integral de todos os registros de clientes e reuniões.",
    regraPublicacao:
      "A publicação definitiva em produção é realizada após aprovação em homologação e quitação integral da implantação.",
    avisoRevisaoJuridica:
      "TODO: O texto final das cláusulas contratuais exige validação jurídica interna da banca antes da assinatura.",
  },
  whatsappMensagemTemplate:
    "Olá! Realizei uma simulação de proposta para o meu escritório na EPM DevTech: Plano {plano}, com {profissionais} advogado(s) e {unidades} unidade(s). Valores estimados: Implantação R$ {implantacao} e Mensalidade R$ {mensalidade}. Podemos agendar uma conversa?",
};
