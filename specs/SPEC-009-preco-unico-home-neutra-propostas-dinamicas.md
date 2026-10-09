# SPEC-009: Preço Único por Estrutura, Home Neutra e Propostas Dinâmicas sob Demanda

## Metadados

| Campo | Valor |
|---|---|
| ID | SPEC-009 |
| Título | Preço Único por Estrutura, Home Neutra e Propostas Dinâmicas sob Demanda |
| Status | Approved |
| Autor | Engenharia de Front-end & UX EPMDEVTECH |
| Data de Criação | 2026-10-09 |
| Escopo | `src/data/pricing.ts`, `src/types/niche.ts`, `src/data/niches/`, `src/lib/pricing.ts`, `src/pages/HomePage.tsx`, `src/pages/InternalDevPage.tsx`, `src/pages/ProposalPage.tsx`, `src/data/proposals/`, `scripts/new-proposal.ts`, `src/App.tsx`, `README.md` |

---

## 1. Contexto e Motivação

O produto comercial entregue pela EPM DevTech (Site Institucional Premium + EPM Booking + sustentação em nuvem) possui exatamente a mesma política de precificação para todos os nichos de mercado atendidos. O nicho customiza apenas o vocabulário, termos gramaticais, garantias de segurança, FAQ e parâmetros da calculadora de retorno (ticket médio e volume estimado).

Além disso, por questões de confidencialidade comercial:
1. A rota `/` não deve expor a terceiros nenhum dado comercial, catálogo de segmentos ou nomes de clientes. Em produção, deve apresentar uma tela pública neutra instruindo o visitante a acessar pelo link privado de sua proposta.
2. A listagem interna de nichos e propostas deve existir exclusivamente no ambiente de desenvolvimento local (`/interno`, condicionado a `import.meta.env.DEV`), sendo eliminada do bundle final de produção.
3. As propostas nominais devem possuir slugs impossíveis de adivinhar (`{nome-curto}-{token}` com token aleatório de 8 caracteres `[a-z0-9]`), e seus dados devem ser carregados sob demanda como módulos JSON isolados em `src/data/proposals/`, garantindo que o bundle JavaScript principal não contenha informações de clientes.

---

## 2. Requisitos e Regras de Negócio

### 2.1 Tabela de Preço Única (`src/data/pricing.ts`)
1. Centralizar em `src/data/pricing.ts` a tabela canônica de preços:
   - `solo` (1 profissional, 1 unidade): Implantação R$ 3.490 / Mensalidade R$ 169
   - `pequena` (2 a 4 profissionais, 1 unidade): Implantação R$ 4.990 / Mensalidade R$ 249
   - `media` (5 a 10 profissionais, 1 unidade): Implantação R$ 6.990 / Mensalidade R$ 329
   - `multiunidade` (2 unidades, até 15 profissionais): Implantação R$ 8.990 / Mensalidade R$ 349
   - `essencial` (somente site, sem agendamento): Implantação R$ 3.490 / Mensalidade R$ 149
   - `adicionalProfissionalMensal` (excedente do perfil): + R$ 29/mês
   - `adicionalUnidadeImplantacao` (além de 2 unidades): + R$ 1.500 (implantação única)
   - `adicionalUnidadeMensal` (além de 2 unidades): + R$ 79/mês
   - `lembretesWhatsAppMensal` (add-on de automação): + R$ 119/mês
   - `horaTecnicaAdicional`: R$ 180/hora
2. Remover o campo `pricing` de `NicheConfigSchema` e de todos os arquivos de nicho (`odontologia.ts`, `advocacia.ts`, `barbearia.ts`, `_template.ts`).
3. Manter em `NicheConfig.retorno` apenas os parâmetros conceituais da calculadora: `ticketMedioPadrao`, `atendimentosRecuperadosPadrao` e `rotuloAtendimento`.
4. As funções de `src/lib/pricing.ts` devem consumir diretamente `pricingTable`, removendo o parâmetro de nicho.

### 2.2 Página Inicial Neutra (`src/pages/HomePage.tsx`)
1. Em produção, a rota `/` deve renderizar exclusivamente:
   - Logo oficial da EPM DevTech (adaptativo light/dark).
   - Mensagem centralizada e discreta: *"Acesse esta página pelo link da sua proposta."*
   - Zero links de navegação, zero menções a nichos, zero listagens de clientes ou propostas.
2. Manter a rota `/:nicho` ativa para demonstrações enviadas diretamente, sem qualquer link exposto na interface pública. Slugs inválidos são redirecionados para `/`.

### 2.3 Painel Interno em Desenvolvimento (`/interno`)
1. Criar componente `src/pages/InternalDevPage.tsx` com o painel de desenvolvimento interno (listagem de nichos, propostas ativas e gerador de slugs/links).
2. No `src/App.tsx`, a rota `/interno` só deve ser montada se `import.meta.env.DEV` for verdadeiro.
3. No build de produção (`npm run build`), o código do painel não deve fazer parte do pacote principal.

### 2.4 Slugs Aleatórios e Carregamento Dinâmico de Propostas
1. Padrão do slug: `{nome-curto}-{token}`, onde `{token}` é gerado com 8 caracteres hexadecimais aleatórios (`crypto.randomBytes(4).toString('hex')`).
2. Cada proposta é armazenada em um arquivo JSON individual em `src/data/proposals/${slug}.json`.
3. Na rota `/proposta/:slug`, carregar dinamicamente o arquivo correspondente via função `loadProposal(slug)`.
4. Caso o arquivo não exista ou o slug seja inválido, redirecionar silenciosamente para `/` (página neutra), sem mensagem de erro que confirme ou negue a existência da proposta.
5. Criar script `scripts/new-proposal.ts` acionado via `npm run proposta:nova` para criar novas propostas gerando o token e gravando o JSON individual.

---

## 3. Critérios de Aceitação

- [ ] **AC-001 (Preço Único)**: `src/data/pricing.ts` criado com a tabela oficial. Campo `pricing` removido de `NicheConfig` e dos arquivos em `src/data/niches/`.
- [ ] **AC-002 (Funções de Pricing)**: Funções em `src/lib/pricing.ts` consomem a tabela única sem exigir parâmetro de nicho.
- [ ] **AC-003 (Página Neutra)**: A rota `/` exibe apenas o logo da EPM DevTech e a frase neutra, sem links nem listagem de segmentos.
- [ ] **AC-004 (Painel /interno DEV-only)**: A rota `/interno` funciona apenas em ambiente de desenvolvimento (`import.meta.env.DEV`) e não está presente no build de produção.
- [ ] **AC-005 (Slugs Imprevisíveis & JSON Isolados)**: Propostas salvas em arquivos JSON individuais em `src/data/proposals/` com formato `{nome-curto}-{token8}` e carregadas dinamicamente sob demanda.
- [ ] **AC-006 (Script de Nova Proposta)**: `npm run proposta:nova` gera o slug com token criptográfico e cria o arquivo JSON da proposta.
- [ ] **AC-007 (Bundle Limpo de Dados de Clientes)**: Build de produção verificado: nenhum nome de cliente de exemplo está presente no bundle principal `dist/assets/index-*.js`.
- [ ] **AC-008 (Testes e Regra de Ouro)**: Testes do Vitest atualizados e aprovados com 100% de sucesso, incluindo o teste de palavras proibidas `nicheWordsGuard.test.ts`.
