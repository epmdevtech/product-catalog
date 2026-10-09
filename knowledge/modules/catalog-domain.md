# Knowledge: Modelo de Domínio do Catálogo de Produtos

## Metadados

| Campo | Valor |
|---|---|
| ID | KB-001 |
| Status | Validated |
| Responsável | Engenharia & Produto EPMDEVTECH |
| Criado/revisado | 2026-10-09 |
| Aplicabilidade | Definição de tipos, esquemas de validação e componentes de catálogo |
| Fontes | Requisitos de Catálogo EPMDEVTECH, Universal SDD |

---

## Contexto

Este documento consolida o vocabulário e a modelagem do domínio do **Catálogo de Produtos** (`product-catalog`), servindo como fonte conceitual para especificações (SPECs), modelagem TypeScript e validação de esquemas (Zod).

---

## Conhecimento Validado

### 1. Entidades Principais

- **Produto (`Product`)**:
  - `id`: Identificador único (slug ou UUID).
  - `name`: Nome comercial do item.
  - `sku`: Código de referência de estoque/fabricante.
  - `shortDescription`: Resumo para cards de listagem (máx 120 caracteres).
  - `fullDescription`: Descrição técnica detalhada e benefícios.
  - `categoryId`: Categoria principal à qual o produto pertence.
  - `tags`: Coleção de marcadores para indexação e busca (ex: "lançamento", "destaque", "promoção").
  - `images`: Lista ordenada de URLs/caminhos de imagem, com texto alternativo (`alt`) obrigatório para acessibilidade.
  - `price`: Objeto contendo valor atual, valor original (para cálculo de desconto/promoção) e indicador de cotação sob consulta.
  - `attributes`: Especificações técnicas (chave-valor, ex: Material, Dimensões, Peso, Voltagem).
  - `variants`: Variações selecionáveis (ex: cores, tamanhos).
  - `availability`: Estado de disponibilidade (`in_stock`, `out_of_stock`, `on_demand`, `discontinued`).
  - `featured`: Booleano para destaque na vitrine inicial.

- **Categoria (`Category`)**:
  - `id`: Slug identificador.
  - `name`: Título da categoria.
  - `description`: Descrição temática da linha de produtos.
  - `icon`: Identificador de ícone (Lucide React).
  - `parentId`: Referência para subcategorias hierárquicas (opcional).

- **Filtros e Busca (`FilterState`)**:
  - `query`: Termo textual pesquisado em nome, SKU ou descrição.
  - `selectedCategories`: Filtro multi-seleção por categoria.
  - `priceRange`: Faixa de preço mínimo e máximo.
  - `availabilityOnly`: Apenas itens disponíveis.
  - `sortBy`: Critério de ordenação (`featured`, `price_asc`, `price_desc`, `name_asc`, `newest`).

---

## Exemplos de Tipagem Conceitual

```typescript
export interface ProductImage {
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface ProductPrice {
  current: number;
  original?: number;
  currency: 'BRL' | 'USD';
  onDemand?: boolean;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  categoryId: string;
  tags: string[];
  images: ProductImage[];
  price: ProductPrice;
  attributes: Record<string, string>;
  availability: 'in_stock' | 'out_of_stock' | 'on_demand';
  featured: boolean;
}
```

---

## Limites, Exceções e Armadilhas

- **Imagens ausentes**: Sempre prover fallback de placeholder visual elegante e acessível com `aria-label`.
- **Preços sem valor definido**: Quando `price.onDemand === true`, o card deve exibir "Sob consulta" e acionar canal direto (WhatsApp/contato) em vez de valor zerado.
- **Variações complexas**: Não acoplar controle de estoque em tempo real de ERP na camada de apresentação inicial; manter o catálogo reativo no cliente com dados canônicos mockados ou configuráveis.

---

## Revisão

- **Próxima revisão**: Na aprovação da `SPEC-001`.
- **Substitui/substituída por**: Versão inicial canônica.
