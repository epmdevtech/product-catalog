import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getNicheBySlug } from "@/data/niches";
import { NicheProvider } from "@/contexts/NicheContext";
import { Header } from "@/components/layout/Header";
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

export const NichePage: React.FC = () => {
  const { nicho: nichoParam } = useParams<{ nicho: string }>();

  if (!nichoParam) {
    return <Navigate to="/" replace />;
  }

  const niche = getNicheBySlug(nichoParam);

  if (!niche) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{`${niche.hero.titulo} | EPM DevTech`}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <NicheProvider niche={niche}>
        <div className="min-h-screen bg-background text-foreground flex flex-col">
          <Header />
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
