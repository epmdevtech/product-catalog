# SPEC-011: Centralização de Dados de Contato e Ajustes de Rodapé

## Metadados

| Campo | Valor |
|---|---|
| ID | SPEC-011 |
| Título | Centralização de Dados de Contato e Ajustes de Rodapé |
| Status | Approved |
| Autor | Engenharia de Front-end & UX EPMDEVTECH |
| Data de Criação | 2026-10-09 |
| Escopo | `src/data/contact.ts`, `src/components/layout/Footer.tsx`, `src/sections/FinalCtaSection.tsx`, `src/sections/SimulatorSection.tsx`, `src/components/layout/Header.tsx` |

---

## 1. Contexto e Motivação

Os canais de atendimento e conversão comercial direta da EPM DevTech (WhatsApp e e-mail) estavam com números e e-mails de placeholder espalhados de forma descentralizada em múltiplos componentes (`Header.tsx`, `SimulatorSection.tsx`, `FinalCtaSection.tsx`, `Footer.tsx`).

Adicionalmente, no rodapé (`Footer.tsx`), havia o texto informal *"Desenvolvido com [coração] pela EPM"*, que não condiz com o posicionamento institucional B2B sóbrio da empresa.

Faz-se necessária a centralização dos dados de contato oficiais em um módulo canônico (`src/data/contact.ts`), a atualização do número de WhatsApp para `45 999178290`, do e-mail para `elessandro@epmdevtech.com.br`, e a remoção da menção com ícone de coração no rodapé.

---

## 2. Requisitos e Regras de Negócio

### 2.1 Centralização de Contatos (`src/data/contact.ts`)
1. Criar `src/data/contact.ts` contendo:
   - `whatsappNumber`: `"5545999178290"`
   - `whatsappFormatted`: `"(45) 99917-8290"`
   - `email`: `"elessandro@epmdevtech.com.br"`
   - Função utilitária `getWhatsAppUrl(text?: string): string` que monta o link canônico `https://wa.me/5545999178290?text=...`.

### 2.2 Atualização dos Pontos de Conversão
1. **`FinalCtaSection.tsx`**:
   - Botão de WhatsApp direciona para `getWhatsAppUrl(niche.whatsappMensagemTemplate)`.
   - Botão de E-mail direciona para `mailto:elessandro@epmdevtech.com.br`.
2. **`SimulatorSection.tsx`**:
   - Envio da simulação por WhatsApp direciona para `getWhatsAppUrl(gerarMensagemWhatsApp())`.
3. **`Header.tsx`**:
   - Botão de atendimento rápido direciona para `getWhatsAppUrl("Olá! Estou na página de propostas da EPM DevTech e gostaria de tirar uma dúvida.")`.

### 2.3 Ajustes no Rodapé (`Footer.tsx`)
1. Atualizar e-mail de contato oficial para `elessandro@epmdevtech.com.br`.
2. Incluir contato direto de WhatsApp `(45) 99917-8290` no bloco de Atendimento & Suporte.
3. Remover a mensagem *"Desenvolvido com [coração] pela EPM"* e o respectivo ícone `Heart`, mantendo apenas o copyright e os links de Privacidade & SLA.

---

## 3. Critérios de Aceitação

- [ ] **AC-001 (Módulo Central de Contato)**: `src/data/contact.ts` criado com número `5545999178290`, e-mail `elessandro@epmdevtech.com.br` e função geradora de URL.
- [ ] **AC-002 (Remoção da Frase no Rodapé)**: Texto *"Desenvolvido com coração pela EPM"* e ícone `Heart` removidos de `Footer.tsx`.
- [ ] **AC-003 (E-mail Atualizado)**: `Footer.tsx` e `FinalCtaSection.tsx` utilizam `elessandro@epmdevtech.com.br`.
- [ ] **AC-004 (WhatsApp Unificado)**: Todos os botões e CTAs de WhatsApp (`Header`, `SimulatorSection`, `FinalCtaSection`, `Footer`) utilizam o número `5545999178290`.
- [ ] **AC-005 (Qualidade & Build)**: Testes Vitest e build de produção executados com 100% de sucesso.
