import React from "react";
import { ArrowDown, ExternalLink, Sparkles, Calendar } from "lucide-react";
import { useNiche } from "@/contexts/NicheContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const HeroSection: React.FC = () => {
  const { niche, proposal } = useNiche();

  const handleScrollToSimulator = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("simulador");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-border-default/60">
      {/* Detalhes de Fundo Sutis da Identidade EPM */}
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none opacity-60" />
      <div className="absolute top-0 right-1/2 translate-x-1/2 -z-10 w-[600px] h-[300px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-5xl px-4 relative z-10 text-center">
        {/* Badge Institucional ou de Proposta Personalizada */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {proposal?.nomeNegocio ? (
            <Badge variant="brandSubtle" className="py-1 px-3.5 text-xs sm:text-sm font-semibold gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              <span>Proposta personalizada para {proposal.nomeNegocio}</span>
            </Badge>
          ) : (
            <Badge variant="brandSubtle" className="py-1 px-3 text-xs uppercase tracking-wider font-semibold gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              <span>Plataforma Premium + EPM Booking</span>
            </Badge>
          )}

          {proposal?.validadeAte && (
            <span className="inline-flex items-center gap-1 text-xs text-text-muted bg-surface border border-border-default px-2.5 py-1 rounded-full">
              <Calendar className="h-3 w-3" />
              <span>Proposta válida até {proposal.validadeAte}</span>
            </span>
          )}
        </div>

        {/* Título e Subtítulo Dinâmicos do Nicho */}
        <h1 className="editorial-h1 text-foreground mb-6 max-w-4xl mx-auto tracking-tight">
          {niche.hero.titulo}
        </h1>

        <p className="editorial-body text-text-secondary max-w-2xl mx-auto mb-10 text-base sm:text-lg leading-relaxed">
          {niche.hero.subtitulo}
        </p>

        {/* Ações / CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-md mx-auto">
          <Button
            size="lg"
            className="w-full sm:w-auto gap-2 text-base font-semibold shadow-md"
            asChild
          >
            <a href="#simulador" onClick={handleScrollToSimulator}>
              <span>Montar minha proposta</span>
              <ArrowDown className="h-4 w-4" />
            </a>
          </Button>

          {niche.demoUrl && niche.demoUrl.trim().length > 0 && (
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto gap-2 text-base font-semibold"
              asChild
            >
              <a
                href={niche.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir demonstração interativa em nova aba"
              >
                <span>Ver demonstração</span>
                <ExternalLink className="h-4 w-4 text-text-muted" />
              </a>
            </Button>
          )}
        </div>

        {/* Responsável técnico caso exista na proposta */}
        {proposal?.responsavel && (
          <p className="mt-8 text-xs text-text-muted">
            Apresentado a: <strong className="text-foreground">{proposal.responsavel}</strong> • Consultoria técnica EPM DevTech
          </p>
        )}
      </div>
    </section>
  );
};
