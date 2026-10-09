# SPEC-002: Infraestrutura Docker e Docker Compose

## Metadados

| Campo | Valor |
|---|---|
| ID | SPEC-002 |
| Status | Approved |
| Responsável | DevOps & Engenharia EPMDEVTECH |
| Revisores | Engenharia / QA |
| Criado | 2026-10-09 |
| Atualizado | 2026-10-09 |
| Lançamento alvo | v0.2.0 |
| Refs | `templates/spec.md`, `standards/quality-gates.md` |

---

## Problema e resultado

Garantir paridade de ambiente, facilidade de execução local e padronização da esteira de containers para a aplicação `planos.epmdevtech.com.br`.
A solução provê um `Dockerfile` multi-stage otimizado (Node Alpine para compilação + Nginx Alpine para servir o build estático SPA) e um `docker-compose.yml` para desenvolvimento com suporte a Hot Module Replacement (HMR).

---

## Escopo

### No escopo (In scope)
- `Dockerfile` multi-stage (builder Node 20 Alpine e runner Nginx Alpine).
- `nginx.conf` com redirecionamento de rotas SPA para `/index.html`.
- `docker-compose.yml` configurado para desenvolvimento com montagem de volume e porta 5173 exposta.
- `.dockerignore` protegendo artefatos temporários, `node_modules` e `.git`.

### Fora do escopo (Out of scope)
- Orquestração de Kubernetes ou clusters em nuvem.

---

## Critérios de Aceitação

### AC-001: Build e compilação da imagem Docker
```gherkin
Dado o código da aplicação
Quando executado o build do Dockerfile
Então a imagem Docker deve compilar os artefatos com sucesso e empacotá-los com Nginx Alpine.
```

### AC-002: Ambiente de desenvolvimento Docker Compose
```gherkin
Dado o arquivo `docker-compose.yml`
Quando acionado o compose
Então o serviço de dev deve iniciar com HMR na porta 5173.
```
