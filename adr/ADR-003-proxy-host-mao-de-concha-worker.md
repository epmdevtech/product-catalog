# ADR-003: Proxy por host para o Worker Mão de Concha

## Metadados

| Campo | Valor |
|---|---|
| Status | Accepted |
| Data | 2026-11-19 |
| Responsáveis | Engenharia EPMDEVTECH |
| SPEC relacionada | SPEC-012 |
| Substitui/substituída por | N/A |

## Contexto

O domínio Mão de Concha está associado ao projeto Vercel que hospeda o catálogo principal. O projeto já usa um fallback SPA global. Para servir um Worker Cloudflare no novo hostname sem mudar a URL do visitante, o roteamento precisa distinguir o Host antes do fallback. O cabeçalho global noindex também precisa permanecer nos hosts atuais sem impedir a indexação do novo site.

## Drivers da decisão

- URL pública estável no hostname `mao-de-concha.epmdevtech.com.br`.
- Isolamento por Host sem alterar o roteamento principal, www ou Odontologia.
- Compatibilidade com `vercel.json` existente.

## Alternativas consideradas

### Rewrite externo condicionado por host

- Benefícios: proxy reverso gerenciado pela Vercel; URL visível permanece no domínio público; baixo escopo.
- Custos e riscos: dependência de Vercel e disponibilidade do Worker remoto.

### Redirect para workers.dev

- Benefícios: configuração simples.
- Custos e riscos: expõe URL do Worker e viola o requisito de domínio visível. Rejeitada.

## Decisão

Usar rewrite externo por host antes do fallback SPA. Manter o `X-Robots-Tag` global para hosts diferentes do Mão de Concha com condição host-negativa.

## Consequências

### Positivas

- O hostname solicitado permanece visível ao visitante.
- Os demais hosts mantêm o comportamento anterior.

### Negativas e riscos

- O tráfego depende do proxy Vercel e do Worker Cloudflare.
- O comportamento interno de redirects e canonical do Worker depende de seu deploy e precisa ser validado após corrigir os metadados de origem.

## Implementação e migração

- Compatibilidade: rewrite host-specific precede fallback, sem alterar a SPA.
- Etapas: atualizar regra Vercel, atualizar URLs de origem Astro, executar gates e publicar após autorização.
- Rollback: reverter configuração e alterações Astro.
- Observabilidade: smoke test com curl no domínio após deploy.

## Evidências e validação

- Vercel Rewrites: https://vercel.com/docs/routing/rewrites
- Vercel Project Configuration: https://vercel.com/docs/project-configuration/vercel-json
