# Review: Layout, Hero, Princípios e Simulador Interativo

## Metadados

| Campo | Valor |
|---|---|
| Review ID | REVIEW-005 |
| SPEC | SPEC-005 |
| TASK | TASK-005-01 |
| Data | 2026-10-09 |
| Revisor | Design & QA EPMDEVTECH |
| Parecer | Aprovado |

---

## Verificação dos Critérios de Aceitação

- **AC-001 (Hero e Concordância)**: `HeroSection` renderiza títulos, subtítulos, saudações dinâmicas e botão condicional "Ver demonstração" baseado em `demoUrl`.
- **AC-002 (Simulador Interativo)**: `SimulatorSection` reativo com slider de 1 a 15 profissionais, stepper de 1 a 4 unidades e switch de WhatsApp, mantendo Implantação e Mensalidade rigorosamente separadas.
- **AC-003 (Deeplink WhatsApp)**: Link com mensagem pré-preenchida do nicho e rastreamento de eventos Vercel Analytics integrado.
- **AC-004 (Regra de Ouro)**: `nicheWordsGuard.test.ts` executado e aprovado com 0 violações em `src/components`, `src/sections` e `src/lib`.
