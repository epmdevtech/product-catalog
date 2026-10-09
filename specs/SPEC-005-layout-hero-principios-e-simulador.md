# SPEC-005: Layout, Hero, Princípios e Simulador por Estrutura

## Metadados

| Campo | Valor |
|---|---|
| ID | SPEC-005 |
| Status | Approved |
| Responsável | Engenharia & UX/UI EPMDEVTECH |
| Revisores | Design / Engenharia / QA |
| Criado | 2026-10-09 |
| Atualizado | 2026-10-09 |
| Lançamento alvo | v0.2.0 |
| Refs | `templates/spec.md`, `standards/ux-ui.md`, `standards/accessibility.md` |

---

## Problema e resultado

Criar o núcleo de experiência do usuário da plataforma comercial da EPM DevTech para propostas e planos:
1. `NicheProvider` e contexto para injeção limpa de termos e regras do nicho.
2. Layout institucional com Header (logo adaptativo light/dark EPM DevTech, seletor de tema, atalho WhatsApp).
3. Seção Hero com saudações personalizadas (quando em rota de proposta), título e subtítulo dinâmicos, CTA principal (âncora suave para o simulador) e CTA secundário "Ver demonstração" (condicional a `demoUrl`).
4. Três Princípios da EPM DevTech ("Implantação é pagamento único", "Mensalidade só começa na publicação", "Você aprova antes de publicar").
5. Simulador por Estrutura interativo: slider de profissionais (1 a 15), stepper de unidades (1 a 4), switch de lembretes automáticos por WhatsApp, saídas em tempo real (perfil, plano, implantação e mensalidade estritamente separadas) e botão de envio de simulação via WhatsApp com deeplink seguro.
6. Cumprimento estrito da Regra de Ouro (zero termos específicos de nicho no código).

---

## Escopo

### No escopo (In scope)
- `src/contexts/NicheContext.tsx` e hooks associados.
- `src/components/layout/Header.tsx`, `Footer.tsx`.
- `src/components/ui/` (primitivas acessíveis baseadas em Radix: Button, Slider, Switch, Card, Badge).
- `src/sections/HeroSection.tsx`.
- `src/sections/PrinciplesSection.tsx`.
- `src/sections/SimulatorSection.tsx`.
- Verificação da Regra de Ouro com o teste `nicheWordsGuard.test.ts`.

### Fora do escopo (Out of scope)
- Cards comparativos de planos, calculadora de retorno e pagamento (será SPEC-006).
- Incluso vs orçamentos à parte, segurança, FAQ e contrato (será SPEC-007).
- Roteamento completo de propostas com slugs (será SPEC-008).

---

## Critérios de Aceitação

### AC-001: Apresentação e concordância gramatical do Hero
```gherkin
Dado um nicho carregado no NicheProvider
Quando a página for renderizada
Então o título e subtítulo devem refletir a configuração do nicho, e o botão "Ver demonstração" só deve aparecer se `demoUrl` não for vazia.
```

### AC-002: Interatividade e cálculos em tempo real do Simulador
```gherkin
Dado o simulador com slider de 1 a 15 e stepper de 1 a 4
Quando o usuário alterar profissionais, unidades ou o switch de lembretes WhatsApp
Então os valores de Implantação e Mensalidade devem atualizar imediatamente de forma separada, sem somar ambos em um único total.
```

### AC-003: Deeplink de WhatsApp com template do nicho
```gherkin
Dado uma simulação configurada
Quando o usuário clicar em "Enviar esta simulação pelo WhatsApp"
Então deve abrir a URL `wa.me` com o texto devidamente codificado contendo os dados da simulação.
```

### AC-004: Conformidade da Regra de Ouro
```gherkin
Dado o código criado em `src/components`, `src/sections` e `src/lib`
Quando executado o teste `nicheWordsGuard.test.ts`
Então nenhuma palavra de nicho específica deve ser encontrada nos arquivos.
```
