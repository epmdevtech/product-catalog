# SPEC-008: Rotas, Propostas Personalizadas, Noindex, Analytics e Documentação

## Metadados

| Campo | Valor |
|---|---|
| ID | SPEC-008 |
| Título | Rotas, Propostas Personalizadas, Noindex, Analytics e Documentação |
| Status | Approved |
| Autor | Engenharia de Front-end & UX EPMDEVTECH |
| Data de Criação | 2026-10-09 |
| Escopo | `src/data/proposals.ts`, `src/pages/`, `src/App.tsx`, `public/robots.txt`, `vercel.json`, `README.md` |

---

## 1. Contexto e Motivação

Com todas as seções e regras de precificação desenvolvidas, a plataforma precisa de:
1. Roteamento completo com `react-router-dom`:
   - `/`: Seletor de uso interno para navegar entre nichos e propostas.
   - `/:nicho`: Página comercial do nicho com o simulador e todos os blocos interativos.
   - `/proposta/:slug`: Página personalizada para um cliente específico com valores pré-configurados, banner exclusivo e condições comerciais especiais.
2. Garantia absoluta de desindexação (`noindex, nofollow`) via `robots.txt`, `vercel.json` e `react-helmet-async`.
3. Monitoramento e telemetria com `@vercel/analytics` e `@vercel/speed-insights`.
4. Documentação de engenharia (`README.md`) para manutenção contínua, onboarding e expansão para novos nichos.

---

## 2. Requisitos e Regras de Negócio

### 2.1 Propostas Personalizadas (`src/data/proposals.ts`)
1. Validação estrita com schema Zod `ProposalSchema`.
2. Campos:
   - `slug`: identificador amigável na URL.
   - `nichoSlug`: vínculo com o nicho existente (`odontologia`, `advocacia`, `barbearia`).
   - `nomeNegocio`: nome da empresa/estabelecimento.
   - `responsavel`: tomador de decisão (opcional ou preenchido).
   - `profissionais`: quantidade pré-configurada de profissionais.
   - `unidades`: quantidade pré-configurada de unidades.
   - `plano`: plano sugerido (`essencial` | `pro` | `multiunidade`).
   - `incluirWhatsApp`: boolean.
   - `validadeAte`: data de validade da proposta.
   - `observacoes`: notas adicionais.
   - `condicaoAVistaEspecial`: objeto opcional com desconto especial à vista.
   - `criadoEm`: data de emissão.
3. Função utilitária `getProposalBySlug(slug: string)` e exportação do catálogo de propostas.

### 2.2 Roteamento (`react-router-dom`)
1. Rota `/proposta/:slug`:
   - Busca proposta. Se não encontrada, redireciona para `/`.
   - Carrega o nicho correspondente e inicializa o `NicheProvider` com os dados da proposta.
   - Exibe banner personalizado no topo da página.
   - Dispara telemetria de abertura de proposta.
2. Rota `/:nicho`:
   - Slug reservado: `proposta` não deve colidir.
   - Se nicho não existir no catálogo, redireciona para `/`.
   - Inicializa `NicheProvider` com o nicho solicitado e valores padrão.
3. Rota `/`:
   - Seletor limpo interno da EPM DevTech para demonstração rápida dos nichos e das propostas ativas.
   - Lista links diretos para cada nicho e cada proposta.

### 2.3 Desindexação e Infraestrutura Vercel
1. `public/robots.txt`: Disallow geral (`User-agent: *`, `Disallow: /`).
2. `vercel.json`:
   - Headers globais: `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`.
   - Rewrites para SPA: todas as rotas direcionando para `/index.html`.
3. `react-helmet-async`: Meta tag `<meta name="robots" content="noindex, nofollow" />` em todas as rotas.

### 2.4 Telemetria (@vercel/analytics & Speed Insights)
1. Integrar componentes `<Analytics />` e `<SpeedInsights />` no App.
2. Rastrear eventos:
   - `simulador_alterado`
   - `whatsapp_clique`
   - `proposta_aberta`
   - `calculadora_usada`

### 2.5 Documentação (`README.md`)
1. Atualizar com stack oficial, regras de negócio multinicho, guia de novos nichos via `_template.ts`, criação de propostas personalizadas, comandos de teste, build e deploy na Vercel.

---

## 3. Critérios de Aceitação

- [ ] **AC-001 (Propostas Personalizadas)**: `src/data/proposals.ts` criado com validação Zod e propostas mockadas válidas.
- [ ] **AC-002 (Rotas)**: Rotas `/`, `/:nicho` e `/proposta/:slug` funcionais com redirecionamento de slugs inválidos.
- [ ] **AC-003 (Banner de Proposta)**: Rota `/proposta/:slug` exibe cabeçalho personalizado com nome, responsável e validade.
- [ ] **AC-004 (Noindex)**: `robots.txt` e `vercel.json` configurados com restrição total de indexação.
- [ ] **AC-005 (Analytics)**: Vercel Analytics e Speed Insights ativos com telemetria nos eventos-chave.
- [ ] **AC-006 (README)**: Documentação atualizada com todos os guias operacionais.
- [ ] **AC-007 (Regra de Ouro)**: Testes `nicheWordsGuard.test.ts` e Vitest aprovados com 100% de sucesso.
- [ ] **AC-008 (Build)**: `npm run build` executado sem erros.
