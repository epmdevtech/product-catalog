# REVIEW-009: Preço Único por Estrutura, Home Neutra e Propostas Dinâmicas sob Demanda

## Metadados

| Campo | Valor |
|---|---|
| ID | REVIEW-009 |
| SPEC | `SPEC-009` |
| TASK | `TASK-009-01` |
| Data | 2026-10-09 |
| Resultado | Aprovado |

---

## 1. Verificações de Aceitação

- [x] **AC-001 (Tabela Canônica de Preços Única)**: `src/data/pricing.ts` criado com a tabela oficial de preços e tipos Zod. Campo `pricing` removido de `NicheConfig` e de todos os arquivos em `src/data/niches/` (`odontologia.ts`, `advocacia.ts`, `barbearia.ts`, `_template.ts`).
- [x] **AC-002 (Funções de Pricing Puras)**: `src/lib/pricing.ts` refatorado para ler `pricingTable` diretamente, removendo o parâmetro de nicho de `calculatePricing`.
- [x] **AC-003 (Página Neutra em Produção)**: Rota `/` refatorada em `HomePage.tsx` para exibir exclusivamente o logo da EPM DevTech e a mensagem: *"Acesse esta página pelo link da sua proposta."*, sem links, nichos nem clientes.
- [x] **AC-004 (Painel /interno DEV-only)**: Rota `/interno` montada em `App.tsx` apenas quando `import.meta.env.DEV` for verdadeiro. Verificado no bundle de produção que a rota e seu componente foram eliminados via Dead Code Elimination pelo Rollup/Vite.
- [x] **AC-005 (Slugs Imprevisíveis & Code Splitting)**:
  - Formato `{nome-curto}-{token8}` implementado com `crypto.randomBytes(4).toString('hex')`.
  - Propostas salvas como arquivos JSON individuais em `src/data/proposals/*.json`.
  - Carregamento assíncrono sob demanda via `loadProposal(slug)`.
  - Verificado que cada proposta gera um chunk minúsculo isolado (~0.7 kB) e que nenhum nome de cliente ou dado comercial existe no bundle principal `dist/assets/index-*.js`.
  - Slugs inválidos redirecionam silenciosamente para `/`.
- [x] **AC-006 (Script Interativo)**: `scripts/new-proposal.ts` criado e registrado no `package.json` (`npm run proposta:nova`).
- [x] **AC-007 (Testes e Regra de Ouro)**:
  - 21 testes unitários aprovados no Vitest cobrindo todos os cenários da nova tabela (1 prof, 4, 5, 11, 2 un, 3 un, essencial, add-on WhatsApp, parcelas, desconto à vista e payback).
  - Teste `nicheWordsGuard.test.ts` aprovado com 0 violações da Regra de Ouro.
- [x] **AC-008 (Compilação e Build)**: `npm run build` executado com código 0 e sem avisos de tipagem.
