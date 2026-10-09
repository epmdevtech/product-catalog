# EPM DevTech — Plataforma Multinicho de Planos & Propostas

> **Ambiente:** `planos.epmdevtech.com.br`  
> **Status:** Produção / Alta Conversão B2B  
> **Governança:** Universal SDD (Spec-Driven Development)  
> **Tecnologia:** Vite 5 • React 18 • TypeScript • Tailwind 3.4 • Radix UI • Framer Motion • Recharts

---

## 🎯 Sobre o Projeto

A **EPM DevTech** é uma software house com mais de 9 anos de mercado (PHP, Laravel, Node.js, React, AWS, Docker) que desenvolve e sustenta soluções digitais corporativas. Uma de suas principais ofertas é o combo **Site Institucional Premium + Agendamento Online Dedicado (EPM Booking)** para profissionais liberais e negócios de serviço no Brasil.

Esta plataforma comercial foi construída com foco exclusivo em propostas comerciais de alta conversão:
- **Público:** Leads qualificados que já assistiram a uma demonstração e solicitaram uma proposta formal.
- **Diferencial Comercial:** Não vendemos apenas "código de site" — entregamos infraestrutura em nuvem, agenda sem conflito de horários, backups diários, suporte técnico especializado, conformidade com a LGPD e responsabilidade técnica.
- **Página Inicial Neutra:** A rota raiz `/` não expõe links, nichos nem clientes. Em produção, exibe apenas a mensagem: *"Acesse esta página pelo link da sua proposta."*
- **Privacidade & Noindex:** 100% desindexada de buscadores (`robots.txt`, cabeçalhos HTTP na Vercel e meta tags).

---

## 🛡️ Regra de Ouro da Arquitetura Multinicho

> **ZERO TEXTO DE NICHO NO CÓDIGO CORE**  
> Nenhum componente, seção ou função utilitária em `src/components`, `src/sections` e `src/lib` pode conter termos específicos de nicho (ex.: *dentista, paciente, clínica, odontologia, advogado, escritório, barbeiro, barbearia*).

- Todo o vocabulário, termos gramaticais, textos e parâmetros de retorno provêm de `src/data/niches/*.ts`.
- Um teste automatizado no Vitest ([`nicheWordsGuard.test.ts`](src/test/nicheWordsGuard.test.ts)) varre recursivamente esses diretórios e **falha a esteira de CI/CD** caso qualquer termo proibido seja introduzido.
- **Isolamento de Contexto:** A página de um segmento nunca cita outro segmento (a proposta de um advogado nunca menciona clínicas ou barbearias).

---

## 🧮 Preço Único por Estrutura (`src/data/pricing.ts`)

O produto comercial possui exatamente a **mesma tabela de preços para todos os nichos de mercado**, editável em [`src/data/pricing.ts`](src/data/pricing.ts). O nicho controla apenas vocabulário, garantias de segurança, FAQ e padrões conceituais da calculadora de retorno.

A precificação é calculada estritamente em **dois blocos separados**:
1. **Implantação (taxa única de setup, design e entrega)**
2. **Operação (mensalidade contínua de hospedagem e sustentação)**

### Tabela Canônica de Preços
- **Solo** (1 profissional, 1 unidade): R$ 3.490 implantação / R$ 169/mês
- **Pequena** (2 a 4 profissionais, 1 unidade): R$ 4.990 implantação / R$ 249/mês
- **Média** (5 a 10 profissionais, 1 unidade): R$ 6.990 implantação / R$ 329/mês
- **Multiunidade** (2 unidades, até 15 profissionais): R$ 8.990 implantação / R$ 349/mês
- **Essencial** (apenas site institucional, sem agendamento): R$ 3.490 implantação / R$ 149/mês
- **Profissional adicional** acima do limite do perfil: + R$ 29/mês
- **Unidade adicional** além de 2: + R$ 1.500 implantação e + R$ 79/mês
- **Lembretes automáticos por WhatsApp** (add-on): + R$ 119/mês
- **Hora técnica adicional**: R$ 180/hora (informativo)

### Condições de Pagamento da Implantação
- *Entrada e Saldo:* 50% na contratação e 50% na aprovação em homologação (ou 50/25/25 para multiunidade).
- *Parcelamento EPM:* 3x ou 4x sem juros (quitação prévia à publicação definitiva em produção).
- *Cartão de Crédito:* em até 6x via link de pagamento.
- *Condição Especial à Vista:* desconto parametrizável por proposta nominal (percentual ou valor fixo).

---

## 🔒 Slugs Impossíveis de Adivinhar & Carregamento Sob Demanda

Para assegurar total sigilo entre clientes:
1. **Formato do Slug:** `{nome-curto}-{token}`, onde `{token}` é uma sequência aleatória de 8 caracteres alfanuméricos (`[a-z0-9]`), gerada com `crypto.randomBytes` (ex.: `sorriso-prime-k7x2m9qf`).
2. **Arquivos JSON Isolados:** Cada proposta é salva em seu próprio arquivo em `src/data/proposals/{slug}.json`.
3. **Code Splitting Sob Demanda:** O Vite empacota cada proposta em um chunk JavaScript minúsculo separado (~0.7 kB). O bundle principal de produção (`index-*.js`) **não contém nomes de clientes, responsáveis nem valores das propostas**.
4. **Sem Confirmação de Existência:** Slugs inexistentes ou inválidos redirecionam silenciosamente para a página neutra `/`, sem mensagens de "proposta não encontrada".

