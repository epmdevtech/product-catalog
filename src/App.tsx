import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { HomePage } from "@/pages/HomePage";
import { NichePage } from "@/pages/NichePage";
import { ProposalPage } from "@/pages/ProposalPage";

// Import dinâmico do painel de desenvolvimento condicionado a DEV
// Em produção, import.meta.env.DEV é `false` e o Rollup/Vite elimina o módulo via Dead Code Elimination
const DevInternalPage = import.meta.env.DEV
  ? lazy(() => import("@/pages/InternalDevPage"))
  : null;

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {import.meta.env.DEV && DevInternalPage && (
              <Route
                path="/interno"
                element={
                  <Suspense fallback={<div className="min-h-screen bg-background" />}>
                    <DevInternalPage />
                  </Suspense>
                }
              />
            )}
            <Route path="/proposta/:slug" element={<ProposalPage />} />
            <Route path="/:nicho" element={<NichePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        <Analytics />
        <SpeedInsights />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
