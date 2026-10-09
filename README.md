# EPM DevTech — Plataforma Multinicho de Planos & Propostas

> **Ambiente:** `planos.epmdevtech.com.br`  
> **Status:** Produção / Alta Conversão B2B  
> **Governança:** Universal SDD (Spec-Driven Development)  
> **Tecnologia:** Vite 5 • React 18 • TypeScript • Tailwind 3.4 • Radix UI • Framer Motion • Recharts

---

## 🎯 Sobre o Projeto

A **EPM DevTech** é uma software house com mais de 9 anos de mercado (PHP, Laravel, Node.js, React, AWS, Docker) que desenvolve e sustenta soluções digitais de alto nível. Uma de suas principais ofertas é o combo **Site Institucional Premium + Agendamento Online Dedicado (EPM Booking)** para profissionais liberais e negócios que vivem de agenda.

Esta plataforma comercial foi construída com foco exclusivo em propostas comerciais de alta conversão:
- **Público:** Leads qualificados que já assistiram a uma demonstração e solicitaram uma proposta detalhada.
- **Diferencial Comercial:** Não vendemos apenas "código de site" — entregamos infraestrutura em nuvem, agenda sem conflito de horários, backups diários, suporte técnico especializado, conformidade com a LGPD e responsabilidade técnica.
- **Privacidade & Noindex:** 100% desindexada de buscadores (`robots.txt`, cabeçalhos HTTP na Vercel e meta tags).

---

## 🛡️ Regra de Ouro da Arquitetura Multinicho

> **ZERO TEXTO DE NICHO NO CÓDIGO CORE**  
> Nenhum componente, seção ou função utilitária em `src/components`, `src/sections` e `src/lib` pode conter termos específicos de nicho (ex.: *dentista, paciente, clínica, odontologia, advogado, escritório, barbeiro, barbearia*).

- Todo o vocabulário, termos gramaticais, textos e parâmetros de preços provêm de `src/data/niches/*.ts`.
- Um teste automatizado no Vitest ([`nicheWordsGuard.test.ts`](src/test/nicheWordsGuard.test.ts)) varre recursivamente esses diretórios e **falha a esteira de CI/CD** caso qualquer termo proibido seja introduzido.
- **Isolamento de Contexto:** A página de um segmento nunca cita outro segmento (a proposta de um advogado nunca menciona clínicas ou barbearias).

---

## 🚀 Stack Tecnológica

