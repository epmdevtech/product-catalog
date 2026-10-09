# SPEC-001: Esqueleto da Aplicação e Tokens EPM DevTech

## Metadados

| Campo | Valor |
|---|---|
| ID | SPEC-001 |
| Status | Approved |
| Responsável | Engenharia & UX EPMDEVTECH |
| Revisores | Produto / Engenharia / QA |
| Criado | 2026-10-09 |
| Atualizado | 2026-10-09 |
| Lançamento alvo | v0.2.0 |
| Refs | `templates/spec.md`, `standards/coding.md`, `standards/design-system.md` |

---

## Problema e resultado

A EPM DevTech necessita de uma aplicação web dedicada para apresentação de planos e propostas comerciais (`planos.epmdevtech.com.br`) com simulador dinâmico por estrutura e calculadora de retorno para múltiplos nichos de negócio. 
O objetivo desta especificação é estabelecer o esqueleto base do frontend utilizando a stack homologada (Vite 5, React 18, TypeScript, Tailwind 3.4, shadcn/ui/Radix), integrando a identidade visual canônica da EPM DevTech (tokens CSS, paleta de cores teal/neutros, tipografia, raios de borda e logotipos oficiais).

---

## Escopo

### No escopo (In scope)
- Configuração do projeto com Vite 5, React 18, TypeScript e Tailwind CSS 3.4.
- Inclusão dos tokens semânticos e primitivas da EPM DevTech em `tailwind.config.ts` e `src/index.css`.
- Copiar e configurar os logotipos oficiais (`public/logo-*.webp`, `public/logo-*.svg`).
- Configuração de path aliases `@/` apontando para `src/`.
- Estruturação de diretórios da aplicação (`src/components`, `src/sections`, `src/lib`, `src/data`, `src/types`).
- Teste de sanidade com Vitest.

### Fora do escopo (Out of scope)
- Regras de negócio de nichos específicos (será SPEC-004).
- Componentes da interface do simulador e planos (será SPEC-005 e SPEC-006).
- Docker e CI/CD (será SPEC-002 e SPEC-003).

---

## Critérios de Aceitação

### AC-001: Compilação e execução limpa do esqueleto
```gherkin
Dado o ambiente com dependências instaladas
Quando executado o comando de build `npm run build`
Então a compilação TypeScript e o bundle do Vite devem concluir com código de saída 0 sem erros.
```

### AC-002: Disponibilidade dos tokens e estilos da EPM DevTech
```gherkin
Dado o arquivo `src/index.css` e `tailwind.config.ts`
Quando inspecionados os estilos da aplicação
Então as classes de utilitário (ex: `bg-background`, `text-primary`, `bg-brand`) e variáveis `--brand`, `--bg-base`, `--radius` devem estar ativas e em conformidade com o design system da EPM DevTech.
```

### AC-003: Execução de testes automatizados com Vitest
```gherkin
Dado o ambiente de testes configurado
Quando executado `npm run test`
Então a suíte do Vitest deve inicializar e passar com sucesso.
```
