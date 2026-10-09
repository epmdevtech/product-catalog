import React from "react";
import { HelpCircle, MessageSquare } from "lucide-react";
import { useNiche } from "@/contexts/NicheContext";
import { faqBase } from "@/data/faqBase";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export const FaqSection: React.FC = () => {
  const { niche } = useNiche();

  const perguntasNicho = niche.faq.map((item, i) => ({
    pergunta: item.pergunta,
    resposta: item.resposta,
    id: `faq-nicho-${i}`,
  }));

  const perguntasBase = faqBase.map((item, i) => ({
    pergunta: item.pergunta,
    resposta: item.resposta,
    id: `faq-base-${i}`,
  }));

  const todasPerguntas = [...perguntasNicho, ...perguntasBase];

  return (
    <section className="py-16 sm:py-24 border-b border-border-default/60">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="brandSubtle" className="mb-3 uppercase tracking-wider text-xs font-semibold gap-1.5">
            <HelpCircle className="h-3.5 w-3.5 text-brand" />
            <span>Tire Suas Dúvidas</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-text-secondary text-base sm:text-lg">
            Respostas claras para as principais dúvidas sobre a entrega, o funcionamento da plataforma e as condições comerciais.
          </p>
        </div>

        <div className="bg-card border border-border-default rounded-xl p-6 sm:p-8 shadow-xs">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {todasPerguntas.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="hover:no-underline">
                  <span>{item.pergunta}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-text-secondary">{item.resposta}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-8 text-center text-xs text-text-muted flex items-center justify-center gap-2">
          <MessageSquare className="h-4 w-4 text-brand" />
          <span>Ficou com alguma dúvida não listada aqui? Fale conosco diretamente pelo WhatsApp.</span>
        </div>
      </div>
    </section>
  );
};