| Tecnologia | Finalidade |
|---|---|
| **Vite 5 + React 18 (SWC)** | Build ultrarrápido e SPA client-side otimizada |
| **TypeScript (Strict)** | Tipagem estrita de nichos, propostas e cálculos financeiros |
| **Tailwind CSS 3.4** | Design System canônico EPM DevTech (Teal #2DD4BF / Dark #0A0F10) |
| **Radix UI** | Primitivas headless acessíveis (Accordion, Slider, Switch, Dialog) |
| **Framer Motion** | Microinterações e animações respeitando `prefers-reduced-motion` |
| **Recharts** | Projeção visual de ROI financeiro em 12 meses |
| **React Router 6** | Roteamento cliente para `/`, `/:nicho` e `/proposta/:slug` |
| **Zod** | Validação em runtime de esquemas de nicho e propostas nominais |
| **Vitest + RTL** | Testes unitários de precificação e guarda da Regra de Ouro |
| **@vercel/analytics** | Telemetria de conversão (simulações, cliques em WhatsApp e abertura de propostas) |

---

## 📁 Estrutura de Diretórios

```text
product-catalog/
├── public/                 # Favicons, logos da EPM DevTech e robots.txt
├── src/
│   ├── components/         # Componentes genéricos de UI (botões, cards, sliders, accordion)
│   ├── contexts/           # NicheContext (gestor de estado de nicho e simulação)
│   ├── data/
│   │   ├── niches/         # Arquivos de configuração de cada nicho
│   │   │   ├── _template.ts   # Modelo documentado para criar novos nichos
│   │   │   ├── odontologia.ts # Configuração do nicho Odontologia
│   │   │   ├── advocacia.ts   # Configuração do nicho Advocacia
│   │   │   ├── barbearia.ts   # Configuração do nicho Barbearia
│   │   │   └── index.ts       # Registro e validação de nichos
│   │   ├── faqBase.ts      # Objeções gerais e dúvidas comuns
│   │   └── proposals.ts    # Propostas nominais pré-configuradas com validação Zod
│   ├── lib/
│   │   ├── pricing.ts      # Motor puro de cálculo de preços, parcelas e ROI
│   │   └── utils.ts        # Utilitários de classes Tailwind
│   ├── pages/
│   │   ├── HomePage.tsx    # Seletor interno da equipe EPM
│   │   ├── NichePage.tsx   # Página de vendas do nicho com simulador
│   │   └── ProposalPage.tsx# Proposta personalizada com banner exclusivo
│   ├── sections/           # 10 seções comerciais desacopladas de nicho
│   ├── types/              # Schemas Zod e tipos estritos do sistema
│   └── test/               # Testes de sanidade e guarda da Regra de Ouro
├── specs/                  # Especificações Universal SDD (SPEC-001 a SPEC-008)
├── tasks/                  # Tarefas rastreadas vinculadas às SPECs
├── reviews/                # Avaliações formais de qualidade e release
├── docs/                   # Matriz de rastreabilidade e governança
├── vercel.json             # Headers noindex e rewrite para SPA
└── package.json
```

---

## 🧮 Motor de Precificação (`src/lib/pricing.ts`)

A precificação é calculada estritamente em **dois blocos separados**:
1. **Implantação (taxa única de setup, design e entrega)**
2. **Operação (mensalidade contínua de hospedagem e sustentação)**

### Regras de Negócio
- **Perfis de Negócio:**
  - `solo`: 1 profissional
  - `pequena`: 2 a 4 profissionais
  - `media`: 5 a 10 profissionais
  - `multiunidade`: 2 ou mais unidades
- **Excedentes:**
  - Mais de 10 profissionais em unidade única: taxa adicional por profissional/mês.
  - Mais de 15 profissionais em multiunidade: taxa adicional por profissional/mês.
  - Mais de 2 unidades: acréscimo na taxa de implantação e na mensalidade por unidade adicional.
- **Condições de Pagamento:**
  - *Entrada e Saldo:* 50% na contratação e 50% na homologação (ou 50/25/25 para multiunidade).
  - *Parcelamento EPM:* 3x ou 4x sem juros (quitação prévia à publicação em produção).
  - *Cartão de Crédito:* em até 6x via link de pagamento.
  - *Desconto à Vista:* parametrizável por proposta (percentual ou valor fixo).

---

## 🛠️ Como Adicionar um Novo Nicho

1. **Duplique o template:**
   Copie `src/data/niches/_template.ts` para `src/data/niches/novoNicho.ts` (ex.: `estetica.ts`, `psicologia.ts`, `petshop.ts`).
2. **Preencha todas as propriedades:**
   - `slug`: identificador na URL (ex.: `"estetica"`).
   - `nomeInterno`: nome de referência interna.
   - `tom`: `"clinico"` | `"sobrio"` | `"descontraido"`.
   - `termos`: singular, plural e artigos gramaticais de profissional, cliente, estabelecimento, unidade, atendimento e agendamento.
   - `pricing`: valores de implantação e mensalidade para cada perfil.
   - `retorno`: ticket médio e estimativa de atendimentos recuperados.
   - `seguranca`: título, itens específicos e texto de sigilo de dados.
   - `faq`: objeções exclusivas daquele mercado.
   - `extrasOrcamento`: serviços complementares fora do escopo.
   - `contrato`: parâmetros e prazos.
   - `whatsappMensagemTemplate`: template com placeholders `{plano}`, `{profissionais}`, etc.
3. **Registre o novo nicho:**
   Em `src/data/niches/index.ts`, importe o arquivo e adicione ao objeto `rawNiches`:
   ```ts
   import { novoNicho } from "./novoNicho";

   const rawNiches: Record<string, NicheConfig> = {
     // ...
     novoNicho: NicheConfigSchema.parse(novoNicho),
   };
   ```
4. **Valide a conformidade:**
   Execute `npm run test` para assegurar que os schemas Zod e a Regra de Ouro foram respeitados.

---

## 📝 Como Cadastrar uma Proposta Personalizada

1. Abra `src/data/proposals.ts`.
2. Adicione um novo registro no array `proposals` utilizando `ProposalSchema.parse`:
   ```ts
   ProposalSchema.parse({
     slug: "clinica-exemplo",
     nichoSlug: "odontologia",
     nomeNegocio: "Clínica Odonto Prime",
     responsavel: "Dr. Marcelo Alves",
     profissionais: 4,
     unidades: 1,
     plano: "pro",
     incluirWhatsApp: true,
     validadeAte: "15/11/2026",
     observacoes: "Condição especial com 10% de desconto à vista na implantação.",
     condicaoAVistaEspecial: {
       tipo: "percentual",
       valor: 10,
       descricao: "10% de desconto à vista na implantação",
     },
     criadoEm: "10/10/2026",
   }),
   ```
3. A proposta ficará disponível automaticamente em `planos.epmdevtech.com.br/proposta/clinica-exemplo`.

---

## 🌐 Rotas da Aplicação

- `/`: Painel interno de seleção de segmentos e listagem de propostas ativas.
- `/:nicho`: Página comercial com o simulador interativo configurado para o nicho (`/odontologia`, `/advocacia`, `/barbearia`).
- `/proposta/:slug`: Página de proposta nominal com banner exclusivo, campos travados e condições de pagamento salvas.
- *Qualquer slug inválido é redirecionado automaticamente para `/`.*

---

## 💻 Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento local
npm run dev

# Executar suíte de testes (Vitest + Regra de Ouro)
npm run test

# Verificar compilação TypeScript e gerar build de produção
npm run build

# Pré-visualizar build local
npm run preview
```

### Com Docker
```bash
# Subir ambiente com Nginx e SPA fallback
docker compose up -d --build

# Acessar aplicação
http://localhost:8080
```

---

## 🚀 Deploy na Vercel

A aplicação está configurada para deploy contínuo na Vercel:
1. Conecte o repositório `epmdevtech/product-catalog` ao dashboard da Vercel.
2. Defina o Framework Preset como **Vite**.
3. O comando de build será `npm run build` e o diretório de saída será `dist`.
4. Configure o domínio personalizado:
   - Adicione o domínio `planos.epmdevtech.com.br`.
   - Aponte o registro CNAME no DNS para `cname.vercel-dns.com`.
5. As regras de `vercel.json` aplicarão automaticamente:
   - Headers HTTP `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`.
   - Rewrites para SPA routing (`/index.html`).

---

## 📊 Telemetria e Analytics

A aplicação utiliza `@vercel/analytics` para medir as seguintes interações:
- `simulador_alterado`: mudança de sliders ou configurações no simulador.
- `whatsapp_clique`: conversões nos botões diretos de WhatsApp.
- `proposta_aberta`: abertura de propostas nominais por clientes.
- `calculadora_usada`: simulação de retorno financeiro e payback.

---

## 📄 Governança e Rastreabilidade

Todas as entregas deste repositório seguem estritamente o **Universal SDD**:
- As especificações normativas residem em `specs/`.
- As tarefas rastreadas residem em `tasks/`.
- Os pareceres de revisão residem em `reviews/`.
- A matriz consolidada é mantida em [`docs/traceability-matrix.md`](docs/traceability-matrix.md).

---

© 2026 EPM DEVTECH. Todos os direitos reservados.
