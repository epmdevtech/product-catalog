# SPEC-004: Arquitetura Multinicho, Pricing e Testes de Validação

## Metadados

| Campo | Valor |
|---|---|
| ID | SPEC-004 |
| Status | Approved |
| Responsável | Engenharia & Produto EPMDEVTECH |
| Revisores | Engenharia / QA |
| Criado | 2026-10-09 |
| Atualizado | 2026-10-09 |
| Lançamento alvo | v0.2.0 |
| Refs | `templates/spec.md`, `standards/coding.md`, `standards/testing.md` |

---

## Problema e resultado

A EPM DevTech atende múltiplos nichos de serviços com o mesmo produto (site premium + EPM Booking). Para manter escalabilidade, zero retrabalho de código e total isolamento entre nichos, a regra de ouro do projeto define: **zero texto de nicho em componentes, seções e bibliotecas**.
Esta especificação estabelece os contratos tipados (`NicheConfig`), a validação em runtime via Zod, as configurações canônicas dos 3 nichos iniciais (odontologia, advocacia, barbearia), o motor de cálculo puro (`pricing.ts`), as perguntas frequentes base (`faqBase.ts`) e suítes completas de testes unitários com Vitest, incluindo a trava automatizada que falha se palavras de nicho forem encontradas no código do core.

---

## Escopo

### No escopo (In scope)
- Tipagem e schema Zod `NicheConfig` em `src/types/niche.ts`.
- Configuração de nichos em `src/data/niches/`: `odontologia.ts`, `advocacia.ts`, `barbearia.ts`, `_template.ts` e `index.ts`.
- FAQ base em `src/data/faqBase.ts`.
- Motor de cálculo parametrizado em `src/lib/pricing.ts` (planos, simulação, parcelamento e payback).
- Testes unitários de precificação em `src/lib/__tests__/pricing.test.ts`.
- Teste de trava de termos de nicho em `src/test/nicheWordsGuard.test.ts`.

### Fora do escopo (Out of scope)
- Componentes visuais React de renderização das telas (será SPEC-005 e posteriores).

---

## Critérios de Aceitação

### AC-001: Validação e integridade de tipos
```gherkin
Dado o registro de nichos em `src/data/niches`
Quando validado contra o esquema Zod de NicheConfig
Então todos os nichos (odontologia, advocacia, barbearia) devem validar sem nenhum erro de tipagem ou campo ausente.
```

### AC-002: Precisão do motor de cálculo (Pricing)
```gherkin
Dado qualquer combinação de profissionais (1, 4, 5, 11), unidades (1, 2, 3) e add-ons
Quando executado `calculatePricing`
Então os valores de implantação e mensalidade devem bater exatamente com a tabela de regras do nicho.
```

### AC-003: Validação de parcelamento e ROI
```gherkin
Dado valores de implantação e mensalidade
Quando calculado o parcelamento (3x, 4x, entrada/saldo) e a calculadora de retorno
Então as parcelas devem refletir as condições contratuais e casos onde a receita é menor que a mensalidade devem retornar flag indicando que não há payback.
```

### AC-004: Trava automatizada da Regra de Ouro (Zero texto de nicho)
```gherkin
Dado os diretórios `src/components`, `src/sections` e `src/lib`
Quando executado o teste `nicheWordsGuard.test.ts`
Então o teste deve falhar se qualquer termo específico de nicho for detectado nesses diretórios.
```
