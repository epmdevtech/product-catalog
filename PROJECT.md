# PROJECT: EPM DevTech — Plataforma Multinicho de Planos & Propostas

## Metadados

| Campo | Valor |
|---|---|
| Nome do Projeto | EPM DevTech Planos (`epmdevtech-planos` / `product-catalog`) |
| Organização | EPMDEVTECH Clientes |
| Responsável | Engenharia & Produto EPMDEVTECH |
| Estado | Produção / Implementação Concluída (Fases 1 a 5) |
| Versão ou release | `0.1.0` (Universal SDD Compliant) |
| Última revisão | 2026-10-09 |
| Framework de Governança | Universal SDD (Spec-Driven Development) |
| Revisores | Equipe Técnica EPMDEVTECH |

---

## 1. Visão Geral e Domínio

- **Problema e resultado principal**: Prover uma página de alta conversão comercial B2B para envio via WhatsApp para clientes que já assistiram a uma demonstração e solicitaram proposta formal. A plataforma calcula preços dinamicamente por estrutura (profissionais e unidades), simula ROI/payback, exibe planos, condições de pagamento, garantias de segurança, termos contratuais e propostas nominais personalizadas.
- **Usuários e partes interessadas**:
  - *Tomadores de Decisão (Profissionais Liberais e Donos de Negócios)*: Simulação transparente, visualização de retorno do investimento e contratação com condições facilitadas.
  - *Equipe Comercial / Consultores EPM DevTech*: Geração e envio de links de propostas nominais ou de páginas de nicho via WhatsApp.
  - *Engenheiros da EPM*: Manutenção desacoplada, adição de novos nichos em minutos via `_template.ts`, e garantia de zero palavras de nicho no código core.
- **Termos importantes do domínio**:
  - `Nicho / Segmento`: Especialidade do cliente (Odontologia, Advocacia, Barbearia, etc.), configurado em `src/data/niches/`.
  - `Plano`: Nível de serviço comercial (`Essencial`, `Pro`, `Multiunidade`).
  - `Implantação`: Taxa única de setup, design exclusivo e integração.
  - `Operação`: Mensalidade contínua de hospedagem em nuvem, SSL, backups e suporte.
  - `Proposta Personalizada`: Proposta nominal com dados do cliente e condições comerciais salvas.
  - `Regra de Ouro`: ZERO vocabulário de nicho em `src/components`, `src/sections` e `src/lib`.

---

## 2. Arquitetura

- **Estilo e componentes**:
  - Arquitetura multinicho desacoplada por dados (Data-Driven Multiniche Architecture).
  - Componentes limpos e estritamente agnósticos em `src/components/` e `src/sections/`.
  - Motor funcional puro de precificação e ROI em `src/lib/pricing.ts`.
  - Gestão de contexto reativo via `NicheContext` e hook `useNiche()`.
  - Roteamento SPA com `react-router-dom`: `/` (painel interno), `/:nicho` (página do nicho), `/proposta/:slug` (proposta nominal).
- **Segurança e Desindexação**:
  - Aplicação 100% noindex (`robots.txt`, cabeçalhos HTTP na Vercel e tags via `react-helmet-async`).
- **ADRs vigentes**: Consultar pasta `adr/`.

---

## 3. Stack Tecnológica Canônica

