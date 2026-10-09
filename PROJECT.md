# PROJECT: Catálogo de Produtos (Product Catalog)

## Metadados

| Campo | Valor |
|---|---|
| Nome do Projeto | Catálogo de Produtos (`product-catalog`) |
| Organização | EPMDEVTECH Clientes |
| Responsável | Engenharia & Produto EPMDEVTECH |
| Estado | Discovery / Bootstrap Inicial |
| Versão ou release | `0.1.0-alpha` (Baseline SDD-ready) |
| Última revisão | 2026-10-09 |
| Framework de Governança | Universal SDD (Spec-Driven Development) |
| Revisores | Equipe Técnica EPMDEVTECH |

---

## 1. Visão Geral e Domínio

- **Problema e resultado principal**: Prover uma plataforma moderna, performática, acessível e responsiva de catálogo de produtos para apresentação de inventário, categorias, especificações técnicas, variações e canais diretos de conversão/contato comercial.
- **Usuários e partes interessadas**:
  - *Clientes / Consumidores*: Navegação rápida por categorias, busca inteligente, filtros por atributos, visualização em alta fidelidade de itens e consulta de disponibilidade.
  - *Lojistas / Gestores de Catálogo*: Exibição clara e organizada do inventário, controle de visibilidade de itens e canais de atendimento direto.
  - *Desenvolvedores / Mantenedores*: Arquitetura modular, tipagem estrita e esteira auditável guiada por especificações (SDD).
- **Termos importantes do domínio**:
  - `Produto (Product)`: Entidade central com identificador, nome, descrição, categoria, atributos, imagens, status e metadados.
  - `Categoria (Category)`: Agrupamento hierárquico ou temático de produtos.
  - `Atributo / Variação (Variant)`: Dimensões específicas como tamanho, cor, voltagem, material ou modelo.
  - `Catálogo (Catalog)`: Conjunto consolidado de categorias e produtos disponíveis para exibição.
  - `CTA de Conversão`: Ação primária orientada a contato (ex: WhatsApp, formulário ou checkout/cotação).
- **Limites do sistema**: O projeto tem como escopo inicial a apresentação visual de alta fidelidade e experiência interativa de catálogo (modo visualização / catálogo comercial), separando processamento complexo de ERP ou gateway de pagamentos para módulos futuros definidos por SPEC.

---

## 2. Arquitetura

- **Estilo e componentes**:
  - Arquitetura baseada em componentes reativos (Component-Driven Architecture).
  - Separação em camadas canônicas: Apresentação (`components/`), Configuração e Dados (`content/` ou `config/`), Lógica de Domínio (`features/` ou `domain/`), Utilitários e Infraestrutura (`lib/`).
- **Fluxos de dados**:
  - Fluxo unidirecional de dados.
  - Fontes de dados locais canônicas e stores reativas com suporte a hydration e SSR/CSR.
- **Integrações e contratos**:
  - Suporte a deep links para canais de mensageria (ex: WhatsApp com mensagem pré-formatada do item selecionado).
  - Metadados semânticos e Open Graph para compartilhamento social de produtos.
- **ADRs vigentes**: Consultar pasta `adr/`. Novas decisões estruturais requerem ADR antes da implementação.

---

## 3. Stack Tecnológica Recomendada

| Camada / Dependência | Versão Sugerida | Finalidade | Fonte Canônica |
|---|---|---|---|
| **Linguagem** | TypeScript `~5.8.x` | Tipagem estrita e segurança em tempo de compilação | `tsconfig.json` |
| **Framework Base** | React `^19.x` | Camada de renderização reativa de interface | `package.json` |
| **Roteamento / SSR** | TanStack Router / Vite | Roteamento desacoplado e build rápido | `vite.config.ts` |
| **Estilização** | Tailwind CSS `v4.x` | Design system baseado em utilitários e CSS variables | `src/styles.css` |
| **Primitivas UI** | Radix UI / Lucide React | Acessibilidade nativa (WAI-ARIA) e ícones vetoriais | `package.json` |
| **Validação** | Zod | Validação de esquemas e integridade de dados | `package.json` |
| **Formulários** | React Hook Form | Gestão de estado performática de formulários | `package.json` |
| **Testes Unitários** | Vitest | Testes rápidos de lógica de domínio e utilitários | `vitest.config.ts` |
| **Testes E2E** | Playwright | Testes de aceitação ponta a ponta e acessibilidade | `playwright.config.ts` |
| **Qualidade & Lint** | ESLint 9 + Prettier | Conformidade estática de código e formatação | `eslint.config.js` |
| **Automação** | Makefile | Comandos canônicos e portões de qualidade unificados | `Makefile` |

---

## 4. Estrutura do Repositório

