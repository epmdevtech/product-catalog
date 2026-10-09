# TASK-002-01: Dockerfile, Nginx Conf e Docker Compose

## Metadados

| Campo | Valor |
|---|---|
| ID | TASK-002-01 |
| Status | Completed |
| SPEC | `SPEC-002` |
| Responsável | DevOps & Engenharia EPMDEVTECH |
| Dependências | `TASK-001-01` |
| Critérios de Aceitação | AC-001, AC-002 |

---

## Escopo da Tarefa

1. Criar `Dockerfile` multi-stage com Node 20 e Nginx Alpine.
2. Criar `nginx.conf` com fallback para SPA (`try_files $uri $uri/ /index.html;`) e cabeçalhos de segurança básicos.
3. Criar `docker-compose.yml` para ambiente de desenvolvimento com live-reload.
4. Criar `.dockerignore`.
5. Atualizar comandos correspondentes no `Makefile`.
