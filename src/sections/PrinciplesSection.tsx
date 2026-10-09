import React from "react";
import { CheckCircle2, ShieldCheck, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const PrinciplesSection: React.FC = () => {
  const principles = [
    {
      icon: CheckCircle2,
      title: "Implantação é pagamento único",
      description:
        "O investimento de criação, design personalizado e configuração técnica é pago uma única vez. Não cobramos taxas ocultas nem cobranças inesperadas.",
    },
    {
      icon: Clock,
      title: "Mensalidade só começa na publicação",
      description:
        "A mensalidade garante servidores dedicados, backups automáticos e suporte contínuo. A primeira fatura só começa a contar quando sua plataforma estiver oficialmente no ar.",
    },
    {
      icon: ShieldCheck,
      title: "Você aprova antes de publicar (homologação)",
      description:
        "Disponibilizamos um link fechado de homologação para você testar tudo com tranquilidade antes do lançamento. A publicação só ocorre após seu aval formal.",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-surface/50 border-b border-border-default/60">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
            Compromisso e Transparência Comercial
          </h2>
          <p className="text-sm sm:text-base text-text-secondary">
            Três princípios inegociáveis que norteiam a nossa relação de engenharia e prestação de serviços.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {principles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card
                key={idx}
                className="border-border-default hover:border-brand/40 hover:shadow-md transition-all duration-300 bg-card/80"
              >
                <CardContent className="p-6 sm:p-7 flex flex-col h-full">
                  <div className="h-11 w-11 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center mb-5 text-brand shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed mt-auto">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
