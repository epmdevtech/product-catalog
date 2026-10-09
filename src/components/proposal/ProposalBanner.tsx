import React from "react";
import { Building2, Calendar, UserCheck, Sparkles, Info } from "lucide-react";
import type { Proposal } from "@/data/proposals";
import { Badge } from "@/components/ui/badge";

interface ProposalBannerProps {
  proposal: Proposal;
}

export const ProposalBanner: React.FC<ProposalBannerProps> = ({ proposal }) => {
  return (
    <div className="bg-gradient-to-r from-surface to-card border-b border-brand/30 py-4 px-4 sticky top-16 z-40 backdrop-blur-md bg-opacity-95">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Informações Principais */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="brand" className="text-[10px] uppercase font-bold tracking-wider py-0.5 px-2">
                <Sparkles className="h-3 w-3 mr-1" />
                Proposta Personalizada
              </Badge>
              <span className="text-xs font-semibold text-text-muted">
                Emitida em {proposal.criadoEm}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-lg font-extrabold text-foreground flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-brand" />
                <span>{proposal.nomeNegocio}</span>
              </h1>
              {proposal.responsavel && (
                <span className="text-xs text-text-secondary flex items-center gap-1">
                  • <UserCheck className="h-3.5 w-3.5 text-text-muted" /> A/C: {proposal.responsavel}
                </span>
              )}
            </div>
          </div>

          {/* Validade e Alerta */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-border-default text-xs">
              <Calendar className="h-4 w-4 text-brand" />
              <div className="text-left">
                <span className="text-[10px] text-text-muted block leading-none">Válida até</span>
                <strong className="text-foreground font-bold">{proposal.validadeAte}</strong>
              </div>
            </div>
          </div>
        </div>

        {proposal.observacoes && (
          <div className="mt-2.5 pt-2 border-t border-border-subtle flex items-start gap-2 text-xs text-text-muted">
            <Info className="h-3.5 w-3.5 text-brand shrink-0 mt-0.5" />
            <span>{proposal.observacoes}</span>
          </div>
        )}
      </div>
    </div>
  );
};
