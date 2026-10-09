import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ExternalLink,
  Layers,
  FileCheck,
  Building2,
  Calendar,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { getAllNiches } from "@/data/niches";
import { proposals } from "@/data/proposals";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const HomePage: React.FC = () => {
  const niches = getAllNiches();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Helmet>
        <title>Catálogo & Propostas | EPM DevTech</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Header />

      <main className="flex-1 py-12 sm:py-16">
        <div className="container mx-auto max-w-6xl px-4 space-y-16">
          {/* Header Interno */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="brandSubtle" className="uppercase tracking-wider text-xs font-bold gap-1.5 py-1 px-3">
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              <span>Painel Interno de Propostas Comerciais</span>
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
              Catálogo de Planos e Propostas
            </h1>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              Ambiente comercial da EPM DevTech para visualização e envio de páginas de proposta. Selecione um segmento padrão ou uma proposta nominal personalizada.
            </p>
          </div>

          {/* Seção 1: Páginas Comerciais por Segmento */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-border-default/60">
              <Layers className="h-5 w-5 text-brand" />
              <h2 className="text-xl font-bold text-foreground">Páginas de Demonstração por Segmento</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {niches.map((niche) => (
                <Card
                  key={niche.slug}
                  className="border border-border-default hover:border-brand/50 transition-all bg-card shadow-xs flex flex-col justify-between rounded-xl overflow-hidden group"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <Badge variant="outline" className="font-mono text-xs uppercase tracking-wider text-text-muted">
                        /{niche.slug}
                      </Badge>
                      <Badge variant="brandSubtle" className="text-[11px] capitalize">
                        Tom: {niche.tom}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-brand transition-colors">
                        {niche.hero.titulo}
                      </h3>
                      <p className="text-xs text-text-secondary mt-1.5 line-clamp-2 leading-relaxed">
                        {niche.hero.subtitulo}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-xs text-text-muted">
                      <span>Termo principal:</span>
                      <strong className="text-foreground font-medium">
                        {niche.termos.profissional.plural}
                      </strong>
                    </div>

                    <Button asChild className="w-full text-xs font-semibold mt-2" variant="outline">
                      <Link to={`/${niche.slug}`}>
                        <span>Abrir Página do Segmento</span>
                        <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Seção 2: Propostas Personalizadas Ativas */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-border-default/60">
              <FileCheck className="h-5 w-5 text-brand" />
              <h2 className="text-xl font-bold text-foreground">Propostas Personalizadas Ativas</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {proposals.map((prop) => (
                <Card
                  key={prop.slug}
                  className="border border-border-default hover:border-brand/50 transition-all bg-card shadow-xs flex flex-col justify-between rounded-xl overflow-hidden group"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <Badge variant="brand" className="text-[10px] uppercase font-bold tracking-wider">
                        Proposta Nominal
                      </Badge>
                      <span className="text-[11px] text-text-muted flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Até {prop.validadeAte}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-foreground group-hover:text-brand transition-colors flex items-center gap-1.5">
                        <Building2 className="h-4 w-4 text-brand shrink-0" />
                        <span className="truncate">{prop.nomeNegocio}</span>
                      </h3>
                      {prop.responsavel && (
                        <p className="text-xs text-text-muted mt-1">
                          A/C: {prop.responsavel}
                        </p>
                      )}
                    </div>

                    <div className="bg-surface p-3 rounded-lg border border-border-subtle space-y-1 text-xs">
                      <div className="flex justify-between text-text-secondary">
                        <span>Plano indicado:</span>
                        <strong className="text-foreground uppercase">{prop.plano}</strong>
                      </div>
                      <div className="flex justify-between text-text-secondary">
                        <span>Estrutura:</span>
                        <span className="text-foreground font-medium">
                          {prop.profissionais} prof. • {prop.unidades} un.
                        </span>
                      </div>
                    </div>

                    <Button asChild className="w-full text-xs font-semibold" variant="default">
                      <Link to={`/proposta/${prop.slug}`}>
                        <span>Visualizar Proposta</span>
                        <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
