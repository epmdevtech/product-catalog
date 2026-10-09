import React from "react";
import { Check, Star, ArrowRight } from "lucide-react";
import { useNiche } from "@/contexts/NicheContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PlanoId } from "@/lib/pricing";

export const PlansSection: React.FC = () => {
  const { niche, pricing, planoSelecionado, setPlanoSelecionado, unidades } = useNiche();

  const handleSelectPlan = (plano: PlanoId) => {
    setPlanoSelecionado(plano);
  };

  const planos = [
    {
      id: "essencial" as PlanoId,
      nome: "Essencial",
      subtitulo: "Apenas Site Institucional",
      destaque: false,
      descricao: "Presença digital profissional e elegante, sem motor de agendamento online automatizado.",
      implantacao: niche.pricing.essencial.implantacao,
      mensalidade: niche.pricing.essencial.mensalidade,
      itensImplantacao: [
        "Site institucional exclusivo de alta velocidade",
        "Design adaptado para dispositivos móveis",
        `Apresentação completa da equipe de ${niche.termos.profissional.plural}`,
        "Formulário seguro de contato e botão para WhatsApp",
        "Otimização básica para mecanismos de busca",
      ],
      itensMensalidade: [
        "Hospedagem de alta performance em nuvem",
        "Certificado de segurança SSL ativo",
        "Backups de segurança diários",
        "Suporte técnico para manutenção do site",
      ],
    },
    {
      id: "pro" as PlanoId,
      nome: "Pro",
      subtitulo: "Site Premium + EPM Booking",
      destaque: pricing.planoRecomendado === "pro",
      descricao: `Ideal para negócios em unidade única que necessitam de agenda automatizada e sem atrito.`,
      implantacao:
        planoSelecionado === "pro"
          ? pricing.implantacaoTotal
          : niche.pricing.pequena.implantacao,
      mensalidade:
        planoSelecionado === "pro"
          ? pricing.mensalidadeTotal
          : niche.pricing.pequena.mensalidade,
      itensImplantacao: [
        "Tudo o que está incluso no Plano Essencial",
        "Sistema EPM Booking com agendamento online 24/7",
        `Grade independente para cada ${niche.termos.profissional.singular}`,
        `Seu ${niche.termos.cliente.singular} marca pelo celular sem baixar app`,
        "Painel administrativo para controle e bloqueio de horários",
      ],
      itensMensalidade: [
        "Tudo o que está incluso no Plano Essencial",
        "Infraestrutura de nuvem dedicada para o motor de agenda",
        "Garantia de zero conflitos de horário em tempo real",
        "Suporte técnico prioritário pós-publicação",
      ],
    },
    {
      id: "multiunidade" as PlanoId,
      nome: "Multiunidade",
      subtitulo: "Gestão Unificada de Redes",
      destaque: pricing.planoRecomendado === "multiunidade",
      descricao: `Estrutura corporativa com separação por filial física e controle centralizado.`,
      implantacao:
        planoSelecionado === "multiunidade"
          ? pricing.implantacaoTotal
          : niche.pricing.multiunidade.implantacao,
      mensalidade:
        planoSelecionado === "multiunidade"
          ? pricing.mensalidadeTotal
          : niche.pricing.multiunidade.mensalidade,
      itensImplantacao: [
        "Tudo o que está incluso no Plano Pro",
        `Suporte a 2 ou mais ${niche.termos.unidade.plural} com seletor no agendamento`,
        `Equipes e ${niche.termos.profissional.plural} alocados por filial`,
        "Painel com visão geral consolidada ou filtrada por local",
        "Parametrização avançada de feriados e turnos locais",
      ],
      itensMensalidade: [
        "Tudo o que está incluso no Plano Pro",
        "Sustentação escalável de infraestrutura multi-local",
        "Monitoramento em tempo real de todas as filiais",
        "Atendimento e suporte técnico dedicado à rede",
      ],
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-surface/30 border-b border-border-default/60">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="brandSubtle" className="mb-3 uppercase tracking-wider text-xs font-semibold">
            Opções de Contratação
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Escolha o plano ideal para a sua maturidade
          </h2>
          <p className="text-text-secondary text-base sm:text-lg">
            Valores transparentes e proporcionais ao tamanho da sua equipe. O plano destacado reflete a sua simulação atual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {planos.map((plano) => {
            const isSelected = planoSelecionado === plano.id;
            const isRecommended = pricing.planoRecomendado === plano.id;

            return (
              <Card
                key={plano.id}
                className={`relative flex flex-col transition-all duration-300 rounded-xl overflow-hidden ${
                  isRecommended
                    ? "border-2 border-brand shadow-xl bg-card ring-1 ring-brand/30"
                    : "border-border-default hover:border-border-strong bg-card/80"
                }`}
              >
                {isRecommended && (
                  <div className="bg-brand text-on-brand text-center text-xs font-bold py-1.5 uppercase tracking-wider flex items-center justify-center gap-1.5">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span>Recomendado para sua estrutura</span>
                  </div>
                )}

                <div className="p-6 sm:p-7 border-b border-border-default/60 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-extrabold text-foreground">{plano.nome}</h3>
                      <p className="text-xs text-text-muted font-medium">{plano.subtitulo}</p>
                    </div>
                    {isSelected && (
                      <Badge variant="brandSubtle" className="text-xs font-semibold">
                        Selecionado
                      </Badge>
                    )}
                  </div>

                  <p className="text-xs text-text-secondary leading-relaxed min-h-[36px]">
                    {plano.descricao}
                  </p>

                  {/* Preços */}
                  <div className="space-y-3 pt-2">
                    <div className="bg-surface/80 p-3 rounded-lg border border-border-subtle">
                      <div className="text-[11px] text-text-muted uppercase font-semibold tracking-wider flex justify-between">
                        <span>Implantação</span>
                        <span className="text-[10px] text-text-secondary">Único</span>
                      </div>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-xs text-text-muted">a partir de</span>
                        <span className="text-xl sm:text-2xl font-bold text-foreground">
                          R$ {plano.implantacao.toLocaleString("pt-BR")}
                        </span>
                      </div>
                    </div>

                    <div className="bg-surface/80 p-3 rounded-lg border border-border-subtle">
                      <div className="text-[11px] text-text-muted uppercase font-semibold tracking-wider flex justify-between">
                        <span>Operação</span>
                        <span className="text-[10px] text-text-secondary">Mensal</span>
                      </div>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-xs text-text-muted">a partir de</span>
                        <span className="text-xl sm:text-2xl font-bold text-foreground">
                          R$ {plano.mensalidade.toLocaleString("pt-BR")}
                        </span>
                        <span className="text-xs text-text-muted font-normal">/mês</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleSelectPlan(plano.id)}
                    variant={isSelected ? "default" : "outline"}
                    className="w-full text-sm font-semibold"
                  >
                    <span>{isSelected ? "Plano Ativo no Simulador" : "Simular com este Plano"}</span>
                    {!isSelected && <ArrowRight className="h-4 w-4 ml-1.5" />}
                  </Button>
                </div>

                <CardContent className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                  {/* O que inclui na implantação */}
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase font-bold tracking-wider text-foreground">
                      Incluso na Implantação:
                    </h4>
                    <ul className="space-y-2 text-xs text-text-secondary">
                      {plano.itensImplantacao.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 text-brand shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* O que inclui na operação mensal */}
                  <div className="space-y-3 pt-3 border-t border-border-subtle">
                    <h4 className="text-xs uppercase font-bold tracking-wider text-foreground">
                      Incluso na Mensalidade:
                    </h4>
                    <ul className="space-y-2 text-xs text-text-secondary">
                      {plano.itensMensalidade.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 text-brand shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {unidades > 1 && planoSelecionado !== "multiunidade" && (
          <p className="text-xs text-center text-text-muted mt-6">
            Nota: Como você indicou mais de 1 filial no simulador, o plano Multiunidade é o recomendado para contemplar todos os locais físicos.
          </p>
        )}
      </div>
    </section>
  );
};
