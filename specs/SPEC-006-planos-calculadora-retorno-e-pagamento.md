# SPEC-006: Cards de Planos, Calculadora de Retorno e Condições de Pagamento

## Metadados

| Campo | Valor |
|---|---|
| ID | SPEC-006 |
| Status | Approved |
| Responsável | Engenharia & UX/UI EPMDEVTECH |
| Revisores | Design / Engenharia / QA |
| Criado | 2026-10-09 |
| Atualizado | 2026-10-09 |
| Lançamento alvo | v0.2.0 |
| Refs | `templates/spec.md`, `standards/ux-ui.md`, `standards/testing.md` |

---

## Problema e resultado

Apresentar com máxima clareza comercial:
1. Cards comparativos dos três planos estruturais (Essencial, Pro e Multiunidade), com destaque dinâmico para o plano recomendado e especificação rigorosa do que está incluso na implantação e na mensalidade.
2. Calculadora de retorno sobre o investimento (ROI) com parâmetros pré-configurados do nicho, cálculo automático de receita adicional e meses para payback, gráfico visual acumulado em 12 meses via Recharts e tratamento de cenários sem payback.
3. Linha do tempo de pagamento com marcos de entrega (Contratação → Desenvolvimento → Homologação → Aprovação → Publicação) e simulador de parcelas da implantação (3x/4x EPM, até 6x cartão e condição especial à vista quando presente em proposta).

---

## Escopo

### No escopo (In scope)
- `src/sections/PlansSection.tsx`: Cards de planos com seleção interativa e listas do que está incluso na taxa de implantação e na mensalidade.
- `src/sections/RoiCalculatorSection.tsx`: Inputs de ticket médio e atendimentos recuperados, cálculo de payback e gráfico Recharts de 12 meses com disclaimer obrigatório.
- `src/sections/PaymentTermsSection.tsx`: Linha do tempo dos marcos de entrega/pagamento, simulação de parcelas em 3x/4x sem juros e até 6x no cartão, e exibição de desconto à vista exclusivo de proposta.
- Testes com `nicheWordsGuard.test.ts`.

### Fora do escopo (Out of scope)
- Transações financeiras com gateway ou checkout (o fechamento ocorre diretamente via atendimento humano no WhatsApp).

---

## Critérios de Aceitação

### AC-001: Seleção e destaque dos planos
```gherkin
Dado o estado atual do simulador
Quando a seção de planos for exibida
Então o plano recomendado pelo perfil deve vir destacado com badge e os valores devem refletir os cálculos do nicho.
```

### AC-002: Interatividade e gráfico da calculadora de retorno
```gherkin
Dado os inputs de ticket médio e quantidade recuperada
Quando o usuário alterar os valores
Então a receita adicional e o payback devem atualizar em tempo real; caso o lucro seja <= 0, deve exibir aviso amigável de que o investimento não se paga nessas condições.
```

### AC-003: Simulação de parcelas e marcos de pagamento
```gherkin
Dado o valor da taxa de implantação calculada
Quando visualizadas as condições de pagamento
Então devem ser exibidas as simulações em 3x e 4x sem juros pela EPM e a linha do tempo com os 5 marcos de entrega.
```

### AC-004: Regra de Ouro mantida
```gherkin
Dado o código adicionado nas novas seções
Quando executado `nicheWordsGuard.test.ts`
Então nenhum termo restrito de nicho deve existir nos arquivos.
```
