import { NicheConfigSchema, type NicheConfig } from "@/types/niche";
import { odontologia } from "./odontologia";
import { advocacia } from "./advocacia";
import { barbearia } from "./barbearia";

export const RESERVED_SLUGS = ["proposta", "admin", "api", "static"] as const;

// Validação em runtime via Zod para garantir integridade arquitetural
const rawNiches: Record<string, NicheConfig> = {
  odontologia: NicheConfigSchema.parse(odontologia),
  advocacia: NicheConfigSchema.parse(advocacia),
  barbearia: NicheConfigSchema.parse(barbearia),
};

export const niches: Record<string, NicheConfig> = rawNiches;

export function getNicheBySlug(slug: string): NicheConfig | undefined {
  const normalized = slug.trim().toLowerCase();
  if (RESERVED_SLUGS.includes(normalized as typeof RESERVED_SLUGS[number])) {
    return undefined;
  }
  return niches[normalized];
}

export function isValidNicheSlug(slug: string): boolean {
  return getNicheBySlug(slug) !== undefined;
}

export function getAllNiches(): NicheConfig[] {
  return Object.values(niches);
}
