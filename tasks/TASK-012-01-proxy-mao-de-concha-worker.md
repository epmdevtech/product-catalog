# TAREFA (TASK): Proxy do Mão de Concha e metadados canônicos

## Metadados

| Campo | Valor |
|---|---|
| ID | TASK-012-01 |
| Status | In review |
| Responsável | Engenharia |
| Refs: | SPEC: SPEC-012; Critérios de aceitação: AC-001, AC-002, AC-003; ADRs: ADR-003 |
| Dependências | Host/DNS informados como configurados; Worker publicado |

## Objetivo

Encaminhar o host Mão de Concha ao Worker por proxy reverso e publicar metadados canônicos consistentes no build Astro.

## Escopo

### Incluído

- Rewrite condicional por host, antes do fallback SPA.
- Preservar noindex nos outros hosts e excluí-lo do host Mão de Concha.
- Atualizar URLs de site, canonical, robots e sitemap no Astro.
- Validar com testes/build e comandos HTTP/DNS aplicáveis.

### Excluído

- Painéis externos, commit, push e deploy de produção.
- Alteração de configuração de deploy ou código interno do Worker.

## Abordagem e impacto

- Prováveis arquivos ou componentes: `vercel.json`, `PROJECT.md`, `astro.config.mjs`, `src/layouts/BaseLayout.astro`, `src/pages/robots.txt.ts`, `src/pages/sitemap.xml.ts`, SPEC, ADR e esta TASK.
- Dados, contratos ou migrações: nenhuma.
- Riscos e salvaguardas: isolar as regras por host; manter as mudanças preexistentes do repositório principal intocadas.
- ADRs e padrões aplicáveis: ADR-003, Quality Gates e rastreabilidade SDD.

## Etapas (Steps)

- [x] Documentar SPEC, ADR e TASK aprovadas.
- [x] Implementar proxy Vercel e atualizar URLs Astro.
- [x] Executar quality gates do projeto principal e build/check do Astro.
- [x] Revisar diff, preservar mudanças preexistentes e registrar evidências.
- [x] Committar alterações nos repositórios afetados.

## Validação

| Critério/risco | Teste, comando, ou revisão | Evidência esperada |
|---|---|---|
| AC-001, AC-002 | Inspeção estrutural de `vercel.json`; `curl -I` após deploy | Rewrite host-specific antes do fallback; smoke HTTP após publicação |
| AC-003 | `npm run check`, `npm run build`, inspeção `dist/` | Metadados usam domínio novo; resposta no host sem noindex após deploy |
| Regressão | `make check`, `npm run build` | Gates locais aprovados |

## Condição de conclusão

- [ ] Escopo implementado sem expansão.
- [ ] Testes e validações aplicáveis foram aprovados.
- [ ] A documentação e rastreabilidade estão atualizadas.
- [ ] Limitações e desvios estão registrados.

## Resultado

- Mudanças feitas: rewrite por host, exceção ao noindex e URLs Astro atualizadas.
- Evidência: `make check` passou (23 testes); `npm run build` no projeto principal passou; `npm run check` e `npm run build` no Astro passaram; smoke HTTP atual confirmou domínio principal ainda servido pela Vercel e Worker direto com HTTP 200.
- Trabalho em aberto: deploy de produção não autorizado nesta etapa; após publicação, repetir AC-001/AC-002 e validar assets no navegador. Identificar o repositório/comando de deploy do Worker para publicar os metadados Astro alterados.
