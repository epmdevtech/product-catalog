# Roadmap do Projeto — Catálogo de Produtos

> **Framework de Governança**: Universal SDD (Spec-Driven Development)  
> **Status Vigente**: Fase 0 (Bootstrap e Inicialização SDD Concluídos)

O roadmap comunica a direção estratégica e os marcos de entrega do projeto. Nenhuma funcionalidade é implementada antes da aprovação formal de sua respectiva especificação (SPEC) e tarefas associadas (TASK).

---

## 📌 Fase 0: Bootstrap e Adoção do Universal SDD (Concluído)

- [x] Cópia e estruturação da esteira Universal SDD (`agents/`, `workflows/`, `standards/`, `templates/`, `docs/`, `knowledge/`).
- [x] Configuração dos pontos de entrada de IA (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `COPILOT.md`).
- [x] Definição normativa do núcleo (`UNIVERSAL_SDD_FRAMEWORK.md`).
- [x] Elaboração do estado canônico inicial do projeto ([`PROJECT.md`](PROJECT.md)).
- [x] Estabelecimento da Base de Conhecimento inicial (`knowledge/modules/`).
- [x] Definição da matriz de rastreabilidade e scripts de auditoria (`scripts/generate_traceability.py`).

---

## 🚀 Fase 1: Discovery de Produto e UX Research

- [ ] Elaboração do UX Briefing com pesquisa de personas, público-alvo e requisitos do catálogo.
- [ ] Mapeamento das jornadas de usuário (busca, navegação por categoria, comparação e solicitação de orçamento/contato).
- [ ] Definição de taxonomia de categorias, atributos técnicos e variações de produto.
- [ ] Validação humana e aprovação do Discovery.

---

## 📐 Fase 2: Arquitetura e Engenharia Base

- [ ] Definição de ADRs para a stack definitiva (React 19, TypeScript estrito, Vite, Tailwind CSS v4, Radix UI).
- [ ] Configuração do ambiente com `Makefile`, `package.json`, `tsconfig.json` e linters (`eslint.config.js`, `prettier`).
- [ ] Configuração dos Quality Gates automatizados e suíte de testes (Vitest + Playwright).
- [ ] Estruturação do repositório em camadas canônicas (`src/components`, `src/config`, `src/hooks`, `src/lib`, `src/types`).

---

## 🎨 Fase 3: Design System e UX/UI

- [ ] Criação dos tokens visuais de cores, tipografia, elevação e espaçamento em `src/styles.css`.
- [ ] Especificação e aprovação dos componentes atômicos: cards de produto, badges de status/preço, campos de busca, dropdowns de filtro, drawers de detalhe.
- [ ] Validação de contraste e conformidade com WCAG 2.1 AA.
- [ ] Aprovação humana do design antes de qualquer codificação de interface.

---

## 📦 Fase 4: Especificação e Implementação dos Módulos (SDD)

- [ ] **SPEC-001**: Catálogo Base, Vitrine e Listagem com Grid Responsivo.
- [ ] **SPEC-002**: Sistema de Filtros Avançados, Ordenação e Busca Instantânea.
- [ ] **SPEC-003**: Modal / Drawer de Detalhes Técnicos e Variações de Produto.
- [ ] **SPEC-004**: Conversão Comercial via WhatsApp com Mensagem Formatada e Deeplink.
- [ ] **SPEC-005**: Conformidade LGPD, Políticas de Privacidade e Termos de Uso.

---

## 🛡️ Fase 5: Quality Gates, QA e Release

- [ ] Execução da suíte de testes unitários (Vitest) e testes ponta a ponta (Playwright).
- [ ] Auditoria de acessibilidade automatizada e manual.
- [ ] Geração da matriz de rastreabilidade automatizada (`make check-traceability`).
- [ ] Publicação da release `v1.0.0` com notas de versão em `CHANGELOG.md`.
