import { ThemeProvider } from "next-themes";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { odontologia } from "@/data/niches/odontologia";
import { NicheProvider } from "@/contexts/NicheContext";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/sections/HeroSection";
import { PrinciplesSection } from "@/sections/PrinciplesSection";
import { SimulatorSection } from "@/sections/SimulatorSection";

import { PlansSection } from "@/sections/PlansSection";
import { RoiCalculatorSection } from "@/sections/RoiCalculatorSection";
import { PaymentTermsSection } from "@/sections/PaymentTermsSection";

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <Helmet>
          <title>Proposta | EPM DevTech</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <NicheProvider niche={odontologia}>
          <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Header />
            <main className="flex-1">
              <HeroSection />
              <PrinciplesSection />
              <SimulatorSection />
              <PlansSection />
              <RoiCalculatorSection />
              <PaymentTermsSection />
            </main>
          </div>
        </NicheProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
