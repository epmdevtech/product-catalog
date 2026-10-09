# Catálogo de Produtos (Product Catalog)

> 🚧 **Status do Projeto:** Fase 0 — Bootstrap e Inicialização Concluídos (Pronto para SDD)  
> **Governança:** Universal SDD (Spec-Driven Development)  
> **Organização:** EPMDEVTECH Clientes  

Aplicação de alta performance para apresentação interativa de catálogo de produtos, desenvolvida com foco em conversão comercial, experiência do usuário (UX), acessibilidade (WCAG 2.1 AA) e governança rigorosa orientada a especificações.

---

## 🎯 O que é o Projeto?

O **Product Catalog** é uma solução voltada para exibição organizada e atraente de produtos, coleções e inventários comerciais, permitindo:

- Navegação rápida por categorias e subcategorias.
- Busca textual inteligente com filtros dinâmicos por atributos, variações e faixas de preço.
- Visualização detalhada de especificações técnicas e galerias de imagens em alta resolução.
- Integração de conversão direta com canais de atendimento (ex: links otimizados para WhatsApp).
- Conformidade total com a Lei Geral de Proteção de Dados (LGPD).

---

## 🛡️ Governança: Universal SDD

Este projeto adota o **Universal SDD (USF)** como metodologia mandatória de engenharia de software e colaboração entre humanos e agentes de Inteligência Artificial.

```text
Ideia
  ↓
Discovery de Produto e UX
  ↓
Arquitetura
  ↓
UX/UI Design
  ↓
Aprovação do Design
  ↓
SPEC Técnica e Funcional
  ↓
Aprovação Humana
  ↓
TASK
  ↓
Implementação
  ↓
QA Automatizado e Manual
  ↓
Design Review e Code Review
  ↓
Refatoração (se necessário)
  ↓
Documentação
  ↓
Release
```

### Princípios Inegociáveis

1. **A SPEC aprovada define o comportamento desejado da mudança.**
2. **O `PROJECT.md` registra o estado canônico do projeto.**
3. **Código e evidências de QA comprovam o comportamento entregue.**
4. **Toda implementação começa por uma SPEC.**
5. **Interfaces começam por discovery e design aprovados antes da codificação.**
6. **Toda SPEC precisa de aprovação humana prévia.**
7. **A IA implementa apenas o escopo aprovado.**
8. **Toda implementação deve passar pelos Quality Gates aplicáveis.**
9. **Mudanças de interface exigem revisão de design e acessibilidade.**
10. **A documentação evolui junto com o código.**

---

## 📁 Estrutura do Repositório

```text
product-catalog/
├── agents/             # Contratos operacionais dos papéis de IA
├── workflows/          # Workflows padronizados (feature.md, verification.md)
├── standards/          # Padrões de acessibilidade, testes, segurança e design system
├── templates/          # Modelos de SPEC, TASK, ADR, Review, QA e hooks
├── specs/              # Especificações funcionais e técnicas aprovadas
├── tasks/              # Tarefas rastreadas e vinculadas a SPECs
├── reviews/            # Pareceres de revisão de código, design e QA
├── adr/                # Registros de Decisões Arquiteturais
├── knowledge/          # Base de conhecimento modular (INDEX.md e modules/)
├── profiles/           # Perfis de projeto reutilizáveis
├── docs/               # Manuais, guias e rastreabilidade
├── scripts/            # Scripts utilitários (gerador de matriz de rastreabilidade)
├── PROJECT.md          # Estado canônico atual do projeto
├── AGENTS.md           # Protocolo comum para pessoas e agentes IA
├── CLAUDE.md           # Ponto de entrada para Claude
├── GEMINI.md           # Ponto de entrada para Gemini
├── COPILOT.md          # Ponto de entrada para GitHub Copilot
├── UNIVERSAL_SDD_FRAMEWORK.md # Definição normativa central do framework
├── ROADMAP.md          # Planejamento de marcos e entregas
├── CHANGELOG.md        # Histórico de versões
└── README.md           # Este documento
```

---

## 🤖 Operação com Agentes de IA

Ao interagir com agentes de inteligência artificial (Gemini, Claude, Copilot, ChatGPT, Cursor, Windsurf, etc.):

1. **Ordem de Leitura Obrigatória**:
   - Ler [`PROJECT.md`](PROJECT.md).
   - Ler [`AGENTS.md`](AGENTS.md).
   - Identificar o workflow ativo em `workflows/`.
   - Localizar a `SPEC` e a `TASK` aprovadas antes de iniciar qualquer código.
2. **Rastreabilidade**:
   - Todo commit deve conter os trailers:
     ```text
     Spec-Ref: SPEC-NNN
     Task-Ref: TASK-NNN-XX
     ```
3. **Quality Gates**:
   - Verificar linting, tipagem, testes unitários, testes E2E e compilação limpa.

---

## 🚦 Próximos Passos (Próxima Fase)

Conforme o [`ROADMAP.md`](ROADMAP.md), o projeto encontra-se pronto para:

1. **Discovery de Produto e UX Research**: Mapeamento de personas, catálogo e jornada de compra.
2. **Definição de Arquitetura**: Elaboração de ADRs para a stack definitiva e estruturação de `src/`.
3. **Elaboração da SPEC-001**: Especificação formal da vitrine inicial de produtos.

---

## 👨‍💻 Autor & Direitos

**Elessandro Prestes Macedo**  
Software Engineer — EPMDEVTECH  
Criador do Universal SDD Framework
