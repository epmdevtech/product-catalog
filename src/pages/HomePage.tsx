import React from "react";
import { Helmet } from "react-helmet-async";

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 select-none">
      <Helmet>
        <title>EPM DevTech</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-md w-full text-center space-y-6">
        {/* Logo Adaptativo Light/Dark */}
        <div className="flex justify-center">
          <img
            src="/logo-epm-devtech-light-sm.webp"
            alt="EPM DevTech"
            className="h-10 w-auto object-contain block dark:hidden"
            width={160}
            height={40}
          />
          <img
            src="/logo-emp-dev-tech-sm.webp"
            alt="EPM DevTech"
            className="h-10 w-auto object-contain hidden dark:block"
            width={160}
            height={40}
          />
        </div>

        {/* Mensagem Neutra Obrigatória */}
        <p className="text-sm sm:text-base text-text-secondary font-medium tracking-tight">
          Acesse esta página pelo link da sua proposta.
        </p>
      </div>
    </div>
  );
};
