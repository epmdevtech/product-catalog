# TASK-007-01: Seções Incluso vs Extra, Segurança, FAQ Accordion, Contrato e Rodapé CTA

## Metadados

| Campo | Valor |
|---|---|
| ID | TASK-007-01 |
| Status | Completed |
| SPEC | `SPEC-007` |
| Responsável | Engenharia de Front-end & UX EPMDEVTECH |
| Dependências | `TASK-006-01` |
| Critérios de Aceitação | AC-001, AC-002, AC-003, AC-004, AC-005, AC-006, AC-007 |

---

## Escopo da Tarefa

1. Criar componente `src/components/ui/accordion.tsx` utilizando `@radix-ui/react-accordion`.
2. Criar `src/sections/IncludedVsExtraSection.tsx` comparando Implantação, Mensalidade e Orçamento Adicional (integrando `niche.extrasOrcamento`).
3. Criar `src/sections/SecuritySection.tsx` renderizando os dados de `niche.seguranca`.
4. Criar `src/sections/FaqSection.tsx` combinando `faqBase` com `niche.faq` no Accordion.
5. Criar `src/sections/ContractTermsSection.tsx` exibindo os 4 pilares de `niche.contrato` com aviso de referência e comentário TODO.
6. Criar `src/sections/FinalCtaSection.tsx` com botões WhatsApp/E-mail.
7. Criar `src/components/layout/Footer.tsx` com aviso obrigatório de valores de referência, dados institucionais da EPM DevTech e links.
8. Integrar todas as seções no `src/App.tsx`.
9. Validar suíte de testes com Vitest (`nicheWordsGuard.test.ts`) e `npm run build`.
