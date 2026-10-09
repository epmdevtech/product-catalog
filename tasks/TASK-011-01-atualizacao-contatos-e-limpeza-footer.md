# TASK-011-01: Centralização de Contatos e Ajustes no Rodapé

## Metadados

| Campo | Valor |
|---|---|
| ID | TASK-011-01 |
| Status | Completed |
| SPEC | `SPEC-011` |
| Responsável | Engenharia de Front-end & UX EPMDEVTECH |
| Dependências | `TASK-010-01` |
| Critérios de Aceitação | AC-001, AC-002, AC-003, AC-004, AC-005 |

---

## Escopo da Tarefa

1. Criar `src/data/contact.ts` centralizando WhatsApp e e-mail oficiais.
2. Atualizar `src/components/layout/Footer.tsx`:
   - Remover `Heart` e a frase *"Desenvolvido com coração pela EPM"*.
   - Atualizar e-mail e adicionar WhatsApp oficial no bloco de atendimento.
3. Atualizar `src/sections/FinalCtaSection.tsx` para usar os dados centrais de contato.
4. Atualizar `src/sections/SimulatorSection.tsx` para usar o link centralizado de WhatsApp.
5. Atualizar `src/components/layout/Header.tsx` para usar o link centralizado de WhatsApp.
6. Executar validação de testes e build.
7. Atualizar matriz de rastreabilidade e `PROJECT.md`.
