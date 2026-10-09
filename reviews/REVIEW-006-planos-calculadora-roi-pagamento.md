# REVIEW-006: Cards de Planos, Calculadora de Retorno e Condições de Pagamento

## Metadados

| Campo | Valor |
|---|---|
| ID | REVIEW-006 |
| SPEC | `SPEC-006` |
| TASK | `TASK-006-01` |
| Data | 2026-10-09 |
| Resultado | Aprovado |

---

## 1. Verificações de Aceitação

- [x] **AC-001 (Cards de Planos)**: Componente `PlansSection` renderiza 3 planos (Essencial, Pro, Multiunidade) com separação explícita entre implantação e operação mensal. O plano recomendado pelo simulador recebe destaque e tag "Recomendado para sua estrutura". Ao clicar em simular com outro plano, o estado reativo reflete nos preços.
- [x] **AC-002 (Calculadora de Retorno / ROI)**: Componente `RoiCalculatorSection` parametrizado por `niche.retorno` (ticket médio e volume recuperado padrão). Gráfico Recharts de área com projeção de 12 meses (Retorno Acumulado vs Investimento Total), cálculo de meses de payback e aviso ilustrativo obrigatório.
- [x] **AC-003 (Condições de Pagamento e Marcos)**: Componente `PaymentTermsSection` com timeline de 5 marcos (Contratação, Desenvolvimento, Homologação, Aprovação Formal, Publicação). Apresenta modalidades de pagamento da implantação (50/50 ou 50/25/25, 3x e 4x sem juros pela EPM, cartão até 6x) e regra de publicação mediante quitação integral.
- [x] **AC-004 (Regra de Ouro)**: `nicheWordsGuard.test.ts` e Vitest executados com sucesso (31/31 testes passando). Zero termos de nicho nos novos componentes.
- [x] **AC-005 (Build e Tipagem)**: `npm run build` executado com sucesso e zero erros de compilação TypeScript/Vite.

---

## 2. Decisões de Implementação

- O gráfico de projeção foi customizado com gradiente de opacidade da paleta Teal EPM DevTech (`#2DD4BF`) e cinza neutro (`#71717A`), mantendo harmonia com o design system tanto no modo claro quanto no escuro.
- O aviso de responsabilidade sobre simulações financeiras foi incluído no rodapé do card da calculadora conforme exigido no prompt.
