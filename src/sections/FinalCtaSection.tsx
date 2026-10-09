import React from "react";
import { MessageSquare, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { track } from "@vercel/analytics";
import { useNiche } from "@/contexts/NicheContext";
import { Button } from "@/components/ui/button";

export const FinalCtaSection: React.FC = () => {
  const { niche, proposal } = useNiche();

  const handleWhatsappClick = () => {
    try {
      track("whatsapp_clique", {
        nicho: niche.slug,
        origem: "final_cta",
        proposta: proposal?.slug ?? "generico",
      });
    } catch {
      // Ignora erro local
    }
  };

  const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(
    niche.whatsappMensagemTemplate
  )}`;

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-surface/50 border-b border-border-default/60">
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40" />

      <div className="container mx-auto max-w-4xl px-4 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-text-brand dark:text-brand text-xs font-semibold mb-6">
          <ShieldCheck className="h-4 w-4" />
          <span>Atendimento Direto com Especialista Técnico</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-6">
          Pronto para profissionalizar sua presença digital?
        </h2>

        <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Inicie sua contratação hoje mesmo ou esclareça qualquer detalhe sobre prazos, regras e integrações diretamente pelo WhatsApp.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto text-base font-bold px-8 shadow-md"
            onClick={handleWhatsappClick}
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageSquare className="h-5 w-5 mr-2" />
              <span>Falar no WhatsApp com o Consultor</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto text-sm font-semibold"
          >
            <a href="mailto:contato@epmdevtech.com.br">
              <Mail className="h-4 w-4 mr-2 text-text-muted" />
              <span>Enviar Dúvida por E-mail</span>
            </a>
          </Button>
        </div>

        <p className="text-xs text-text-muted mt-6">
          Resposta em até poucas horas durante dias úteis • Sem compromisso
        </p>
      </div>
    </section>
  );
};
