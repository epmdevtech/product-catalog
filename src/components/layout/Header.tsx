import React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-default/60 bg-background/85 backdrop-blur-md transition-colors duration-200">
      <div className="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        {/* Logo EPM DEVTECH Adaptativo */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="flex items-center gap-2 group select-none"
            aria-label="EPM DevTech — Propostas e Planos"
          >
            <img
              src="/logo-epm-devtech-light-sm.webp"
              alt="EPM DEVTECH"
              className="h-8 w-auto object-contain block dark:hidden"
              width={140}
              height={32}
            />
            <img
              src="/logo-emp-dev-tech-sm.webp"
              alt="EPM DEVTECH"
              className="h-8 w-auto object-contain hidden dark:block"
              width={140}
              height={32}
            />
          </a>
          <span className="hidden sm:inline-block text-xs uppercase tracking-wider text-text-muted border-l border-border-default pl-3 font-medium">
            Propostas & Planos
          </span>
        </div>

        {/* Ações: Theme Toggle e WhatsApp */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Alternar modo claro e escuro"
            className="text-text-secondary hover:text-foreground"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            asChild
            className="hidden sm:inline-flex gap-2 text-xs font-semibold"
          >
            <a
              href="https://wa.me/5585994246990?text=Ol%C3%A1!%20Estou%20na%20p%C3%A1gina%20de%20propostas%20da%20EPM%20DevTech%20e%20gostaria%20de%20tirar%20uma%20d%C3%BAvida."
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-3.5 w-3.5 text-brand" />
              <span>Falar com especialista</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};
