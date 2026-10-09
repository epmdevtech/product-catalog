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
