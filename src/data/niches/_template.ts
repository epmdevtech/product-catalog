/**
 * TEMPLATE PARA CRIAÇÃO DE NOVOS NICHOS (EPM DEVTECH)
 * ===================================================
 * Para adicionar um novo nicho (ex.: estetica, fisioterapia, psicologia, petshop):
 * 1. Copie este arquivo para `src/data/niches/<novo-slug>.ts`
 * 2. Preencha todos os campos obrigatórios respeitando a concordância gramatical em PT-BR.
 * 3. Registre o novo nicho em `src/data/niches/index.ts`.
 * 4. NUNCA utilize termos deste nicho em `src/components`, `src/sections` ou `src/lib`.
 *    A trava do Vitest (`nicheWordsGuard.test.ts`) garantirá a integridade arquitetural.
 */

import type { NicheConfig } from "@/types/niche";

export const templateNicho: NicheConfig = {
  // Slug utilizado na URL (ex: /estetica). "proposta" é uma palavra reservada e proibida!
  slug: "exemplo-nicho",

  // Nome interno utilizado exclusivamente em relatórios internos (NUNCA exibido na UI pública)
  nomeInterno: "Exemplo de Nicho",

  // Tom de voz editorial ("clinico" | "sobrio" | "descontraido")
  tom: "sobrio",

  // Termos canônicos com flexão de gênero e artigos gramaticais
  termos: {
    profissional: {
      singular: "profissional",
      plural: "profissionais",
      artigo: "o", // o/a
      deArtigo: "do", // do/da
      emArtigo: "no", // no/na
    },
    cliente: {
      singular: "cliente",
      plural: "clientes",
      artigo: "o",
      deArtigo: "do",
      emArtigo: "no",
    },
    estabelecimento: {
      singular: "empresa",
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
      singular: "atendimento",
      plural: "atendimentos",
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

  // URL da demonstração interativa. Se ainda não existir, deixe como "" (a UI oculta o botão automaticamente).
  demoUrl: "",

  hero: {
    titulo: "Título focado no valor do agendamento para o nicho",
    subtitulo:
      "Subtítulo explicando que o cliente agenda pelo celular sem conflito de horários.",
  },

  retorno: {
    ticketMedioPadrao: 200,
    atendimentosRecuperadosPadrao: 5,
    rotuloAtendimento: "atendimentos recuperados por mês",
  },

  seguranca: {
    titulo: "Segurança de dados e infraestrutura técnica de alta performance",
    itens: [
      {
        titulo: "Proteção de Dados e LGPD",
        descricao: "Armazenamento seguro e em conformidade com as diretrizes da LGPD.",
      },
      {
        titulo: "Backups Automatizados Diários",
        descricao: "Garantia de retenção e proteção contínua da base de agendamentos.",
      },
      {
        titulo: "Controle de Acessos",
        descricao: "Segurança e permissões para equipe e administradores.",
      },
      {
        titulo: "Monitoramento e Suporte Dedicado",
        descricao: "Garantia de estabilidade técnica com suporte pós-publicação da EPM.",
      },
    ],
    textoTratamentoDados:
      "Tratamento de dados em conformidade com a legislação brasileira e segurança digital.",
  },

  faq: [
    {
      pergunta: "Pergunta frequente e objeção específica deste nicho?",
      resposta: "Resposta transparente e comercial da EPM DevTech.",
    },
  ],

  extrasOrcamento: [
    "Integração com sistemas legados ou ERPs externos",
  ],

  contrato: {
    prazoMinimoMeses: 12,
    regraCancelamento:
      "Aviso prévio de 30 dias após período inicial de 12 meses.",
    titularidadeDominio:
      "Titularidade exclusiva do cliente desde a contratação.",
    titularidadeCodigo:
      "Cessão de uso para operação com exportação de dados.",
    titularidadeDados:
      "Propriedade exclusiva do cliente.",
    regraPublicacao:
      "Publicação no ar após homologação e quitação da implantação.",
    avisoRevisaoJuridica:
      "TODO: Requer validação jurídica antes de assinatura.",
  },

  whatsappMensagemTemplate:
    "Olá! Realizei uma simulação na EPM DevTech: Plano {plano}, com {profissionais} profissional(is) e {unidades} unidade(s). Valores: Implantação R$ {implantacao} e Mensalidade R$ {mensalidade}. Podemos conversar?",
};