> [!IMPORTANT]
> **Aviso de Segurança em Sites Estáticos:**  
> Por ser uma aplicação estática hospedada em CDN (Vercel), qualquer pessoa que possua a URL completa da proposta terá acesso ao seu conteúdo visual. Por essa razão:
> - O link deve ser enviado estritamente ao destinatário comercial via WhatsApp ou e-mail.
> - Propostas vencidas ou canceladas devem ser removidas do diretório `src/data/proposals/` no repositório.

---

## 📝 Como Gerar uma Nova Proposta Comercial

Execute o comando interativo no terminal:
```bash
npm run proposta:nova
```
O assistente solicitará:
1. Nome do negócio / cliente (ex.: *Clínica Odonto Mais*)
2. Nome curto para a URL (ex.: *odonto-mais*)
3. Nome do responsável (A/C: *Dra. Camila Rocha*)
4. Nicho (*odontologia*, *advocacia*, *barbearia*)
5. Quantidade de profissionais e unidades
6. Plano indicado (*essencial*, *pro*, *multiunidade*)
7. Inclusão de lembretes WhatsApp (s/n)
8. Validade da proposta e observações
9. Desconto especial à vista (opcional)

O script gerará automaticamente o token de 8 caracteres, criará o arquivo `src/data/proposals/{slug}.json` e exibirá o link final para envio.

---

## 🛠️ Como Adicionar um Novo Nicho

1. **Duplique o template:**
   Copie `src/data/niches/_template.ts` para `src/data/niches/novoNicho.ts` (ex.: `estetica.ts`, `psicologia.ts`, `petshop.ts`).
2. **Preencha as propriedades específicas do nicho:**
   - `slug`: identificador na URL (ex.: `"estetica"`).
   - `nomeInterno`: nome de referência interna.
   - `tom`: `"clinico"` | `"sobrio"` | `"descontraido"`.
   - `termos`: singular, plural e artigos gramaticais de profissional, cliente, estabelecimento, unidade, atendimento e agendamento.
   - `retorno`: ticket médio e estimativa de atendimentos recuperados para a calculadora de ROI.
   - `seguranca`: título, itens específicos e texto de tratamento/sigilo de dados.
   - `faq`: objeções exclusivas daquele segmento.
   - `extrasOrcamento`: itens adicionais específicos fora do escopo.
   - `contrato`: placeholders contratuais.
   - `whatsappMensagemTemplate`: template com placeholders `{plano}`, `{profissionais}`, etc.
   *(Nota: O campo `pricing` não existe nos nichos; os preços vêm uniformemente de `src/data/pricing.ts`).*
3. **Registre o novo nicho:**
   Em `src/data/niches/index.ts`, importe o arquivo e adicione ao objeto `rawNiches`.
4. **Valide com testes:**
   Execute `npm run test` para assegurar conformidade com schemas e com a Regra de Ouro.

---

## 🌐 Rotas da Aplicação

| Rota | Ambiente | Descrição |
|---|---|---|
| `/` | **Produção & Dev** | Página neutra com logo e a frase: *"Acesse esta página pelo link da sua proposta."* Sem links nem listagens. |
| `/:nicho` | **Produção & Dev** | Página comercial do nicho com simulador interativo (enviada diretamente a leads). Slugs inválidos vão para `/`. |
| `/proposta/:slug` | **Produção & Dev** | Proposta nominal com banner exclusivo e dados carregados sob demanda via JSON. Slugs inválidos vão para `/`. |
| `/interno` | **Apenas DEV** | Painel interno da equipe EPM com gerador de slugs e atalhos. **Eliminado do bundle de produção.** |

---

## 💻 Desenvolvimento Local & Comandos

```bash
# Instalar dependências
npm install

# Iniciar servidor local de desenvolvimento (com rota /interno ativa)
npm run dev

# Gerar nova proposta nominal via terminal
npm run proposta:nova

# Executar testes unitários e teste guardião da Regra de Ouro
npm run test

# Compilação estrita e verificação de tipos (produção)
npm run build

# Pré-visualizar build local de produção
npm run preview
```

---

## 🚀 Deploy na Vercel

1. Framework Preset: **Vite**.
2. Build Command: `npm run build`. Output Directory: `dist`.
3. Domínio de Produção: `planos.epmdevtech.com.br` (CNAME para `cname.vercel-dns.com`).
4. Configurações automáticas via `vercel.json`:
   - Headers HTTP: `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`.
   - Rewrites SPA: `/:path*` redirecionado para `/index.html`.

---

## 📄 Governança Universal SDD

Todas as alterações obedecem ao framework **Universal SDD**:
- `ADR-001`: Decisão arquitetural de Preço Único, Home Neutra e Propostas Dinâmicas
- `SPEC-001` a `SPEC-009`: Especificações técnicas e funcionais
- `TASK-001-01` a `TASK-009-01`: Tarefas executadas e validadas
- `REVIEW-001` a `REVIEW-009`: Pareceres de aprovação formal
- Matriz completa em [`docs/traceability-matrix.md`](docs/traceability-matrix.md).

---

© 2026 EPM DEVTECH. Todos os direitos reservados.
