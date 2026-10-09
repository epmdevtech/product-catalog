# SPEC-010: Foco Inicial Exclusivo no Nicho de Odontologia

## Metadados

| Campo | Valor |
|---|---|
| ID | SPEC-010 |
| Título | Foco Inicial Exclusivo no Nicho de Odontologia |
| Status | Approved |
| Autor | Engenharia de Front-end & UX EPMDEVTECH |
| Data de Criação | 2026-10-09 |
| Escopo | `src/data/niches/`, `src/data/proposals/`, `scripts/new-proposal.ts`, `src/pages/InternalDevPage.tsx`, `README.md` |
| ADR Vinculado | `ADR-002` |

---

## 1. Contexto e Motivação

Para otimizar o processo de validação comercial e go-to-market da EPM DevTech nesta primeira etapa de operação, a aplicação deve concentrar seu catálogo ativo exclusivamente no nicho de **Odontologia**.

A arquitetura core, o sistema de temas, a tabela única de preços (`src/data/pricing.ts`), a calculadora de retorno e o teste de segurança da Regra de Ouro permanecem rigorosamente agnósticos. Entretanto, os arquivos de configuração e propostas piloto dos nichos de advocacia e barbearia devem ser removidos do projeto ativo nesta etapa, mantendo o repositório conciso, seguro e 100% focado no público-alvo inicial.

---

## 2. Requisitos e Regras de Negócio

### 2.1 Catálogo Ativo de Nichos (`src/data/niches/`)
1. Remover os arquivos de nichos secundários:
   - `src/data/niches/advocacia.ts`
   - `src/data/niches/barbearia.ts`
2. Manter preservado o arquivo `src/data/niches/_template.ts` para garantir a capacidade de expansão futura conforme preconizado pela arquitetura multinicho.
3. Atualizar `src/data/niches/index.ts` para registrar exclusivamente o nicho `odontologia`.
4. Rota `/:nicho`:
   - `/odontologia`: Carrega o catálogo/simulador completo de Odontologia.
   - Qualquer outro valor de slug: Redireciona silenciosamente para `/` (página inicial neutra).

### 2.2 Propostas Ativas (`src/data/proposals/`)
1. Remover arquivos de propostas piloto dos nichos desativados:
   - `src/data/proposals/silva-santos-adv-w3n8p2jx.json`
   - `src/data/proposals/imperio-barber-m4b9q1rt.json`
2. Manter a proposta piloto do nicho de odontologia:
   - `src/data/proposals/sorriso-prime-k7x2m9qf.json`
3. A rota `/proposta/:slug` continua carregando dinamicamente o arquivo JSON sob demanda.

### 2.3 Script Gerador de Propostas (`scripts/new-proposal.ts`)
1. Restringir a criação de novas propostas para o nicho ativo `odontologia`.
2. O prompt de criação deve assumir automaticamente `odontologia` ou validar que apenas esse nicho é suportado na etapa atual.

### 2.4 Painel Interno DEV (`src/pages/InternalDevPage.tsx`)
1. No ambiente local de desenvolvimento (`/interno`), exibir apenas Odontologia e suas respectivas propostas ativas.
2. Manter placeholders e textos genéricos sem vazamento de vocabulário de outros nichos.

### 2.5 Regra de Ouro e Integridade de Testes
1. Todos os componentes em `src/components`, `src/sections` e `src/lib` continuam 100% livres de palavras de nicho.
2. O teste guardião `src/test/nicheWordsGuard.test.ts` deve continuar sendo executado com sucesso e mantendo a lista abrangente de palavras proibidas.

---

## 3. Critérios de Aceitação

- [ ] **AC-001 (Remoção de Nichos Secundários)**: Arquivos `advocacia.ts` e `barbearia.ts` removidos de `src/data/niches/`.
- [ ] **AC-002 (Preservação de Template)**: Arquivo `src/data/niches/_template.ts` mantido íntegro.
- [ ] **AC-003 (Registro Único em Index)**: `src/data/niches/index.ts` exporta e valida em runtime apenas o nicho `odontologia`.
- [ ] **AC-004 (Limpeza de Propostas)**: Arquivos de propostas de advocacia e barbearia removidos de `src/data/proposals/`. Proposta `sorriso-prime-k7x2m9qf.json` mantida ativa.
- [ ] **AC-005 (Script de Proposta)**: `scripts/new-proposal.ts` ajustado para o nicho `odontologia`.
- [ ] **AC-006 (Página Raiz Neutra)**: Rota `/` permanece neutra sem expor nichos ou nomes de clientes.
- [ ] **AC-007 (Qualidade e Testes)**: Suite de testes Vitest (`npm test`) e build de produção (`npm run build`) executados com sucesso (código 0).
