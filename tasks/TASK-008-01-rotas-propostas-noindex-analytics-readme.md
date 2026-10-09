# TASK-008-01: Rotas, Propostas Personalizadas, Noindex, Analytics e Documentação

## Metadados

| Campo | Valor |
|---|---|
| ID | TASK-008-01 |
| Status | Completed |
| SPEC | `SPEC-008` |
| Responsável | Engenharia de Front-end & UX EPMDEVTECH |
| Dependências | `TASK-007-01` |
| Critérios de Aceitação | AC-001, AC-002, AC-003, AC-004, AC-005, AC-006, AC-007, AC-008 |

---

## Escopo da Tarefa

1. Criar `src/data/proposals.ts` com validação Zod e registros de exemplo para odontologia, advocacia e barbearia.
2. Criar `src/components/proposal/ProposalBanner.tsx` para apresentar os detalhes da proposta personalizada.
3. Criar páginas:
   - `src/pages/HomePage.tsx`: Seletor interno de nichos e propostas da EPM DevTech.
   - `src/pages/NichePage.tsx`: Renderizador da página comercial com simulador para o nicho selecionado.
   - `src/pages/ProposalPage.tsx`: Renderizador da proposta personalizada com banner e estado pré-configurado.
4. Atualizar `src/App.tsx` com `BrowserRouter`, rotas e os componentes `<Analytics />` e `<SpeedInsights />`.
5. Configurar `public/robots.txt` e `vercel.json` para desindexação global e roteamento SPA.
6. Atualizar `README.md` com o guia completo de arquitetura, novos nichos, propostas e deploy.
7. Validar testes com Vitest (`nicheWordsGuard.test.ts`) e compilação do Vite (`npm run build`).
