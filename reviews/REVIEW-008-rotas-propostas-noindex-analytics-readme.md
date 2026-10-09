# REVIEW-008: Rotas, Propostas Personalizadas, Noindex, Analytics e Documentação

## Metadados

| Campo | Valor |
|---|---|
| ID | REVIEW-008 |
| SPEC | `SPEC-008` |
| TASK | `TASK-008-01` |
| Data | 2026-10-09 |
| Resultado | Aprovado |

---

## 1. Verificações de Aceitação

- [x] **AC-001 (Propostas Personalizadas)**: `src/data/proposals.ts` implementado com validação em runtime por schema Zod (`ProposalSchema`), contendo propostas ativas para os três nichos iniciais (`sorriso-prime`, `silva-santos-adv`, `imperio-barber`).
- [x] **AC-002 (Roteamento com React Router)**: Rotas configuradas no `App.tsx`:
  - `/`: Painel interno de seleção de segmentos e propostas (`HomePage`).
  - `/:nicho`: Página comercial com simulador do segmento (`NichePage`), com proteção para o slug reservado `proposta` e redirecionamento de slugs desconhecidos.
  - `/proposta/:slug`: Página nominal com parâmetros pré-configurados e banner personalizado (`ProposalPage`).
  - `*`: Redirecionamento automático com `<Navigate to="/" replace />`.
- [x] **AC-003 (Banner de Proposta)**: `ProposalBanner` renderiza dados nominais do negócio, responsável, data de validade e observações.
- [x] **AC-004 (Desindexação / Noindex)**:
  - `public/robots.txt` com `Disallow: /`.
  - `vercel.json` com `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet` e reescrita de rotas SPA para `/index.html`.
  - `react-helmet-async` injetando meta tag em todas as telas.
- [x] **AC-005 (Analytics & Telemetria)**: Componentes `<Analytics />` e `<SpeedInsights />` integrados. Rastreamento ativo para `proposta_aberta`, `whatsapp_clique`, `simulador_alterado` e `calculadora_usada`.
- [x] **AC-006 (Documentação / README)**: `README.md` reescrito e enriquecido com guia de arquitetura, guia passo a passo para novos nichos via `_template.ts`, criação de propostas e deploy na Vercel para o domínio `planos.epmdevtech.com.br`.
- [x] **AC-007 (Regra de Ouro)**: `nicheWordsGuard.test.ts` e Vitest executados com 31/31 testes aprovados. Zero termos de nicho nos módulos monitorados.
- [x] **AC-008 (Compilação & Build)**: `npm run build` executado com sucesso e zero erros de compilação.
