import { ProposalSchema, type Proposal } from "./schema";

const proposalModules = import.meta.glob<{ default: unknown }>("./*.json");

/**
 * Carrega dinamicamente a proposta sob demanda a partir do arquivo JSON isolado.
 * Retorna null caso o arquivo não exista ou seja inválido.
 */
export async function loadProposal(slug: string): Promise<Proposal | null> {
  const normalized = slug.trim().toLowerCase();
  const path = `./${normalized}.json`;
  const loader = proposalModules[path];
  if (!loader) {
    return null;
  }
  try {
    const module = await loader();
    return ProposalSchema.parse(module.default);
  } catch {
    return null;
  }
}

/**
 * Carrega todas as propostas para uso exclusivo no painel de desenvolvimento local (/interno).
 */
export async function getAllProposalsForDev(): Promise<Proposal[]> {
  const list: Proposal[] = [];
  for (const path in proposalModules) {
    try {
      const module = await proposalModules[path]();
      list.push(ProposalSchema.parse(module.default));
    } catch {
      // Ignora arquivos corrompidos
    }
  }
  return list;
}
