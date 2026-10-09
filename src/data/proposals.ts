import { z } from "zod";

export const CondicaoAVistaEspecialSchema = z.object({
  tipo: z.enum(["percentual", "fixo"]),
  valor: z.number().positive(),
  descricao: z.string(),
});

export const ProposalSchema = z.object({
  slug: z.string().min(2),
  nichoSlug: z.string().min(2),
  nomeNegocio: z.string().min(2),
  responsavel: z.string().optional(),
  profissionais: z.number().int().min(1),
  unidades: z.number().int().min(1),
  plano: z.enum(["essencial", "pro", "multiunidade"]),
  incluirWhatsApp: z.boolean(),
  validadeAte: z.string(),
  observacoes: z.string().optional(),
  condicaoAVistaEspecial: CondicaoAVistaEspecialSchema.optional(),
  criadoEm: z.string(),
});

export type Proposal = z.infer<typeof ProposalSchema>;

export const proposals: Proposal[] = [
  ProposalSchema.parse({
    slug: "sorriso-prime",
    nichoSlug: "odontologia",
    nomeNegocio: "Clínica Odontológica Sorriso Prime",
    responsavel: "Dra. Renata Vasconcelos",
    profissionais: 3,
    unidades: 1,
    plano: "pro",
    incluirWhatsApp: true,
    validadeAte: "30/11/2026",
    observacoes: "Proposta desenvolvida após demonstração online da plataforma EPM Booking.",
    condicaoAVistaEspecial: {
      tipo: "percentual",
      valor: 10,
      descricao: "10% de desconto à vista na taxa de implantação",
    },
    criadoEm: "01/10/2026",
  }),
  ProposalSchema.parse({
    slug: "silva-santos-adv",
    nichoSlug: "advocacia",
    nomeNegocio: "Silva & Santos Advocacia e Consultoria Jurídica",
    responsavel: "Dr. Eduardo Silva",
    profissionais: 5,
    unidades: 1,
    plano: "pro",
    incluirWhatsApp: true,
    validadeAte: "15/12/2026",
    observacoes: "Parametrização de 5 agendas independentes para os advogados associados.",
    condicaoAVistaEspecial: {
      tipo: "fixo",
      valor: 500,
      descricao: "R$ 500 de abatimento para contratação imediata à vista",
    },
    criadoEm: "05/10/2026",
  }),
  ProposalSchema.parse({
    slug: "imperio-barber",
    nichoSlug: "barbearia",
    nomeNegocio: "Império Barber Club & Spa",
    responsavel: "Carlos Eduardo Santos",
    profissionais: 8,
    unidades: 2,
    plano: "multiunidade",
    incluirWhatsApp: true,
    validadeAte: "20/12/2026",
    observacoes: "Arquitetura com seletor de 2 filiais físicas e equipe distribuída.",
    condicaoAVistaEspecial: {
      tipo: "percentual",
      valor: 12,
      descricao: "12% de desconto à vista na contratação da rede",
    },
    criadoEm: "08/10/2026",
  }),
];

export function getProposalBySlug(slug: string): Proposal | undefined {
  return proposals.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}
