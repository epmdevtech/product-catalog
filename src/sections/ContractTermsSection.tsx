import React from "react";
import { FileText, Shield, Clock, XCircle, Award } from "lucide-react";
import { useNiche } from "@/contexts/NicheContext";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// TODO: Revisão jurídica final das cláusulas contratuais
export const ContractTermsSection: React.FC = () => {
  const { niche } = useNiche();

  const termos = [
    {
      titulo: `Prazo Mínimo (${niche.contrato.prazoMinimoMeses} meses)`,
      descricao: `Período contratual inicial de ${niche.contrato.prazoMinimoMeses} meses para assegurar amortização e estabilidade da infraestrutura dedicada.`,
      icone: <Clock className="h-5 w-5 text-brand" />,
    },
    {
      titulo: "Política de Cancelamento",
      descricao: niche.contrato.regraCancelamento,
      icone: <XCircle className="h-5 w-5 text-brand" />,
    },
    {
      titulo: "Titularidade de Domínio e Dados",
      descricao: `${niche.contrato.titularidadeDominio} ${niche.contrato.titularidadeDados}`,
      icone: <Award className="h-5 w-5 text-brand" />,
    },
    {
      titulo: "Publicação e Aceite Formal",
      descricao: niche.contrato.regraPublicacao,
      icone: <Shield className="h-5 w-5 text-brand" />,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-surface/30 border-b border-border-default/60">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="brandSubtle" className="mb-3 uppercase tracking-wider text-xs font-semibold gap-1.5">
            <FileText className="h-3.5 w-3.5 text-brand" />
            <span>Compromisso Formal</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Termos de Contrato e Segurança Mútua
          </h2>
          <p className="text-text-secondary text-base sm:text-lg">
            Relação comercial transparente, fundamentada em contrato de prestação de serviços com emissão de nota fiscal e responsabilidade técnica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {termos.map((item, idx) => (
            <Card key={idx} className="border border-border-default bg-card shadow-xs">
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0">
                    {item.icone}
                  </div>
                  <h3 className="text-base font-bold text-foreground">{item.titulo}</h3>
                </div>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed pt-1">
                  {item.descricao}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-text-muted italic">
            * As cláusulas detalhadas serão formalizadas no instrumento contratual definitivo de prestação de serviços e SLA antes do início do desenvolvimento.
          </p>
        </div>
      </div>
    </section>
  );
};
