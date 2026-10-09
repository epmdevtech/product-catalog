# TASK-009-01: Refatoração para Preço Único, Home Neutra e Propostas Dinâmicas sob Demanda

## Metadados

| Campo | Valor |
|---|---|
| ID | TASK-009-01 |
| Status | Completed |
| SPEC | `SPEC-009` |
| Responsável | Engenharia de Front-end & UX EPMDEVTECH |
| Dependências | `TASK-008-01` |
| Critérios de Aceitação | AC-001, AC-002, AC-003, AC-004, AC-005, AC-006, AC-007, AC-008 |

---

## Escopo da Tarefa

1. Criar `src/data/pricing.ts` com a tabela única de preços da EPM DevTech e tipos correspondentes.
2. Remover campo `pricing` de `NicheConfig` em `src/types/niche.ts` e dos arquivos em `src/data/niches/` (`odontologia.ts`, `advocacia.ts`, `barbearia.ts`, `_template.ts`).
3. Refatorar `src/lib/pricing.ts` para ler diretamente de `src/data/pricing.ts`, eliminando dependência de objeto de nicho para cálculos financeiros.
4. Ajustar `NicheContext.tsx`, `PlansSection.tsx` e `SimulatorSection.tsx`.
5. Atualizar os testes de precificação em `src/lib/__tests__/pricing.test.ts`.
6. Refatorar `src/pages/HomePage.tsx` para apresentar apenas a página neutra (logo + frase obrigatória).
7. Criar `src/pages/InternalDevPage.tsx` e condicionar a rota `/interno` no `src/App.tsx` apenas a `import.meta.env.DEV`.
8. Migrar propostas para arquivos JSON individuais em `src/data/proposals/*.json` com token aleatório de 8 caracteres.
9. Refatorar `src/pages/ProposalPage.tsx` para carregar propostas sob demanda via dynamic import.
10. Criar `scripts/new-proposal.ts` e adicionar script `"proposta:nova"` no `package.json`.
11. Executar testes, verificar build de produção (`npm run build`) e inspecionar bundle gerado.
12. Atualizar documentação em `README.md` e `PROJECT.md`.
