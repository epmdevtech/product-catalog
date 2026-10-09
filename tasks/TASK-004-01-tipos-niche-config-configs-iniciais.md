# TASK-004-01: Tipos NicheConfig, Configs de Nichos, Pricing e Testes

## Metadados

| Campo | Valor |
|---|---|
| ID | TASK-004-01 |
| Status | Completed |
| SPEC | `SPEC-004` |
| Responsável | Engenharia EPMDEVTECH |
| Dependências | `TASK-001-01`, `TASK-003-01` |
| Critérios de Aceitação | AC-001, AC-002, AC-003, AC-004 |

---

## Escopo da Tarefa

1. Criar `src/types/niche.ts` com TypeScript estrito e Zod schema para `NicheConfig`.
2. Criar `src/data/niches/odontologia.ts`, `src/data/niches/advocacia.ts`, `src/data/niches/barbearia.ts`.
3. Criar `src/data/niches/_template.ts` documentado e comentado.
4. Criar `src/data/niches/index.ts` com validação e lookup.
5. Criar `src/data/faqBase.ts` com as 7 objeções padrão.
6. Criar `src/lib/pricing.ts` com as funções puras de cálculo (`calculatePricing`, `calculateInstallments`, `calculateROI`).
7. Criar `src/lib/__tests__/pricing.test.ts` cobrindo todos os cenários solicitados (1, 4, 5, 11 profissionais, 2 e 3 unidades, WhatsApp, parcelas, condição à vista, payback inexistente).
8. Criar `src/test/nicheWordsGuard.test.ts` implementando a trava da regra de ouro.
9. Executar e validar todos os testes com `npm run test`.
