import React from "react";
import { MessageCircle, Users, Building2, BellRing, Sparkles, Plus, Minus } from "lucide-react";
import { track } from "@vercel/analytics";
import { useNiche } from "@/contexts/NicheContext";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { pricingTable } from "@/data/pricing";

export const SimulatorSection: React.FC = () => {
  const {
    niche,
    proposal,
    profissionais,
    unidades,
    incluirWhatsApp,
    setProfissionais,
    setUnidades,
    setIncluirWhatsApp,
    pricing,
  } = useNiche();

  const handleProfissionaisChange = (values: number[]) => {
    const val = values[0] || 1;
    setProfissionais(val);
    try {
      track("simulador_alterado", { nicho: niche.slug, profissionais: val, unidades });
    } catch {
      // Ignora falha de analytics em ambiente local
    }
  };

  const handleUnidadesChange = (novoValor: number) => {
    const clamped = Math.min(4, Math.max(1, novoValor));
    setUnidades(clamped);
    try {
      track("simulador_alterado", { nicho: niche.slug, profissionais, unidades: clamped });
    } catch {
      // Ignora falha de analytics em ambiente local
    }
  };

  const getRotuloPerfil = () => {
    switch (pricing.perfilIdentificado) {
      case "solo":
        return `Atendimento Individual (1 ${niche.termos.profissional.singular})`;
      case "pequena":
        return `Equipe Pequena (2 a 4 ${niche.termos.profissional.plural})`;
      case "media":
        return `Equipe em Expansão (5 a 10 ${niche.termos.profissional.plural})`;
      case "multiunidade":
        return `Estrutura Multiunidade (${unidades} ${niche.termos.unidade.plural})`;
      default:
        return "Estrutura Personalizada";
    }
  };

  const planoNomeFormatado =
    pricing.planoRecomendado === "multiunidade" ? "Multiunidade" : "Pro";

  const gerarMensagemWhatsApp = () => {
    let msg = niche.whatsappMensagemTemplate;
    msg = msg.replace("{plano}", planoNomeFormatado);
    msg = msg.replace("{profissionais}", String(profissionais));
    msg = msg.replace("{unidades}", String(unidades));
    msg = msg.replace("{implantacao}", pricing.implantacaoTotal.toLocaleString("pt-BR"));
    msg = msg.replace("{mensalidade}", pricing.mensalidadeTotal.toLocaleString("pt-BR"));

    if (proposal?.nomeNegocio) {
      msg = `[Proposta: ${proposal.nomeNegocio}] ` + msg;
    }
    return encodeURIComponent(msg);
  };

  const handleEnviarWhatsApp = () => {
    try {
      track("whatsapp_clique", {
        nicho: niche.slug,
        origem: "simulador",
        plano: planoNomeFormatado,
      });
    } catch {
      // Ignora erro em dev
    }
    const url = `https://wa.me/5585994246990?text=${gerarMensagemWhatsApp()}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="simulador" className="py-16 sm:py-24 border-b border-border-default/60 scroll-mt-20">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <Badge variant="brandSubtle" className="mb-3 uppercase tracking-wider text-xs font-semibold">
            Simulador Interativo
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Simule o investimento exato para a sua estrutura
          </h2>
          <p className="text-text-secondary text-base sm:text-lg">
            Ajuste a quantidade de pessoas atendendo e unidades físicas para descobrir o plano ideal em tempo real.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controles do Simulador (Coluna Esquerda) */}
          <div className="lg:col-span-7 space-y-8 bg-card border border-border-default rounded-xl p-6 sm:p-8 shadow-sm">
            {/* Controle 1: Profissionais */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="slider-profissionais"
                  className="flex items-center gap-2 text-sm sm:text-base font-semibold text-foreground"
                >
                  <Users className="h-4 w-4 text-brand" />
                  <span>Quantidade de {niche.termos.profissional.plural} na agenda</span>
                </label>
                <span className="text-lg font-bold text-foreground bg-surface border border-border-default px-3 py-1 rounded-md min-w-[70px] text-center">
                  {profissionais}{" "}
                  <span className="text-xs font-normal text-text-muted">
                    {profissionais === 1
                      ? niche.termos.profissional.singular
                      : niche.termos.profissional.plural}
                  </span>
                </span>
              </div>

              <Slider
                id="slider-profissionais"
                min={1}
                max={15}
                step={1}
                value={[profissionais]}
                onValueChange={handleProfissionaisChange}
                aria-label={`Quantidade de ${niche.termos.profissional.plural}`}
              />

              <div className="flex justify-between text-xs text-text-muted">
                <span>1 {niche.termos.profissional.singular}</span>
                <span>5 {niche.termos.profissional.plural}</span>
                <span>10 {niche.termos.profissional.plural}</span>
                <span>15+ {niche.termos.profissional.plural}</span>
              </div>

              {profissionais > 10 && unidades === 1 && (
                <p className="text-xs text-text-muted bg-surface p-2.5 rounded-md border border-border-subtle">
                  * Acima de 10 na mesma estrutura: acréscimo de R${" "}
                  {pricingTable.adicionalProfissionalMensal}/mês por profissional adicional.
                </p>
              )}
            </div>

            {/* Controle 2: Unidades Físicas */}
            <div className="space-y-4 pt-4 border-t border-border-default/60">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm sm:text-base font-semibold text-foreground">
                  <Building2 className="h-4 w-4 text-brand" />
                  <span>Quantidade de {niche.termos.unidade.plural} físicas</span>
                </span>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleUnidadesChange(unidades - 1)}
                    disabled={unidades <= 1}
                    aria-label={`Diminuir quantidade de ${niche.termos.unidade.plural}`}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </Button>

                  <span className="text-base font-bold text-foreground w-8 text-center">
                    {unidades}
                  </span>

                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleUnidadesChange(unidades + 1)}
                    disabled={unidades >= 4}
                    aria-label={`Aumentar quantidade de ${niche.termos.unidade.plural}`}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleUnidadesChange(num)}
                    className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-lg border transition-all text-center ${
                      unidades === num
                        ? "border-brand bg-brand/10 text-text-brand dark:text-brand font-bold"
                        : "border-border-default hover:border-border-strong text-text-secondary"
                    }`}
                  >
                    {num} {num === 1 ? niche.termos.unidade.singular : niche.termos.unidade.plural}
                  </button>
                ))}
              </div>

              {unidades > 2 && (
                <p className="text-xs text-text-muted bg-surface p-2.5 rounded-md border border-border-subtle">
                  * Unidade adicional além de 2: + R${" "}
                  {pricingTable.adicionalUnidadeImplantacao.toLocaleString("pt-BR")} (taxa única de configuração) e + R${" "}
                  {pricingTable.adicionalUnidadeMensal}/mês.
                </p>
              )}
            </div>

            {/* Controle 3: Add-on WhatsApp */}
            <div className="pt-4 border-t border-border-default/60 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <label
                  htmlFor="switch-whatsapp"
                  className="flex items-center gap-2 text-sm sm:text-base font-semibold text-foreground cursor-pointer"
                >
                  <BellRing className="h-4 w-4 text-brand" />
                  <span>Incluir lembretes automáticos por WhatsApp</span>
                </label>
                <p className="text-xs text-text-muted leading-relaxed">
                  Disparos automáticos antes do horário marcado para reduzir faltas e esquecimentos (+ R${" "}
                  {pricingTable.lembretesWhatsAppMensal}/mês).
                </p>
              </div>

              <Switch
                id="switch-whatsapp"
                checked={incluirWhatsApp}
                onCheckedChange={setIncluirWhatsApp}
                aria-label="Incluir lembretes automáticos por WhatsApp"
              />
            </div>
          </div>

          {/* Resultado da Simulação (Coluna Direita - Cartão de Preço) */}
          <div className="lg:col-span-5">
            <Card className="border-2 border-brand/50 bg-card shadow-lg sticky top-24 overflow-hidden">
              <div className="bg-brand/10 border-b border-brand/20 p-4 sm:p-5 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-xs uppercase font-bold tracking-wider text-text-brand dark:text-brand flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Perfil Identificado</span>
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-foreground">
                    {getRotuloPerfil()}
                  </h3>
                </div>
                <Badge variant="default" className="text-xs font-semibold py-1">
                  Plano {planoNomeFormatado}
                </Badge>
              </div>

              <CardContent className="p-6 sm:p-7 space-y-6">
                {/* BLOCO 1: Implantação (Pagamento Único) */}
                <div className="p-4 rounded-lg bg-surface border border-border-default space-y-1">
                  <div className="flex items-center justify-between text-xs text-text-muted font-medium uppercase tracking-wider">
                    <span>Implantação</span>
                    <span className="text-[10px] bg-secondary px-2 py-0.5 rounded text-foreground font-semibold">
                      Pagamento único
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 pt-1">
                    <span className="text-xs text-text-muted">a partir de</span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-foreground">
                      R$ {pricing.implantacaoTotal.toLocaleString("pt-BR")}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted pt-1">
                    Cobre design premium, personalização, configuração técnica e publicação oficial.
                  </p>
                </div>

                {/* BLOCO 2: Operação (Mensalidade) */}
                <div className="p-4 rounded-lg bg-surface border border-border-default space-y-1">
                  <div className="flex items-center justify-between text-xs text-text-muted font-medium uppercase tracking-wider">
                    <span>Operação & Suporte</span>
                    <span className="text-[10px] bg-secondary px-2 py-0.5 rounded text-foreground font-semibold">
                      A partir da publicação
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 pt-1">
                    <span className="text-xs text-text-muted">a partir de</span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-foreground">
                      R$ {pricing.mensalidadeTotal.toLocaleString("pt-BR")}
                    </span>
                    <span className="text-xs text-text-muted font-medium">/mês</span>
                  </div>
                  <p className="text-xs text-text-muted pt-1">
                    Cobre infraestrutura de nuvem, backups diários, monitoramento e o sistema EPM Booking no ar.
                  </p>
                </div>

                <div className="pt-2">
                  <Button
                    onClick={handleEnviarWhatsApp}
                    size="lg"
                    className="w-full gap-2 text-base font-bold shadow-md bg-brand text-on-brand hover:bg-brand-hover"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Enviar esta simulação pelo WhatsApp</span>
                  </Button>
                  <p className="text-[11px] text-center text-text-muted mt-2.5">
                    Você falará diretamente com nossa equipe técnica de propostas.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
