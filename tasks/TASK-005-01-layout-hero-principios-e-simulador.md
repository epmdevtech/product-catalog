# TASK-005-01: Layout, Hero, Princípios e Simulador Interativo

## Metadados

| Campo | Valor |
|---|---|
| ID | TASK-005-01 |
| Status | Completed |
| SPEC | `SPEC-005` |
| Responsável | Engenharia & UX EPMDEVTECH |
| Dependências | `TASK-004-01` |
| Critérios de Aceitação | AC-001, AC-002, AC-003, AC-004 |

---

## Escopo da Tarefa

1. Criar `src/contexts/NicheContext.tsx` e hook `useNiche()`.
2. Criar primitivas UI em `src/components/ui/` (`button.tsx`, `slider.tsx`, `switch.tsx`, `badge.tsx`, `card.tsx`).
3. Criar `src/components/layout/Header.tsx` com logo adaptativo EPM DevTech (light/dark) e ThemeToggle.
4. Criar `src/sections/HeroSection.tsx` com CTA principal de rolagem para o simulador e CTA secundário condicional "Ver demonstração".
5. Criar `src/sections/PrinciplesSection.tsx` com os três princípios inegociáveis.
6. Criar `src/sections/SimulatorSection.tsx` com controle por slider e stepper, cálculo reativo via `calculatePricing`, exibição separada de implantação e mensalidade, e geração de link WhatsApp.
7. Validar com `npm run test` garantindo que o `nicheWordsGuard.test.ts` passe com zero violações.
