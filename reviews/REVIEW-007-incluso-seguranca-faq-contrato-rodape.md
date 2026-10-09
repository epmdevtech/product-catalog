# REVIEW-007: Seções Incluso vs Extra, Segurança, FAQ Accordion, Contrato e Rodapé CTA

## Metadados

| Campo | Valor |
|---|---|
| ID | REVIEW-007 |
| SPEC | `SPEC-007` |
| TASK | `TASK-007-01` |
| Data | 2026-10-09 |
| Resultado | Aprovado |

---

## 1. Verificações de Aceitação

- [x] **AC-001 (Incluso vs Extra)**: Seção `IncludedVsExtraSection` estruturada em 3 blocos comparativos (Implantação, Mensalidade, Orçamento Sob Demanda), agregando os itens específicos de `niche.extrasOrcamento` de forma reativa e limpa.
- [x] **AC-002 (Segurança & LGPD)**: Seção `SecuritySection` consumindo os itens parametrizados de `niche.seguranca.itens` e o texto de sigilo `niche.seguranca.textoTratamentoDados`.
- [x] **AC-003 (FAQ Accordion)**: Componente `src/components/ui/accordion.tsx` implementado via `@radix-ui/react-accordion` com animações suaves e total acessibilidade. `FaqSection` combina as 7 perguntas de `src/data/faqBase.ts` com as dúvidas do nicho.
- [x] **AC-004 (Contrato & Compromisso)**: Seção `ContractTermsSection` apresenta os 4 pilares contratuais de `niche.contrato` (prazo mínimo, cancelamento, titularidade de domínio/dados e publicação). Contém comentário `// TODO: Revisão jurídica final das cláusulas contratuais` e nota de referência.
- [x] **AC-005 (Rodapé & CTA)**: Seções `FinalCtaSection` e `Footer` criadas. CTA com tracking de eventos no WhatsApp e e-mail. Rodapé com a frase obrigatória em destaque: *"Valores de referência, sujeitos a ajuste conforme o escopo de cada projeto."*, dados institucionais da EPM DevTech e logos responsivos.
- [x] **AC-006 (Regra de Ouro)**: Teste automatizado `nicheWordsGuard.test.ts` executado e aprovado com 0 violações em `src/components`, `src/sections` e `src/lib`.
- [x] **AC-007 (Compilação & Tipagem)**: `npm run build` executado com código de saída 0 e 100% de conformidade com TypeScript strict.
