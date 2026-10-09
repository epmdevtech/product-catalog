# SPEC-007: Seções Incluso vs Extra, Segurança, FAQ Accordion, Contrato e Rodapé CTA

## Metadados

| Campo | Valor |
|---|---|
| ID | SPEC-007 |
| Título | Seções Incluso vs Extra, Segurança, FAQ Accordion, Contrato e Rodapé CTA |
| Status | Approved |
| Autor | Engenharia de Front-end & UX EPMDEVTECH |
| Data de Criação | 2026-10-09 |
| Escopo | `src/sections/IncludedVsExtraSection.tsx`, `src/sections/SecuritySection.tsx`, `src/sections/FaqSection.tsx`, `src/sections/ContractTermsSection.tsx`, `src/sections/FinalCtaSection.tsx`, `src/components/layout/Footer.tsx`, `src/components/ui/accordion.tsx` |

---

## 1. Contexto e Motivação

Após as seções de simulação, planos, ROI e pagamento, a página comercial B2B necessita sanar todas as dúvidas restantes do tomador de decisão, eliminar o risco percebido e fornecer garantias de segurança, infraestrutura e sustentação contratual:
- Delimitar com exatidão cirúrgica o que está coberto pela implantação (taxa única), pela mensalidade (manutenção/hospedagem) e o que exige orçamento adicional (`niche.extrasOrcamento`).
- Apresentar as diretrizes de segurança, isolamento e tratamento de dados específicos (`niche.seguranca`).
- Oferecer uma seção de FAQ com Accordion acessível unindo as dúvidas comuns (`faqBase`) e as objeções do nicho (`niche.faq`).
- Exibir os 4 compromissos contratuais de transparência (`niche.contrato`) com disclaimer jurídico.
- Rodapé institucional e fechamento com CTA final para WhatsApp e e-mail com a frase obrigatória de valores de referência.

---

## 2. Requisitos e Regras de Negócio

### 2.1 Incluso vs Cobrado à Parte (`IncludedVsExtraSection`)
1. Estrutura em 3 colunas ou blocos comparativos:
   - **Incluso na Implantação (único)**: Criação exclusiva, design responsivo, integração do motor de agendamento (se aplicável), testes de homologação, treinamento e publicação em produção.
   - **Incluso na Mensalidade (contínuo)**: Hospedagem em nuvem de alta disponibilidade, certificado SSL, backups diários, suporte técnico, sustentação e monitoramento contínuo.
   - **Cobrado à Parte / Orçamento Adicional**: Funcionalidades além do escopo inicial, customizações exclusivas de alta complexidade, múltiplos idiomas, sessões fotográficas profissionais, mais itens específicos listados em `niche.extrasOrcamento`.
2. Sem nenhuma palavra hardcoded de nicho.

### 2.2 Segurança e Infraestrutura (`SecuritySection`)
1. Apresentar os diferenciais técnicos da EPM DevTech (+9 anos de experiência em engenharia de software).
2. Itens dinâmicos vindos de `niche.seguranca.itens` e título de `niche.seguranca.titulo`.
3. Caixa de destaque de sigilo e tratamento de dados em `niche.seguranca.textoTratamento`.
4. Garantir que a titularidade de dados e domínio pertença integralmente ao cliente.

### 2.3 Perguntas Frequentes (`FaqSection`)
1. Implementar `src/components/ui/accordion.tsx` utilizando `@radix-ui/react-accordion`.
2. Mesclar as 7 objeções padrão de `src/data/faqBase.ts` com o array `niche.faq`.
3. Totalmente acessível com teclado (WAI-ARIA accordion pattern) e animações suaves.

### 2.4 Termos do Contrato e Compromisso (`ContractTermsSection`)
1. Renderizar os 4 pilares contratuais:
   - Prazo Mínimo (`niche.contrato.prazoMinimo`)
   - Cancelamento e Rescisão (`niche.contrato.cancelamento`)
   - Titularidade de Dados, Código e Domínio (`niche.contrato.titularidade`)
   - Publicação e Homologação (`niche.contrato.publicacao`)
2. Inserir comentário de código `// TODO: Revisão jurídica final das cláusulas contratuais` e badge/aviso visual sutil de referência jurídica.

### 2.5 Rodapé e Final CTA (`FinalCtaSection` & `Footer`)
1. CTA final chamando para iniciar o alinhamento comercial ou esclarecer dúvidas pelo WhatsApp.
2. Botão apontando para `https://wa.me/5511999999999?text=...` utilizando `encodeURIComponent(niche.whatsappMensagemTemplate)`.
3. E-mail de contato `contato@epmdevtech.com.br`.
4. Frase obrigatória em destaque: *"Valores de referência, sujeitos a ajuste conforme o escopo de cada projeto."*
5. Copyright EPM DevTech, anos de mercado (+9 anos), stack de infraestrutura e selos de conformidade.

---

## 3. Critérios de Aceitação

- [ ] **AC-001 (Incluso vs Extra)**: Seção exibe 3 blocos claros e renderiza itens de `niche.extrasOrcamento`.
- [ ] **AC-002 (Segurança)**: Seção consome `niche.seguranca.titulo`, `niche.seguranca.itens` e `niche.seguranca.textoTratamento`.
- [ ] **AC-003 (FAQ Accordion)**: Componente Radix Accordion funcional combinando `faqBase` e `niche.faq`.
- [ ] **AC-004 (Contrato)**: 4 blocos contratuais baseados em `niche.contrato` com comentário TODO e aviso informativo.
- [ ] **AC-005 (Rodapé e CTA)**: CTA com WhatsApp dinâmico, e-mail e frase obrigatória no rodapé.
- [ ] **AC-006 (Regra de Ouro)**: Teste `nicheWordsGuard.test.ts` passa com 0 erros.
- [ ] **AC-007 (Build)**: `npm run build` executa sem erros.