```text
product-catalog/
├── agents/             # Definição e contratos dos agentes IA (Universal SDD)
├── workflows/          # Workflows canônicos (feature, verificação, etc.)
├── standards/          # Padrões normativos (UX, acessibilidade, testes, segurança, etc.)
├── templates/          # Modelos executáveis de SPECs, Tasks, ADRs, Reviews e QA
├── specs/              # Especificações técnicas e funcionais aprovadas
├── tasks/              # Tarefas rastreadas e vinculadas a SPECs
├── reviews/            # Registros de revisões de código, design e QA
├── adr/                # Registros de Decisões Arquiteturais (ADRs)
├── knowledge/          # Base de conhecimento modular do projeto
├── profiles/           # Perfis de projeto reutilizáveis
├── docs/               # Manuais, guias operacionais e matriz de rastreabilidade
├── scripts/            # Scripts utilitários e automação (ex: matriz de rastreabilidade)
├── src/                # Código-fonte da aplicação (a ser estruturado na SPEC-001)
├── public/             # Arquivos públicos e estáticos
├── Makefile            # Automação de comandos e quality gates
├── PROJECT.md          # Estado canônico do projeto (este arquivo)
├── AGENTS.md           # Protocolo de operação de pessoas e agentes IA
├── README.md           # Visão geral e guia de introdução do repositório
├── ROADMAP.md          # Planejamento evolutivo e status de marcos
└── UNIVERSAL_SDD_FRAMEWORK.md # Definição normativa do Universal SDD
```

---

## 5. Runtime e Configuração

- **Pré-requisitos**: Node.js `>= 20` (ou Bun `>= 1.2`), Git, Make, Docker (opcional).
- **Instalação**: `npm install` (ou `bun install`).
- **Execução local**: `npm run dev` (ou `make dev`).
- **Build de produção**: `npm run build` (ou `make build`).
- **Variáveis de ambiente**:
  - `VITE_APP_TITLE`: Nome público do catálogo.
  - `VITE_CONTACT_WHATSAPP`: Número de telefone para atendimento direto.
  - `.env.example`: Arquivo canônico com as chaves necessárias sem dados sensíveis.

---

## 6. Segurança e Privacidade

- **Classificação de dados**: Dados de produtos são classificados como públicos. Informações de contato e dados de formulários devem respeitar a LGPD (Lei Geral de Proteção de Dados).
- **Gestão de segredos**: Nenhuma chave secreta ou credencial deve ser versionada no Git.
- **Sanitização de entradas**: Todas as pesquisas e parâmetros de consulta devem ser tratados contra injeções.

---

## 7. Experiência, Design e Acessibilidade

- **Plataformas**: Totalmente responsivo para Desktop, Tablet e Mobile (design mobile-first).
- **Design System**: Tokens semânticos para cores, espaçamentos, tipografia e bordas em `src/styles.css` e primitivas Radix UI.
- **Baseline de Acessibilidade**: WCAG 2.1 nível AA:
  - Navegação completa por teclado.
  - Foco visível e gerenciamento de foco em modais e gavetas (drawers).
  - Contraste de cores mínimo de 4.5:1 para texto normal.
  - Textos alternativos (`alt`) descritivos para todas as imagens de produtos.

---

## 8. Testes e Quality Gates

Toda alteração de código deve passar obrigatoriamente pelos quality gates antes da aprovação final:

1. **Gate 1 - Linting**: `npm run lint` (zero erros).
2. **Gate 2 - Tipagem**: `npx tsc --noEmit` (zero erros).
3. **Gate 3 - Testes Unitários**: `npm run test` (testes de regras de negócio).
4. **Gate 4 - Testes E2E & A11y**: `npm run test:e2e` (testes no Playwright com validação de acessibilidade).
5. **Gate 5 - Build Limpo**: `npm run build` (geração de bundle sem falhas).

---

## 9. Padrões de Desenvolvimento

- **SPEC Primeiro**: Nenhuma implementação é iniciada sem uma SPEC aprovada em `specs/`.
- **Rastreabilidade**: Todo commit deve conter os trailers:
  ```text
  Spec-Ref: SPEC-NNN
  Task-Ref: TASK-NNN-XX
  ```
- **Convenção de Commits**: Conventional Commits em português (ex: `feat:`, `fix:`, `refactor:`, `docs:`).

---

## 10. Limitações e Riscos Conhecidos

| Item | Impacto | Mitigação | Responsável |
|---|---|---|---|
| Repositório em Fase de Inicialização (Bootstrap) | Código da aplicação ainda não implementado | Conduzir Discovery e aprovar SPEC-001 antes do código | Engenharia / Produto |
| Definição de catálogo e inventário | Requisitos de dados e layout pendentes de alinhamento | UX Research e especificação funcional na SPEC-001 | UX / Produto |

---

## 11. Tecnologias Intencionalmente NÃO Utilizadas

| Item | Motivo | Reavaliar quando |
|---|---|---|
| Frameworks CSS pesados (Bootstrap, etc.) | Tailwind CSS v4 já atende com melhor performance e consistência | Nunca para esta stack |
| Modificação direta sem SPEC | Violação do Universal SDD | Nunca |
