import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Layers,
  FileCheck,
  Building2,
  Calendar,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  KeyRound,
  ExternalLink,
} from "lucide-react";
import { getAllNiches } from "@/data/niches";
import { getAllProposalsForDev, type Proposal } from "@/data/proposals";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const InternalDevPage: React.FC = () => {
  const niches = getAllNiches();
  const [propostas, setPropostas] = useState<Proposal[]>([]);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // Gerador de slug interativo no painel
  const [nomeCurtoInput, setNomeCurtoInput] = useState("");
  const [generatedSlug, setGeneratedSlug] = useState("");
  const [slugCopied, setSlugCopied] = useState(false);

  useEffect(() => {
    getAllProposalsForDev().then((list) => setPropostas(list));
  }, []);

  const handleCopyLink = (path: string, id: string) => {
    const fullUrl = `${window.location.origin}${path}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedSlug(id);
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  const handleGenerateSlug = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeCurtoInput.trim()) return;

    // Normaliza nome curto: remove acentos e caracteres especiais
    const cleanName = nomeCurtoInput
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    // Gera token aleatório de 8 caracteres [a-z0-9]
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    for (let i = 0; i < 8; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const finalSlug = `${cleanName}-${token}`;
    setGeneratedSlug(finalSlug);
    setSlugCopied(false);
  };

  const handleCopyGeneratedSlug = () => {
    if (!generatedSlug) return;
    navigator.clipboard.writeText(generatedSlug);
    setSlugCopied(true);
    setTimeout(() => setSlugCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Helmet>
        <title>Painel Interno (DEV) | EPM DevTech</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Header />

      <main className="flex-1 py-12 sm:py-16">
        <div className="container mx-auto max-w-6xl px-4 space-y-12">
          {/* Header do Painel */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="brandSubtle" className="uppercase tracking-wider text-xs font-bold gap-1.5 py-1 px-3">
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              <span>Ambiente de Desenvolvimento Local (DEV ONLY)</span>
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
              Painel de Demonstrações & Propostas
            </h1>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              Esta rota existe apenas durante desenvolvimento local (<code className="text-xs bg-surface px-1.5 py-0.5 rounded border border-border-default">import.meta.env.DEV</code>) e é removida automaticamente no build de produção.
            </p>
          </div>

          {/* Ferramenta: Gerador de Slugs Imprevisíveis */}
          <Card className="border border-brand/40 bg-card/90 shadow-sm max-w-2xl mx-auto rounded-xl">
            <CardContent className="p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-border-subtle">
                <KeyRound className="h-5 w-5 text-brand" />
                <h3 className="text-lg font-bold text-foreground">Gerador de Slugs Imprevisíveis</h3>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Gere um identificador no formato padrão <code className="font-mono text-brand font-semibold">&#123;nome-curto&#125;-&#123;token8&#125;</code> para novas propostas.
              </p>

              <form onSubmit={handleGenerateSlug} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Ex: clinica-exemplo, escritorio-silva"
                  value={nomeCurtoInput}
                  onChange={(e) => setNomeCurtoInput(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-lg border border-border-default bg-surface text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-focus-ring"
                />
                <Button type="submit" variant="default" className="text-xs font-bold whitespace-nowrap">
                  <span>Gerar Slug</span>
                </Button>
              </form>

              {generatedSlug && (
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-lg bg-surface border border-border-subtle">
                  <span className="font-mono text-xs font-bold text-brand select-all">
                    {generatedSlug}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-xs gap-1.5 w-full sm:w-auto"
                    onClick={handleCopyGeneratedSlug}
                  >
                    {slugCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-success" />
                        <span className="text-success font-semibold">Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-text-muted" />
                        <span>Copiar Slug</span>
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

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

                    <div className="flex items-center gap-2 pt-2">
                      <Button asChild className="flex-1 text-xs font-semibold" variant="outline">
                        <Link to={`/${niche.slug}`}>
                          <span>Abrir Página</span>
                          <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                        </Link>
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 shrink-0"
                        title="Copiar link completo"
                        onClick={() => handleCopyLink(`/${niche.slug}`, niche.slug)}
                      >
                        {copiedSlug === niche.slug ? (
                          <Check className="h-4 w-4 text-success" />
                        ) : (
                          <Copy className="h-4 w-4 text-text-muted" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Seção 2: Propostas Personalizadas Ativas */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-border-default/60">
              <FileCheck className="h-5 w-5 text-brand" />
              <h2 className="text-xl font-bold text-foreground">Propostas Personalizadas Ativas ({propostas.length})</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {propostas.map((prop) => (
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
                        <span>Slug:</span>
                        <code className="text-brand font-mono text-[11px]">{prop.slug}</code>
                      </div>
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

                    <div className="flex items-center gap-2">
                      <Button asChild className="flex-1 text-xs font-semibold" variant="default">
                        <Link to={`/proposta/${prop.slug}`}>
                          <span>Visualizar Proposta</span>
                          <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                        </Link>
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 shrink-0"
                        title="Copiar link completo"
                        onClick={() => handleCopyLink(`/proposta/${prop.slug}`, prop.slug)}
                      >
                        {copiedSlug === prop.slug ? (
                          <Check className="h-4 w-4 text-success" />
                        ) : (
                          <Copy className="h-4 w-4 text-text-muted" />
                        )}
                      </Button>
                    </div>
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
export default InternalDevPage;
