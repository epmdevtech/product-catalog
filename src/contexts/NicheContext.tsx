import React, { createContext, useContext, useState, useMemo } from "react";
import type { NicheConfig } from "@/types/niche";
import {
  calculatePricing,
  type PricingSimulationResult,
  type PlanoId,
} from "@/lib/pricing";

export interface ProposalInfo {
  nomeNegocio?: string;
  responsavel?: string;
  validadeAte?: string;
  observacoes?: string;
  condicaoAVistaEspecial?: {
    tipo: "percentual" | "fixo";
    valor: number;
  };
}

interface NicheContextType {
  niche: NicheConfig;
  proposal?: ProposalInfo;
  profissionais: number;
  unidades: number;
  incluirWhatsApp: boolean;
  planoSelecionado: PlanoId;
  setProfissionais: (val: number) => void;
  setUnidades: (val: number) => void;
  setIncluirWhatsApp: (val: boolean) => void;
  setPlanoSelecionado: (val: PlanoId) => void;
  pricing: PricingSimulationResult;
}

const NicheContext = createContext<NicheContextType | undefined>(undefined);

export interface NicheProviderProps {
  niche: NicheConfig;
  proposal?: ProposalInfo;
  initialProfissionais?: number;
  initialUnidades?: number;
  initialPlano?: PlanoId;
  initialIncluirWhatsApp?: boolean;
  children: React.ReactNode;
}

export const NicheProvider: React.FC<NicheProviderProps> = ({
  niche,
  proposal,
  initialProfissionais = 1,
  initialUnidades = 1,
  initialPlano = "pro",
  initialIncluirWhatsApp = false,
  children,
}) => {
  const [profissionais, setProfissionais] = useState<number>(initialProfissionais);
  const [unidades, setUnidades] = useState<number>(initialUnidades);
  const [incluirWhatsApp, setIncluirWhatsApp] = useState<boolean>(initialIncluirWhatsApp);
  const [planoSelecionado, setPlanoSelecionado] = useState<PlanoId>(initialPlano);

  const pricing = useMemo(() => {
    return calculatePricing(niche, {
      profissionais,
      unidades,
      incluirWhatsApp,
      planoSelecionado,
    });
  }, [niche, profissionais, unidades, incluirWhatsApp, planoSelecionado]);

  const value = useMemo(
    () => ({
      niche,
      proposal,
      profissionais,
      unidades,
      incluirWhatsApp,
      planoSelecionado,
      setProfissionais,
      setUnidades,
      setIncluirWhatsApp,
      setPlanoSelecionado,
      pricing,
    }),
    [niche, proposal, profissionais, unidades, incluirWhatsApp, planoSelecionado, pricing]
  );

  return <NicheContext.Provider value={value}>{children}</NicheContext.Provider>;
};

export function useNiche(): NicheContextType {
  const context = useContext(NicheContext);
  if (!context) {
    throw new Error("useNiche deve ser utilizado dentro de um NicheProvider");
  }
  return context;
}
