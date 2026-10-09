import React from "react";
import { ShieldCheck, Lock, Server, Database, KeyRound } from "lucide-react";
import { useNiche } from "@/contexts/NicheContext";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const SecuritySection: React.FC = () => {
  const { niche } = useNiche();

  const iconesSeguranca = [
    <Lock className="h-5 w-5 text-brand" key="lock" />,
    <Server className="h-5 w-5 text-brand" key="server" />,
    <Database className="h-5 w-5 text-brand" key="db" />,
    <KeyRound className="h-5 w-5 text-brand" key="key" />,
  ];

  return (
    <section className="py-16 sm:py-24 bg-surface/30 border-b border-border-default/60">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="brandSubtle" className="mb-3 uppercase tracking-wider text-xs font-semibold gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-brand" />
            <span>Infraestrutura & Conformidade</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            {niche.seguranca.titulo}
          </h2>
          <p className="text-text-secondary text-base sm:text-lg">
            Engenharia de software com mais de 9 anos de mercado. Seu negócio não depende de ferramentas improvisadas ou servidores instáveis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {niche.seguranca.itens.map((item, index) => (
            <Card key={index} className="border border-border-default bg-card shadow-xs">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0">
                  {iconesSeguranca[index % iconesSeguranca.length]}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground mb-1">
                    {item.titulo}
                  </h4>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {item.descricao}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Box de Tratamento de Dados e Sigilo */}
        <div className="p-6 sm:p-7 rounded-xl bg-card border border-brand/30 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-brand/15 border border-brand/30 flex items-center justify-center text-brand shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-foreground">
                Titularidade e Sigilo Inviolável
              </h4>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {niche.seguranca.textoTratamentoDados}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
