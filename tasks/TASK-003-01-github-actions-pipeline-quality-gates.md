# TASK-003-01: Configuração do Pipeline GitHub Actions

## Metadados

| Campo | Valor |
|---|---|
| ID | TASK-003-01 |
| Status | Completed |
| SPEC | `SPEC-003` |
| Responsável | DevOps & QA EPMDEVTECH |
| Dependências | `TASK-001-01`, `TASK-002-01` |
| Critérios de Aceitação | AC-001 |

---

## Escopo da Tarefa

1. Criar `.github/workflows/ci.yml`.
2. Incluir steps para: Checkout, Setup Node 20 com cache npm, `npm ci`, checagem de tipos, testes Vitest, build de produção e verificação da matriz de rastreabilidade.
3. Validar sintaxe YAML.