| Camada / Dependência | Versão | Finalidade | Fonte Canônica |
|---|---|---|---|
| **Linguagem** | TypeScript `5.7.3` | Tipagem estrita e segurança em tempo de compilação | `tsconfig.json` |
| **Framework Base** | React `18.3.1` (SWC) | Renderização reativa de interface | `package.json` |
| **Bundler / Dev Server**| Vite `5.4.14` | Build rápido e bundling de produção | `vite.config.ts` |
| **Roteamento** | React Router DOM `6.29.0` | Navegação cliente SPA | `src/App.tsx` |
| **Estilização** | Tailwind CSS `3.4.17` | Design tokens canônicos EPM DevTech (Teal #2DD4BF / Dark #0A0F10) | `tailwind.config.ts` |
| **Primitivas UI** | Radix UI | Acessibilidade nativa (Accordion, Slider, Switch, Badge) | `package.json` |
| **Ícones** | Lucide React `0.462.0` | Ícones vetoriais responsivos | `package.json` |
| **Animações** | Framer Motion `11.18.2` | Transições e microinterações suaves | `package.json` |
| **Gráficos** | Recharts `2.15.1` | Projeção financeira acumulada de 12 meses (ROI) | `package.json` |
| **Validação** | Zod `3.24.2` | Schemas em tempo de execução para nichos e propostas | `src/types/niche.ts` |
| **Testes Unitários** | Vitest `3.0.5` | Testes de precificação, ROI e teste guardião de palavras proibidas | `src/test/` |
| **Telemetria** | `@vercel/analytics` & `@vercel/speed-insights` | Rastreamento de conversão e métricas de desempenho | `src/App.tsx` |

---

## 4. Estrutura do Repositório

```text
product-catalog/
├── agents/             # Definição e contratos dos agentes IA (Universal SDD)
├── workflows/          # Workflows canônicos (feature, verification)
├── standards/          # Padrões normativos (UX, acessibilidade, testes, segurança, etc.)
├── templates/          # Modelos executáveis de SPECs, Tasks, ADRs, Reviews e QA
├── specs/              # Especificações técnicas e funcionais aprovadas (SPEC-001 a SPEC-008)
├── tasks/              # Tarefas rastreadas e vinculadas a SPECs (TASK-001-01 a TASK-008-01)
├── reviews/            # Registros de revisões formais de aprovação (REVIEW-001 a REVIEW-008)
├── adr/                # Registros de Decisões Arquiteturais (ADRs)
├── knowledge/          # Base de conhecimento modular do projeto
├── profiles/           # Perfis de projeto reutilizáveis
├── docs/               # Manuais, guias operacionais e matriz de rastreabilidade
├── scripts/            # Scripts utilitários (matriz de rastreabilidade)
├── src/                # Código-fonte da aplicação
│   ├── components/     # Componentes de interface agnósticos e acessíveis
│   ├── contexts/       # NicheContext para estado de precificação e nicho ativo
│   ├── data/           # Configurações de nicho, FAQ base e propostas nominais
│   ├── lib/            # Motor matemático de preços, parcelas e ROI
│   ├── pages/          # HomePage, NichePage e ProposalPage
│   ├── sections/       # Seções comerciais de apresentação da proposta
│   ├── types/          # Esquemas Zod e tipagem TypeScript estrita
│   └── test/           # Testes automatizados Vitest e guardião da Regra de Ouro
├── public/             # Arquivos públicos, logos EPM e robots.txt
├── vercel.json         # Configuração de deploy, noindex headers e SPA rewrite
├── Makefile            # Automação de comandos e quality gates
├── PROJECT.md          # Estado canônico do projeto (este arquivo)
├── AGENTS.md           # Protocolo de operação de pessoas e agentes IA
├── README.md           # Visão geral, guias passo a passo e documentação
└── UNIVERSAL_SDD_FRAMEWORK.md # Definição normativa do Universal SDD
```

---

## 5. Runtime e Comandos Canônicos

- **Instalação**: `npm install`
- **Desenvolvimento**: `npm run dev`
- **Testes Unitários & Regra de Ouro**: `npm run test`
- **Compilação e Verificação de Tipos**: `npm run build`
- **Docker**: `docker compose up -d --build` (porta 8080)

---

## 6. Governança e Rastreabilidade

Todas as entregas obedecem ao protocolo **Universal SDD**:
- `ADR-001`: Decisão arquitetural de Preço Único, Home Neutra e Propostas Dinâmicas sob Demanda
- `SPEC-001` / `TASK-001-01` / `REVIEW-001`: Estrutura inicial e Design Tokens EPM DevTech
- `SPEC-002` / `TASK-002-01` / `REVIEW-002`: Infraestrutura Docker e Nginx SPA
- `SPEC-003` / `TASK-003-01` / `REVIEW-003`: Pipeline CI/CD GitHub Actions
- `SPEC-004` / `TASK-004-01` / `REVIEW-004`: Arquitetura Multinicho, Pricing e Vitest Guard
- `SPEC-005` / `TASK-005-01` / `REVIEW-005`: Layout, Hero, Princípios e Simulador Interativo
- `SPEC-006` / `TASK-006-01` / `REVIEW-006`: Cards de Planos, Calculadora ROI e Formas de Pagamento
- `SPEC-007` / `TASK-007-01` / `REVIEW-007`: Incluso vs Extra, Segurança, FAQ Accordion, Contrato e Rodapé
- `SPEC-008` / `TASK-008-01` / `REVIEW-008`: Rotas, Propostas Nominais, Noindex, Analytics e Documentação
- `SPEC-009` / `TASK-009-01` / `REVIEW-009`: Preço Único, Home Neutra, Rota /interno DEV e Propostas Dinâmicas sob Demanda

---

© 2026 EPM DEVTECH. Todos os direitos reservados.
