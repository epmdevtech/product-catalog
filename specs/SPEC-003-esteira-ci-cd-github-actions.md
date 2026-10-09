# SPEC-003: Esteira CI/CD GitHub Actions

## Metadados

| Campo | Valor |
|---|---|
| ID | SPEC-003 |
| Status | Approved |
| Responsável | DevOps & QA EPMDEVTECH |
| Revisores | Engenharia / QA |
| Criado | 2026-10-09 |
| Atualizado | 2026-10-09 |
| Lançamento alvo | v0.2.0 |
| Refs | `templates/spec.md`, `standards/quality-gates.md` |

---

## Problema e resultado

Automação da validação dos Quality Gates em cada push e pull request para as branches `main` e `develop`, garantindo integridade de tipagem TypeScript, aprovação de testes Vitest, compilação limpa do Vite e conformidade com a rastreabilidade do Universal SDD.

---

## Escopo

### No escopo (In scope)
- Configuração do workflow `.github/workflows/ci.yml`.
- Execução de `npm ci`, checagem de tipos (`tsc --noEmit`), testes unitários (`npm run test`), compilação (`npm run build`) e validação da matriz de rastreabilidade (`python3 scripts/generate_traceability.py`).

### Fora do escopo (Out of scope)
- Deploy automático para Vercel via CLI (será integrado diretamente via conexão Vercel GitHub).

---

## Critérios de Aceitação

### AC-001: Validação contínua em branches principais
```gherkin
Dado um commit ou PR direcionado a `main` ou `develop`
Quando a action for acionada
Então todas as etapas (tipos, testes, build, rastreabilidade) devem executar com sucesso.
```
