import React from "react";
import { ShieldCheck, Server, MessageSquare, Mail } from "lucide-react";
import { CONTACT_INFO, getWhatsAppUrl } from "@/data/contact";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface/90 border-t border-border-default/80 pt-16 pb-12 text-text-secondary">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Aviso Obrigatório em Destaque */}
        <div className="mb-12 p-4 rounded-xl bg-card border border-border-default text-center">
          <p className="text-xs sm:text-sm font-semibold text-text-muted">
            * Valores de referência, sujeitos a ajuste conforme o escopo de cada projeto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-border-default/60">
          {/* Coluna 1: Marca e Posicionamento */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
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
            </div>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-sm">
              Software house com mais de 9 anos de experiência em engenharia de software de alta performance, desenvolvimento web e sistemas corporativos escaláveis.
            </p>
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Infraestrutura em nuvem operando com 99.9% de uptime</span>
            </div>
          </div>

          {/* Coluna 2: Diferenciais Técnicos */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-foreground">
              Engenharia Própria
            </h4>
            <ul className="space-y-2 text-xs text-text-secondary">
              <li className="flex items-center gap-2">
                <Server className="h-3.5 w-3.5 text-brand" />
                <span>Hospedagem em nuvem de baixa latência</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-brand" />
                <span>Isolamento e conformidade LGPD</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-brand" />
                <span>Backups automatizados diários</span>
              </li>
              <li className="flex items-center gap-2">
                <Server className="h-3.5 w-3.5 text-brand" />
                <span>Tecnologia sem intermediários</span>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Contato Oficial */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-foreground">
              Atendimento & Suporte
            </h4>
            <div className="space-y-2 text-xs text-text-secondary">
              <p>{CONTACT_INFO.horarioAtendimento}</p>
              <p className="flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5 text-brand shrink-0" />
                <span>WhatsApp:</span>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:underline font-semibold"
                >
                  {CONTACT_INFO.whatsappFormatted}
                </a>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-brand shrink-0" />
                <span>E-mail:</span>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-brand hover:underline font-semibold"
                >
                  {CONTACT_INFO.email}
                </a>
              </p>
              <p className="text-[11px] text-text-muted pt-1">
                Atendimento remoto especializado para todo o Brasil
              </p>
            </div>
          </div>
        </div>

        {/* Linha Inferior: Copyright e Informações Legais */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>© {currentYear} EPM DEVTECH. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Privacidade & LGPD</span>
            <span>•</span>
            <span>Contrato de Nível de Serviço (SLA)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
