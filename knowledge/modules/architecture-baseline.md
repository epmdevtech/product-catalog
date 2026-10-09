# Knowledge: Linha de Base da Arquitetura e Engenharia

## Metadados

| Campo | Valor |
|---|---|
| ID | KB-002 |
| Status | Validated |
| Responsável | Engenharia & Arquitetura EPMDEVTECH |
| Criado/revisado | 2026-10-09 |
| Aplicabilidade | Decisões técnicas, estrutura de código e esteira de CI/CD |
| Fontes | Padrões de engenharia EPMDEVTECH, Universal SDD |

---

## Contexto

Estabelece a arquitetura de software recomendada para o **Catálogo de Produtos** (`product-catalog`), definindo a separação de responsabilidades, ferramental de frontend e padrões de qualidade.

---

## Conhecimento Validado

### 1. Pilares da Arquitetura

1. **Component-Driven Development**: Componentes atômicos e compostos isolados, baseados em primitivas acessíveis (Radix UI) e estilizados exclusivamente com Tailwind CSS v4.
2. **Zero Invenção de Requisitos**: Nenhuma feature é implementada sem especificação aprovada em `specs/`.
3. **Tipagem Estrita**: TypeScript configurado com `strict: true`, proibindo `any` implícito.
4. **Resiliência e Acessibilidade**: Todas as interfaces devem atender às diretrizes WCAG 2.1 AA (contraste, foco por teclado e atributos ARIA).

### 2. Estrutura Canônica da Aplicação (`src/`)

```text
src/
├── assets/          # Ícones, ilustrações e mídias estáticas
├── components/      # Componentes visuais
│   ├── catalog/     # Grid de produtos, filtros, cards, drawer de detalhes
│   ├── layout/      # Header, navegação, footer institucional
│   └── ui/          # Primitivas de UI (botões, inputs, modais, badges)
├── config/          # Configuração canônica do catálogo (dados mock/iniciais, temas)
│   └── catalog.ts
├── hooks/           # Hooks utilitários (debounce de busca, use-mobile, etc.)
├── lib/             # Helpers puros (formatação de moeda, manipulação de url)
├── types/           # Definições de tipos TypeScript do domínio
└── styles.css       # Tailwind CSS v4 e tokens de design system
```

### 3. Automação e Comandos Unificados (`Makefile`)

- `make dev`: Inicia o servidor local de desenvolvimento.
- `make build`: Executa compilação de produção.
- `make lint`: Executa checagem do ESLint e TypeScript sem emitir arquivos (`tsc --noEmit`).
- `make format`: Formatação via Prettier.
- `make test`: Bateria de testes unitários com Vitest.
- `make test-e2e`: Testes ponta a ponta com Playwright.
- `make check`: Roda todos os quality gates (format + lint + test + build).

---

## Revisão

- **Próxima revisão**: Na definição do build tool e primeira SPEC.
- **Substitui/substituída por**: Versão inicial canônica.
