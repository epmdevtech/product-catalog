import React from "react";
import { CreditCard, CalendarCheck, ShieldAlert, Sparkles } from "lucide-react";
import { useNiche } from "@/contexts/NicheContext";
import { calculateInstallments } from "@/lib/pricing";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const PaymentTermsSection: React.FC = () => {
  const { pricing, proposal } = useNiche();

  const isMulti = pricing.perfilIdentificado === "multiunidade";
  const installments = calculateInstallments(
    pricing.implantacaoTotal,
    isMulti,
    proposal?.condicaoAVistaEspecial
  );

  const marcos = [
    {
      numero: "01",
      titulo: "Contratação & Kickoff",
      descricao: isMulti ? "Entrada de 50% do valor da implantação." : "Entrada de 50% do valor da implantação.",
      detalhe: "Início imediato do alinhamento de design e levantamento de regras.",
    },
    {
      numero: "02",
      titulo: "Desenvolvimento & Design",
      descricao: "Construção técnica exclusiva da plataforma.",
      detalhe: "Configuração do layout responsivo, agenda e parametrizações.",
    },
    {
      numero: "03",
      titulo: "Homologação Fechada",
      descricao: "Acesso em link privado de testes.",
      detalhe: "Você navega, simula agendamentos e valida cada tela antes de ir ao ar.",
    },
    {
      numero: "04",
      titulo: "Aprovação Formal",
      descricao: isMulti ? "Quitação da etapa (25%)." : "Quitação do saldo final (50%).",
      detalhe: "Seu aval formal de que o sistema está 100% pronto para publicação.",
    },
    {
      numero: "05",
      titulo: "Publicação & Operação",
      descricao: "Site no ar com domínio oficial.",
      detalhe: "Início oficial da infraestrutura estável e cobrança da primeira mensalidade.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-surface/30 border-b border-border-default/60">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <Badge variant="brandSubtle" className="mb-3 uppercase tracking-wider text-xs font-semibold">
            Condições Comerciais
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Como funciona a entrega e o pagamento
          </h2>
          <p className="text-text-secondary text-base sm:text-lg">
            Processo transparente dividido por marcos de validação. Você acompanha cada etapa e só aprova a entrega final após testar em homologação.
          </p>
        </div>

        {/* Linha do Tempo de Marcos */}
        <div className="mb-14">
          <h3 className="text-sm uppercase font-bold tracking-wider text-text-muted mb-6 text-center">
            Marcos de Entrega do Projeto
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {marcos.map((marco, i) => (
              <div
                key={i}
                className="bg-card border border-border-default rounded-xl p-4 sm:p-5 flex flex-col justify-between relative shadow-xs"
              >
                <div>
                  <span className="text-2xl font-black text-brand block mb-2 font-mono">
                    {marco.numero}
                  </span>
                  <h4 className="text-sm font-bold text-foreground mb-1 leading-snug">
                    {marco.titulo}
                  </h4>
                  <p className="text-xs font-semibold text-text-brand dark:text-brand mb-2">
                    {marco.descricao}
                  </p>
                </div>
                <p className="text-[11px] text-text-muted leading-relaxed mt-2 pt-2 border-t border-border-subtle">
                  {marco.detalhe}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Simulação de Formas de Pagamento da Implantação */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-xl font-bold text-foreground">
              Formas de Pagamento da Implantação
            </h3>
            <p className="text-xs text-text-muted mt-1">
              Simulação considerando o valor atual de implantação de{" "}
              <strong className="text-foreground">
                R$ {pricing.implantacaoTotal.toLocaleString("pt-BR")}
              </strong>
              . A mensalidade inicia somente após a publicação.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Opção 1: Entrada e Saldo */}
            <Card className="border border-border-default bg-card shadow-sm p-6">
              <CardContent className="p-0 space-y-4">
                <div className="flex items-center gap-2 text-foreground font-bold text-base">
                  <CalendarCheck className="h-5 w-5 text-brand" />
                  <h4>{installments.modeloEntradaSaldo.rotulo}</h4>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Fluxo padrão com entrada na assinatura e saldo vinculado à aprovação em homologação.
                </p>
                <div className="space-y-2 pt-2 border-t border-border-subtle">
                  {installments.modeloEntradaSaldo.etapas.map((etapa, idx) => (
                    <div key={idx} className="flex justify-between text-xs">
                      <span className="text-text-secondary">{etapa.descricao}:</span>
                      <strong className="text-foreground">
                        R$ {etapa.valor.toLocaleString("pt-BR")}
                      </strong>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Opção 2: Parcelamento EPM 3x ou 4x Sem Juros */}
            <Card className="border border-border-default bg-card shadow-sm p-6">
              <CardContent className="p-0 space-y-4">
                <div className="flex items-center gap-2 text-foreground font-bold text-base">
                  <CreditCard className="h-5 w-5 text-brand" />
                  <h4>Parcelado pela EPM</h4>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Opção facilitada direto com a software house em 3x ou 4x sem juros (publicação definitiva após a quitação).
                </p>
                <div className="space-y-2.5 pt-2 border-t border-border-subtle">
                  <div className="flex justify-between items-baseline text-xs bg-surface p-2 rounded border border-border-subtle">
                    <span className="text-text-secondary">Em 3x sem juros:</span>
                    <strong className="text-sm font-bold text-foreground">
                      3x de R$ {installments.parcelasEpm3x.valorParcela.toLocaleString("pt-BR")}
                    </strong>
                  </div>
                  <div className="flex justify-between items-baseline text-xs bg-surface p-2 rounded border border-border-subtle">
                    <span className="text-text-secondary">Em 4x sem juros:</span>
                    <strong className="text-sm font-bold text-foreground">
                      4x de R$ {installments.parcelasEpm4x.valorParcela.toLocaleString("pt-BR")}
                    </strong>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Opção 3: Cartão de Crédito até 6x */}
            <Card className="border border-border-default bg-card shadow-sm p-6">
              <CardContent className="p-0 space-y-4">
                <div className="flex items-center gap-2 text-foreground font-bold text-base">
                  <CreditCard className="h-5 w-5 text-brand" />
                  <h4>Cartão de Crédito</h4>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Parcelamento em até 6x no cartão de crédito via link seguro de pagamento (taxas da operadora por conta do cliente).
                </p>
                <div className="pt-2 border-t border-border-subtle">
                  <div className="bg-surface p-2.5 rounded border border-border-subtle text-xs flex justify-between items-center">
                    <span className="text-text-secondary">Até 6x de aprox.:</span>
                    <strong className="text-sm font-bold text-foreground">
                      6x de R$ {installments.parcelasCartao6x.valorParcelaAproximada.toLocaleString("pt-BR")}*
                    </strong>
                  </div>
                  <p className="text-[10px] text-text-muted mt-2">
                    * Valor base sem acréscimo das taxas de parcelamento da sua bandeira de cartão.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Condição Especial à Vista (Exclusiva da Proposta Personalizada) */}
          {installments.condicaoAVistaAplicada && (
            <div className="mt-6 p-4 rounded-xl bg-success/10 border border-success/30 flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-success/20 flex items-center justify-center text-success shrink-0">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-extrabold text-success tracking-wider">
                      Condição Especial Exclusiva
                    </span>
                    <Badge variant="outline" className="border-success/40 text-success text-[10px]">
                      {installments.condicaoAVistaAplicada.descricao}
                    </Badge>
                  </div>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Valor à vista com quitação única na contratação: economia de{" "}
                    <strong className="text-success">
                      R$ {installments.condicaoAVistaAplicada.economia.toLocaleString("pt-BR")}
                    </strong>
                    .
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] text-text-muted block line-through">
                  De R$ {installments.condicaoAVistaAplicada.valorOriginal.toLocaleString("pt-BR")}
                </span>
                <span className="text-xl font-black text-foreground">
                  Por R$ {installments.condicaoAVistaAplicada.valorFinal.toLocaleString("pt-BR")} à vista
                </span>
              </div>
            </div>
          )}

          {/* Aviso sobre regra de publicação e quitação */}
          <div className="flex items-center gap-2.5 p-3.5 rounded-lg bg-surface border border-border-default text-xs text-text-secondary">
            <ShieldAlert className="h-4 w-4 text-brand shrink-0" />
            <span>
              <strong>Regra de Publicação:</strong> A publicação definitiva em produção com domínio próprio ocorre somente após a quitação integral do valor acordado de implantação, salvo condição especial expressa em proposta escrita.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
