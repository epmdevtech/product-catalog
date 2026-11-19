# SPEC-012: Proxy do Mão de Concha para Worker Cloudflare

## Metadados

| Campo | Valor |
|---|---|
| ID | SPEC-012 |
| Status | Approved for implementation |
| Responsável | Engenharia EPMDEVTECH |
| Revisores | Produto / Engenharia / QA |
| Criado | 2026-11-19 |
| Atualizado | 2026-11-19 |
| Liberação Alvo | Próximo deploy de produção do projeto principal |
| Refs: | Discovery: solicitação do usuário em 2026-11-19 e inspeção de `vercel.json`; Design: N/A — roteamento de infraestrutura sem alteração visual; ADRs: ADR-003 |

## Problema e resultado

O domínio `mao-de-concha.epmdevtech.com.br` já está associado ao projeto Vercel principal, mas atualmente recebe o SPA principal. O resultado esperado é encaminhar por proxy as requisições desse host ao Worker Cloudflare `https://mao-de-concha.elessandrodev.workers.dev`, conservando o host solicitado na barra do navegador. O usuário autorizou esse escopo e o registro SDD em mensagem de 2026-11-19.

## Escopo

### No escopo

- Reescrever no edge da Vercel todas as rotas do host `mao-de-concha.epmdevtech.com.br` para o Worker, preservando path e query e sem redirecionamento.
- Garantir que a regra preceda o fallback SPA existente.
- Preservar o fallback SPA para demais hosts e excluir apenas o host Mão de Concha do cabeçalho global `X-Robots-Tag: noindex`.
- Atualizar URL canônica, robots e sitemap do build Astro do Mão de Concha para o domínio novo.

### Fora do escopo

- Alterações DNS, domínios ou configurações externas nos painéis Vercel/Cloudflare.
- Commit, push ou deploy de produção nesta tarefa.
- Alteração do build/deploy do Worker Cloudflare ou seus redirects internos.

## Comportamento funcional

Requisições recebidas para qualquer path no host Mão de Concha são encaminhadas externamente ao Worker com o mesmo path, sem resposta 3xx para `workers.dev`. GET e HEAD seguem o mecanismo padrão de rewrites da Vercel; não há seletor de método na regra declarativa de rewrite. Requisições a outros hosts continuam no roteamento SPA atual. O host Mão de Concha não recebe o `X-Robots-Tag` global de desindexação do catálogo.

O site Astro usa `https://mao-de-concha.epmdevtech.com.br` para `site`, canonical, Open Graph e sitemap. Assets permanecem em caminhos relativos à raiz.

## Requisitos não-funcionais

- Segurança e privacidade: não adicionar credenciais; preservar os cabeçalhos de segurança existentes; o Worker é origem externa controlada pela equipe.
- Desempenho e capacidade: proxy sem transformação de payload ou configuração de cache adicional.
- Confiabilidade e recuperação: rollback por remoção das regras host-specific e restauração do cabeçalho global anterior.
- Acessibilidade: N/A — sem alteração de interface.
- Compatibilidade: preservar fallback SPA, domínio principal e demais subdomínios.
- Observabilidade: validação por curl após deploy; logs da Vercel/Cloudflare permanecem nos painéis existentes.

## Critérios de aceitação

### AC-001

```yaml
id: AC-001
title: Proxy reverso do host Mão de Concha
preconditions:
  - O deploy de produção da Vercel inclui a configuração desta SPEC.
  - O Worker configurado está disponível.
action: O navegador requisita a raiz ou um caminho do host mao-de-concha.epmdevtech.com.br.
expected_result: A resposta é servida pelo Worker preservando a URL pública, o path e a query, sem redirecionamento para workers.dev.
evidence_type: automated / manual
```

### AC-002

```yaml
id: AC-002
title: Preservação dos demais hosts e do fallback SPA
preconditions:
  - O deploy de produção da Vercel inclui a configuração desta SPEC.
action: Uma requisição chega ao domínio principal, www ou a outro host do projeto e acessa uma rota SPA.
expected_result: A requisição continua usando o fallback SPA existente e os cabeçalhos globais atuais.
evidence_type: automated / manual
```

### AC-003

```yaml
id: AC-003
title: Indexação e URLs canônicas do Mão de Concha
preconditions:
  - O build Astro usa o domínio público aprovado.
action: Inspecionar a resposta/build do Mão de Concha.
expected_result: Canonical, Open Graph, sitemap e robots usam o domínio novo e a resposta desse host não recebe X-Robots-Tag noindex do projeto principal.
evidence_type: automated / manual
```

## Abordagem técnica

Adicionar rewrite condicional `has: host` no início de `vercel.json`, antes do rewrite genérico. Separar o cabeçalho `X-Robots-Tag` em regra com `host neq` para manter a política nos demais domínios. Atualizar `astro.config.mjs` e fallbacks URL nos handlers Astro.

## Entrega e operações

- Plano de implantação: publicar o projeto principal na Vercel após validações e autorização do responsável.
- Plano de migração: N/A — configuração declarativa e metadados estáticos.
- Plano de rollback: reverter as mudanças rastreadas da SPEC e republicar o projeto principal.
- Monitoramento e alertas: validar HTTPS, status HTTP, ausência de 3xx para workers.dev, host/path, assets e logs.

## Riscos e dependências

| Risco ou dependência | Impacto | Probabilidade | Mitigação | Responsável |
|---|---|---|---|---|
| Worker pode emitir canonical/redirect apontando ao hostname antigo | SEO e navegação | Média | Validar deploy Worker e verificar headers/HTML; corrigir no repositório Worker em tarefa própria | Engenharia |
| Regra Vercel de host não publicada | Host serve SPA principal | Baixa após deploy | Conferir configuração no deploy de produção | Release |

## Questões abertas

| Questão | Responsável | Data limite | Resolução |
|---|---|---|---|
| Repositório e comando de deploy do Worker não identificados | Engenharia | Antes de corrigir redirects/metadados no Worker | Configuração não existe no repositório Mão de Concha disponível; confirmar com equipe proprietária |

## Aprovação

| Papel | Nome | Decisão | Data | Notas |
|---|---|---|---|---|
| Produto | Solicitante | Approved | 2026-11-19 | Aprovação explícita do escopo e autorização para executar próximo passo |
| Design | N/A | N/A | 2026-11-19 | Sem alteração de interface |
| Engenharia | Codex | Approved | 2026-11-19 | Implementação conforme escopo aprovado |
| QA | Pendente | Not ready | 2026-11-19 | Gates e evidências a executar |
