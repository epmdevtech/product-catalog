import { ThemeProvider } from "next-themes";
import { HelmetProvider, Helmet } from "react-helmet-async";

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <Helmet>
          <title>Proposta | EPM DevTech</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6">
          <div className="max-w-md w-full text-center space-y-4">
            <img
              src="/logo-epm-devtech-light-sm.webp"
              alt="EPM DEVTECH"
              className="h-10 mx-auto object-contain block dark:hidden"
            />
            <img
              src="/logo-emp-dev-tech-sm.webp"
              alt="EPM DEVTECH"
              className="h-10 mx-auto object-contain hidden dark:block"
            />
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Plataforma de Propostas e Planos
            </h1>
            <p className="text-sm text-muted-foreground">
              EPM DevTech — Engenharia de Software e Soluções Digitais
            </p>
          </div>
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
