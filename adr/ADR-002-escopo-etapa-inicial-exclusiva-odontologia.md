# ADR-002: Foco Exclusivo no Nicho de Odontologia na Etapa Inicial

## Metadados

| Campo | Valor |
|---|---|
| Status | Accepted |
| Data | 2026-10-09 |
| Responsáveis | Engenharia & Produto EPMDEVTECH |
| SPEC relacionada | `SPEC-010` |
| Substitui/substituída por | N/A |

---

## Contexto

A plataforma de planos e propostas da EPM DevTech foi concebida com arquitetura multinicho orientada a dados (Data-Driven Multiniche Architecture). Inicialmente, três nichos pilotos foram prototipados: odontologia, advocacia e barbearia.

Para o go-to-market e validação comercial desta etapa inicial, a liderança de produto definiu focar todos os esforços operacionais e de vendas exclusivamente no segmento de **Odontologia** (clínicas odontológicas e dentistas autônomos).

Adicionalmente, conforme validado com o solicitante:
1. A rota raiz `/` permanece neutra (logo EPM DevTech e frase de orientação privada) para preservar o sigilo das propostas enviadas aos clientes.
2. A demonstração/catálogo comercial de Odontologia fica acessível em `/odontologia` e as propostas comerciais nominais em `/proposta/:slug-odonto`.
3. Os nichos secundários (Advocacia e Barbearia) e suas propostas piloto devem ser integralmente removidos da base de código ativa nesta etapa para manter o repositório enxuto e livre de dados não utilizados.

## Drivers da decisão

- **Foco de Mercado (GTM Inicial):** Concentração absoluta na experiência, tom de voz, regras de segurança (CFO/CRO) e calculadora de retorno para clínicas odontológicas.
- **Simplicidade Operacional:** Eliminação de ruído, arquivos desnecessários e propostas pilotos não operacionais no repositório de produção.
- **Preservação Arquitetural:** Manter a fundação agnóstica (`_template.ts`, schemas Zod, `NicheConfig`, Guard de palavras proibidas e separação de dados) intacta, permitindo reintroduzir novos nichos no futuro em minutos sem tocar nos componentes centrais.

## Alternativas consideradas

### Alternativa A: Manter os nichos no código, mas ocultar visualmente
- *Benefícios:* Menor número de arquivos removidos.
- *Custos e riscos:* Arquivos desnecessários no repositório, possibilidade de vazamento de slugs ou rotas não pretendidas no build de produção.

### Alternativa B: Remoção completa de Advocacia e Barbearia da etapa ativa (Escolhida)
- *Benefícios:*
  - Repositório 100% focado no nicho ativo (Odontologia).
  - Apenas arquivos JSON e configurações de Odontologia são processados e compilados.
  - Script gerador de propostas (`npm run proposta:nova`) restrito a Odontologia.
  - Preservação integral do contrato multinicho através de `src/data/niches/_template.ts`.
- *Custos e riscos:* Nenhum risco arquitetural, pois o desacoplamento já garante total independência entre os dados de nicho e os componentes do sistema.

## Decisão

Adotamos a **Alternativa B**:
1. Manter a rota raiz `/` estritamente neutra.
2. Manter a rota `/odontologia` como ponto de acesso ao simulador e catálogo do segmento odontológico.
3. Manter a rota `/proposta/:slug` com carregamento sob demanda para propostas do nicho odontológico (ex.: `sorriso-prime-k7x2m9qf.json`).
4. Excluir os arquivos `src/data/niches/advocacia.ts` e `src/data/niches/barbearia.ts`.
5. Excluir os arquivos de propostas piloto `silva-santos-adv-w3n8p2jx.json` e `imperio-barber-m4b9q1rt.json`.
6. Atualizar `src/data/niches/index.ts` e `scripts/new-proposal.ts` para registrar e operar exclusivamente com `odontologia`.

## Consequências

### Positivas
- Código ativo enxuto e estritamente alinhado com o nicho da fase atual.
- Bundle de produção ainda menor.
- Geração de novas propostas direcionada exclusivamente ao nicho ativo.
- Conformidade total com a governança Universal SDD.

### Negativas / Mitigações
- Para reintroduzir novos nichos no futuro, basta utilizar `src/data/niches/_template.ts` e registrá-los em `src/data/niches/index.ts`.
