import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { track } from "@vercel/analytics";
import { loadProposal, type Proposal } from "@/data/proposals";
import { getNicheBySlug } from "@/data/niches";
import { NicheProvider } from "@/contexts/NicheContext";
import { Header } from "@/components/layout/Header";
import { ProposalBanner } from "@/components/proposal/ProposalBanner";
import { HeroSection } from "@/sections/HeroSection";
import { PrinciplesSection } from "@/sections/PrinciplesSection";
import { SimulatorSection } from "@/sections/SimulatorSection";
import { PlansSection } from "@/sections/PlansSection";
import { RoiCalculatorSection } from "@/sections/RoiCalculatorSection";
import { PaymentTermsSection } from "@/sections/PaymentTermsSection";
import { IncludedVsExtraSection } from "@/sections/IncludedVsExtraSection";
import { SecuritySection } from "@/sections/SecuritySection";
import { FaqSection } from "@/sections/FaqSection";
import { ContractTermsSection } from "@/sections/ContractTermsSection";
import { FinalCtaSection } from "@/sections/FinalCtaSection";
import { Footer } from "@/components/layout/Footer";

export const ProposalPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  // undefined: carregando | null: não encontrada/inválida | Proposal: encontrada
  const [proposal, setProposal] = useState<Proposal | null | undefined>(undefined);

  useEffect(() => {
    if (!slug) {
      setProposal(null);
      return;
    }
    let isMounted = true;
    loadProposal(slug).then((data) => {
      if (isMounted) {
        setProposal(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [slug]);

  useEffect(() => {
    if (!proposal) return;
    try {
      track("proposta_aberta", {
        slug: proposal.slug,
        nicho: proposal.nichoSlug,
        cliente: proposal.nomeNegocio,
      });
    } catch {
      // Ignora erro local de tracking
    }
  }, [proposal]);

  // Enquanto carrega sob demanda
  if (proposal === undefined) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center select-none">
        <div className="h-6 w-6 rounded-full border-2 border-brand border-t-transparent animate-spin" />
      </div>
    );
  }

  // Slug inexistente redireciona para "/" silenciosamente sem mensagem de erro
  if (!proposal) {
    return <Navigate to="/" replace />;
  }

  const niche = getNicheBySlug(proposal.nichoSlug);

  if (!niche) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{`Proposta para ${proposal.nomeNegocio} | EPM DevTech`}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <NicheProvider
        niche={niche}
        proposal={proposal}
        initialProfissionais={proposal.profissionais}
        initialUnidades={proposal.unidades}
        initialPlano={proposal.plano}
        initialIncluirWhatsApp={proposal.incluirWhatsApp}
      >
        <div className="min-h-screen bg-background text-foreground flex flex-col">
          <Header />
          <ProposalBanner proposal={proposal} />
          <main className="flex-1">
            <HeroSection />
            <PrinciplesSection />
            <SimulatorSection />
            <PlansSection />
            <RoiCalculatorSection />
            <PaymentTermsSection />
            <IncludedVsExtraSection />
            <SecuritySection />
            <FaqSection />
            <ContractTermsSection />
            <FinalCtaSection />
          </main>
          <Footer />
        </div>
      </NicheProvider>
    </>
  );
};
