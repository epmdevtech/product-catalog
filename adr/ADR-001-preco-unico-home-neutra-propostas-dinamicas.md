# ADR-001: Preço Único por Estrutura, Página Inicial Neutra e Propostas Dinâmicas sob Demanda

## Metadados

| Campo | Valor |
|---|---|
| Status | Accepted |
| Data | 2026-10-09 |
| Responsáveis | Engenharia & Produto EPMDEVTECH |
| SPEC relacionada | `SPEC-009` |
| Substitui/substituída por | N/A |

---

## Contexto

A plataforma de propostas da EPM DevTech foi concebida para atender múltiplos nichos (odontologia, advocacia, barbearia, etc.). No modelo anterior:
1. Os preços estavam acoplados a cada nicho em `src/data/niches/*.ts`, duplicando valores que na verdade são idênticos, visto que o produto comercial entregue (Site Premium + EPM Booking + sustentação em nuvem) possui a mesma tabela de precificação base para qualquer segmento.
2. A rota `/` expunha publicamente a lista de segmentos e as propostas ativas dos clientes, quebrando o sigilo comercial dos orçamentos enviados por WhatsApp.
3. As propostas nominais estavam consolidadas em um array estático em `src/data/proposals.ts`, fazendo com que os nomes, valores e dados comerciais de todos os clientes fossem embutidos no bundle JavaScript principal entregue a qualquer visitante.

## Drivers da decisão

- **Centralização Comercial:** O valor da implantação e mensalidade depende exclusivamente da infraestrutura (número de profissionais e unidades), não do nicho.
- **Sigilo Comercial & Segurança por Design:** Nenhum lead ou terceiro deve conseguir visualizar propostas de outros clientes nem a listagem de clientes ativos.
- **Prevenção de Enumeração:** Slugs de proposta devem ser imprevisíveis (utilizando hash/token aleatório de 8 caracteres).
- **Separação de Bundles (Code Splitting):** O bundle principal de produção não pode conter nomes de clientes nem valores de propostas nominais.

## Alternativas consideradas

### Alternativa A: Manter preços por nicho e proteger a rota "/" com senha
- *Benefícios:* Poucas mudanças no código.
- *Custos e riscos:* Exige infraestrutura de autenticação/sessão em um projeto estático hospedado na Vercel; clientes que inspecionassem o bundle JavaScript ainda teriam acesso aos dados de outros clientes compilados no código.

### Alternativa B: Preço único centralizado, Home neutra, rota interna apenas em DEV e propostas carregadas dinamicamente via JSON sob demanda (Escolhida)
- *Benefícios:* 
  - Tabela de preços única e editável em um único arquivo (`src/data/pricing.ts`).
  - Rota `/` 100% neutra em produção, sem links nem pistas de outros segmentos.
  - Rota `/interno` existente estritamente durante o desenvolvimento (`import.meta.env.DEV`).
  - Propostas isoladas em arquivos JSON individuais em `src/data/proposals/*.json` com slugs aleatórios (`{nome-curto}-{token}`), carregadas sob demanda e ausentes do bundle principal.
  - Slugs inválidos silenciosamente redirecionam para `/`.
- *Custos e riscos:* Refatoração das assinaturas de cálculo de preço e migração do carregamento síncrono para assíncrono na rota `/proposta/:slug`.

## Decisão

Adotamos a **Alternativa B**:
1. Criar `src/data/pricing.ts` como fonte única da verdade para precificação e remover o campo `pricing` de `NicheConfig` e de todos os nichos.
2. Transformar a rota `/` em uma página pública neutra contendo apenas a marca EPM DevTech e a mensagem orientando o acesso pelo link recebido.
3. Habilitar a rota `/interno` exclusivamente no ambiente de desenvolvimento (`import.meta.env.DEV`), eliminando-a do build de produção.
4. Migrar propostas para arquivos JSON individuais em `src/data/proposals/` com slugs do tipo `{nome-curto}-{token8}`, carregadas dinamicamente sob demanda.
5. Criar script utilitário `scripts/new-proposal.ts` (`npm run proposta:nova`) para geração de novas propostas com tokens criptograficamente aleatórios.

## Consequências

### Positivas
- Manutenção de preços centralizada e imediata.
- Sigilo absoluto dos clientes e propostas comerciais em produção.
- Bundle principal enxuto e livre de dados de clientes.
- Conformidade reforçada com LGPD e confidencialidade B2B.

### Negativas e riscos
- Rota `/proposta/:slug` passa a ter um breve estado de carregamento assíncrono para buscar o JSON individual.

## Implementação e migração

- Compatibilidade: Total compatibilidade com o motor de simulação e componentes visuais.
- Rollback: Reversão via Git branch `develop`.
- Observabilidade: Eventos de telemetria continuam ativos.

## Evidências e validação

- Teste Vitest `nicheWordsGuard.test.ts` sem violações.
- Testes unitários de precificação cobrindo a nova tabela única.
- Inspeção do bundle `dist/` comprovando ausência de dados de clientes no chunk principal e ausência da rota `/interno`.
