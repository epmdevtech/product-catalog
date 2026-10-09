import type { NicheConfig } from "@/types/niche";

export const barbearia: NicheConfig = {
  slug: "barbearia",
  nomeInterno: "Barbearia",
  tom: "descontraido",
  termos: {
    profissional: {
      singular: "barbeiro",
      plural: "barbeiros",
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
      singular: "barbearia",
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
      singular: "horário",
      plural: "horários",
      artigo: "o",
      deArtigo: "do",
      emArtigo: "no",
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
    titulo: "Agenda cheia sem perder tempo respondendo mensagens",
    subtitulo:
      "Site moderno com agendamento online integrado: seus clientes escolhem o barbeiro, o serviço e o horário pelo celular em poucos toques.",
  },
  pricing: {
    solo: { implantacao: 1990, mensalidade: 99 },
    pequena: { implantacao: 2990, mensalidade: 149 },
    media: { implantacao: 4490, mensalidade: 219 },
    multiunidade: { implantacao: 6490, mensalidade: 299 },
    essencial: { implantacao: 1490, mensalidade: 79 },
    profissionalAdicionalMensal: 19,
    unidadeAdicional: { implantacao: 1000, mensalidade: 49 },
    lembretesWhatsAppMensal: 79,
    horaTecnicaAdicional: 180,
  },
  retorno: {
    ticketMedioPadrao: 50,
    atendimentosRecuperadosPadrao: 20,
    rotuloAtendimento: "horários recuperados por mês",
  },
  seguranca: {
    titulo: "Infraestrutura estável, agilidade e proteção simples de dados",
    itens: [
      {
        titulo: "Tratamento Simples e Seguro de Dados",
        descricao:
          "Coleta focada apenas no necessário: nome e WhatsApp do cliente para identificação rápida do agendamento, sem burocracia.",
      },
      {
        titulo: "Backups Automáticos Diários",
        descricao:
          "A agenda da barbearia é salva continuamente em nuvem segura, eliminando o risco de perda de contatos ou horários.",
      },
      {
        titulo: "Estabilidade em Dias de Pico",
        descricao:
          "Infraestrutura otimizada para aguentar acessos simultâneos de clientes marcando em quintas, sextas e sábados.",
      },
      {
        titulo: "Suporte e Responsabilidade Técnica",
        descricao:
          "A equipe da EPM DevTech cuida da infraestrutura e manutenção técnica para você focar exclusivamente nos atendimentos.",
      },
    ],
    textoTratamentoDados:
      "Armazenamento de informações básicas de contato em conformidade com as práticas da LGPD para comércios locais e prestadores de serviços.",
  },
  faq: [
    {
      pergunta: "Os clientes precisam instalar algum aplicativo para marcar horário?",
      resposta:
        "Não. O agendamento abre direto no navegador do celular pelo link da bio ou WhatsApp, em poucos toques, sem exigir download de app ou cadastro demorado.",
    },
    {
      pergunta: "Como cada barbeiro visualiza seus horários do dia?",
      resposta:
        "Cada profissional conta com acesso simples à sua agenda pessoal pelo próprio celular, visualizando os clientes agendados, serviços e horários em tempo real.",
    },
  ],
  extrasOrcamento: [
    "Integração com máquina de cartão ou maquininha TEF específica",
    "Módulo avançado de controle de comissões por profissional e fechamento de caixa diário",
    "Módulo de controle de estoque de produtos comercializados (pomadas, tônicos e óleos)",
  ],
  contrato: {
    prazoMinimoMeses: 12,
    regraCancelamento:
      "Aviso prévio de 30 dias após 12 meses de vigência, sem taxas ou multas de cancelamento.",
    titularidadeDominio:
      "O domínio próprio da barbearia fica registrado em nome do estabelecimento.",
    titularidadeCodigo:
      "Direito contínuo de uso da estrutura com disponibilização de todos os contatos e histórico em caso de saída.",
    titularidadeDados:
      "A base de clientes pertence 100% à barbearia e pode ser exportada a qualquer momento.",
    regraPublicacao:
      "Publicação no ar após validação em homologação e liquidação da taxa de implantação.",
    avisoRevisaoJuridica:
      "TODO: Cláusulas contratuais requerem revisão jurídica antes da formalização definitiva.",
  },
  whatsappMensagemTemplate:
    "Olá! Fiz uma simulação para a minha barbearia no site da EPM DevTech: Plano {plano}, {profissionais} barbeiro(s) e {unidades} unidade(s). Valores de referência: Implantação R$ {implantacao} e Mensalidade R$ {mensalidade}. Gostaria de entender os detalhes!",
};
