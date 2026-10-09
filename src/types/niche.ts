import { z } from "zod";

export const TermoGramaticalSchema = z.object({
  singular: z.string(),
  plural: z.string(),
  artigo: z.string(), // o, a, os, as
  deArtigo: z.string(), // do, da, dos, das
  emArtigo: z.string(), // no, na, nos, nas
});

export const TermoSimplesSchema = z.object({
  singular: z.string(),
  artigo: z.string(), // o, a
  deArtigo: z.string(), // do, da
  emArtigo: z.string(), // no, na
});

export const TermosNichoSchema = z.object({
  profissional: TermoGramaticalSchema,
  cliente: TermoGramaticalSchema,
  estabelecimento: TermoSimplesSchema,
  unidade: TermoGramaticalSchema,
  atendimento: TermoGramaticalSchema,
  agendamento: TermoGramaticalSchema,
});

export const RetornoConfigSchema = z.object({
  ticketMedioPadrao: z.number().positive(),
  atendimentosRecuperadosPadrao: z.number().positive(),
  rotuloAtendimento: z.string(),
});

export const SegurancaItemSchema = z.object({
  titulo: z.string(),
  descricao: z.string(),
});

export const SegurancaConfigSchema = z.object({
  titulo: z.string(),
  itens: z.array(SegurancaItemSchema).min(1),
  textoTratamentoDados: z.string(),
});

export const FaqItemSchema = z.object({
  pergunta: z.string(),
  resposta: z.string(),
});

export const ContratoConfigSchema = z.object({
  prazoMinimoMeses: z.number().int().positive(),
  regraCancelamento: z.string(),
  titularidadeDominio: z.string(),
  titularidadeCodigo: z.string(),
  titularidadeDados: z.string(),
  regraPublicacao: z.string(),
  avisoRevisaoJuridica: z.string(),
});

export const NicheConfigSchema = z.object({
  slug: z.string().min(2),
  nomeInterno: z.string().min(2),
  tom: z.enum(["clinico", "sobrio", "descontraido"]),
  termos: TermosNichoSchema,
  demoUrl: z.string(),
  hero: z.object({
    titulo: z.string(),
    subtitulo: z.string(),
  }),
  retorno: RetornoConfigSchema,
  seguranca: SegurancaConfigSchema,
  faq: z.array(FaqItemSchema),
  extrasOrcamento: z.array(z.string()),
  contrato: ContratoConfigSchema,
  whatsappMensagemTemplate: z.string(),
});

export type TermoGramatical = z.infer<typeof TermoGramaticalSchema>;
export type TermoSimples = z.infer<typeof TermoSimplesSchema>;
export type TermosNicho = z.infer<typeof TermosNichoSchema>;
export type RetornoConfig = z.infer<typeof RetornoConfigSchema>;
export type SegurancaConfig = z.infer<typeof SegurancaConfigSchema>;
export type FaqItem = z.infer<typeof FaqItemSchema>;
export type ContratoConfig = z.infer<typeof ContratoConfigSchema>;
export type NicheConfig = z.infer<typeof NicheConfigSchema>;
