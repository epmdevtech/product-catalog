import { z } from "zod";

export const PriceTierSchema = z.object({
  implantacao: z.number().positive(),
  mensalidade: z.number().positive(),
});

export const PricingTableSchema = z.object({
  solo: PriceTierSchema,
  pequena: PriceTierSchema,
  media: PriceTierSchema,
  multiunidade: PriceTierSchema,
  essencial: PriceTierSchema,
  adicionalProfissionalMensal: z.number().positive(),
  adicionalUnidadeImplantacao: z.number().positive(),
  adicionalUnidadeMensal: z.number().positive(),
  lembretesWhatsAppMensal: z.number().positive(),
  horaTecnicaAdicional: z.number().positive(),
});

export type PriceTier = z.infer<typeof PriceTierSchema>;
export type PricingTable = z.infer<typeof PricingTableSchema>;

/**
 * Tabela canônica de preços da EPM DevTech (Site Institucional Premium + EPM Booking).
 * Válida uniformemente para qualquer nicho de mercado.
 */
export const pricingTable: PricingTable = PricingTableSchema.parse({
  // Solo (1 profissional, 1 unidade)
  solo: {
    implantacao: 3490,
    mensalidade: 169,
  },
  // Pequena (2 a 4 profissionais, 1 unidade)
  pequena: {
    implantacao: 4990,
    mensalidade: 249,
  },
  // Média (5 a 10 profissionais, 1 unidade)
  media: {
    implantacao: 6990,
    mensalidade: 329,
  },
  // Multiunidade (2 unidades, até 15 profissionais)
  multiunidade: {
    implantacao: 8990,
    mensalidade: 349,
  },
  // Essencial (apenas site institucional, sem motor de agendamento)
  essencial: {
    implantacao: 3490,
    mensalidade: 149,
  },
  // Adicional por profissional excedente por mês
  adicionalProfissionalMensal: 29,
  // Adicional por unidade além de 2 (implantação única)
  adicionalUnidadeImplantacao: 1500,
  // Adicional por unidade além de 2 (mensalidade contínua)
  adicionalUnidadeMensal: 79,
  // Add-on de lembretes automáticos por WhatsApp por mês
  lembretesWhatsAppMensal: 119,
  // Valor da hora técnica adicional fora do escopo (informativo)
  horaTecnicaAdicional: 180,
});
