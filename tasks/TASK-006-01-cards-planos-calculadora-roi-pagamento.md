# TASK-006-01: Cards de Planos, Calculadora de Retorno e Condições de Pagamento

## Metadados

| Campo | Valor |
|---|---|
| ID | TASK-006-01 |
| Status | Completed |
| SPEC | `SPEC-006` |
| Responsável | Engenharia & UX EPMDEVTECH |
| Dependências | `TASK-005-01` |
| Critérios de Aceitação | AC-001, AC-002, AC-003, AC-004 |

---

## Escopo da Tarefa

1. Criar `src/sections/PlansSection.tsx` com cards para Essencial, Pro e Multiunidade, destacando o plano sugerido pelo simulador.
2. Criar `src/sections/RoiCalculatorSection.tsx` com inputs controlados, cálculo reativo de ROI/payback, gráfico Recharts acumulado de 12 meses e aviso ilustrativo.
3. Criar `src/sections/PaymentTermsSection.tsx` com linha do tempo de 5 fases, cálculo de parcelas em 3x e 4x sem juros pela EPM, cartão e desconto à vista de propostas.
4. Integrar as seções em `src/App.tsx`.
5. Validar build e testes com `npm run test` e `npm run build`.
