# TASK-010-01: Foco Exclusivo no Nicho de Odontologia na Etapa Inicial

## Metadados

| Campo | Valor |
|---|---|
| ID | TASK-010-01 |
| Status | Completed |
| SPEC | `SPEC-010` |
| Responsável | Engenharia de Front-end & UX EPMDEVTECH |
| Dependências | `TASK-009-01` |
| Critérios de Aceitação | AC-001, AC-002, AC-003, AC-004, AC-005, AC-006, AC-007 |

---

## Escopo da Tarefa

1. Excluir os arquivos de nichos secundários:
   - `src/data/niches/advocacia.ts`
   - `src/data/niches/barbearia.ts`
2. Excluir as propostas nominais correspondentes:
   - `src/data/proposals/silva-santos-adv-w3n8p2jx.json`
   - `src/data/proposals/imperio-barber-m4b9q1rt.json`
3. Refatorar `src/data/niches/index.ts` para carregar e validar exclusivamente `odontologia`.
4. Atualizar `scripts/new-proposal.ts` para restringir e pré-definir o nicho `odontologia`.
5. Ajustar placeholders e textos no gerador de slugs em `src/pages/InternalDevPage.tsx`.
6. Validar a integridade da rota `/`, `/odontologia` e `/proposta/sorriso-prime-k7x2m9qf`.
7. Executar testes automatizados (`npm test`) e verificar conformidade com a Regra de Ouro.
8. Executar verificação de build de produção (`npm run build`).
9. Atualizar matriz de rastreabilidade e `PROJECT.md`.
