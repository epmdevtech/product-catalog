import React from "react";
import { Check, PlusCircle, Layers, ShieldCheck, HelpCircle } from "lucide-react";
import { useNiche } from "@/contexts/NicheContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const IncludedVsExtraSection: React.FC = () => {
  const { niche } = useNiche();

  const padraoExtras = [
    "Desenvolvimento de funcionalidades sob medida fora do escopo contratado",
    "Produção profissional de fotos, vídeos e redação publicitária de conteúdo",
    "Versão em múltiplos idiomas (inglês, espanhol, etc.)",
    "Integrações de API complexas com sistemas legados de terceiros",
  ];

  const todosExtras = [...niche.extrasOrcamento, ...padraoExtras];

  return (
    <section className="py-16 sm:py-24 border-b border-border-default/60">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="brandSubtle" className="mb-3 uppercase tracking-wider text-xs font-semibold gap-1.5">
            <Layers className="h-3.5 w-3.5 text-brand" />
            <span>Escopo & Transparência</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            O que está incluso vs. O que é cobrado à parte
          </h2>
          <p className="text-text-secondary text-base sm:text-lg">
            Sem surpresas ou letras miúdas. Entenda exatamente o que faz parte da entrega inicial, o que é sustentado pela operação contínua e o que entra como melhoria futura.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Coluna 1: Implantação */}
          <Card className="border border-border-default bg-card shadow-sm flex flex-col rounded-xl overflow-hidden">
            <div className="p-6 border-b border-border-default/60 bg-surface/50">
              <Badge variant="outline" className="mb-2 text-[11px] font-bold uppercase tracking-wider border-border-default">
                Etapa Inicial
              </Badge>
              <h3 className="text-xl font-bold text-foreground">Incluso na Implantação</h3>
              <p className="text-xs text-text-muted mt-1">
                Pagamento único para desenvolvimento e entrega completa
              </p>
            </div>
            <CardContent className="p-6 flex-1 space-y-3">
              <ul className="space-y-3 text-xs sm:text-sm text-text-secondary">
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                  <span>Design exclusivo alinhado à identidade visual da sua marca</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                  <span>Programação front-end de alta performance responsiva (celular e desktop)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                  <span>Configuração e parametrização completa das regras da agenda</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                  <span>Cadastramento inicial das modalidades de {niche.termos.atendimento.plural}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                  <span>Ambiente fechado de homologação para testes e validação</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                  <span>Treinamento prático da equipe para utilização do painel</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                  <span>Configuração de DNS e publicação definitiva no seu domínio</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Coluna 2: Mensalidade */}
          <Card className="border border-border-default bg-card shadow-sm flex flex-col rounded-xl overflow-hidden">
            <div className="p-6 border-b border-border-default/60 bg-surface/50">
              <Badge variant="brandSubtle" className="mb-2 text-[11px] font-bold uppercase tracking-wider">
                Operação Contínua
              </Badge>
              <h3 className="text-xl font-bold text-foreground">Incluso na Mensalidade</h3>
              <p className="text-xs text-text-muted mt-1">
                Sustentação, estabilidade e garantia técnica contínua
              </p>
            </div>
            <CardContent className="p-6 flex-1 space-y-3">
              <ul className="space-y-3 text-xs sm:text-sm text-text-secondary">
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                  <span>Hospedagem em nuvem de alta disponibilidade com CDN global</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                  <span>Emissão e renovação automática de certificado SSL de segurança</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                  <span>Rotinas automatizadas de backup diário de todas as configurações</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                  <span>Monitoramento ativo de integridade e prevenção de indisponibilidade</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                  <span>Atualizações de segurança do sistema e bibliotecas</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                  <span>Suporte técnico direto com nossos engenheiros em horário comercial</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Coluna 3: Cobrado à Parte */}
          <Card className="border border-border-default bg-card shadow-sm flex flex-col rounded-xl overflow-hidden">
            <div className="p-6 border-b border-border-default/60 bg-surface/50">
              <Badge variant="outline" className="mb-2 text-[11px] font-bold uppercase tracking-wider border-border-default">
                Orçamento Sob Demanda
              </Badge>
              <h3 className="text-xl font-bold text-foreground">Cobrado à Parte</h3>
              <p className="text-xs text-text-muted mt-1">
                Melhorias pontuais ou integrações adicionais personalizadas
              </p>
            </div>
            <CardContent className="p-6 flex-1 space-y-3">
              <ul className="space-y-3 text-xs sm:text-sm text-text-secondary">
                {todosExtras.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <PlusCircle className="h-4 w-4 text-text-muted shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-4 rounded-xl bg-surface border border-border-default flex items-center gap-3 text-xs text-text-secondary max-w-3xl mx-auto">
          <HelpCircle className="h-5 w-5 text-brand shrink-0" />
          <p>
            <strong>Diretriz de Manutenção:</strong> A mensalidade cobre a sustentação da infraestrutura existente e suporte técnico. Alterações estruturais ou novas telas que demandem horas adicionais de engenharia são orçadas com estimativa prévia aprovada por você.
          </p>
        </div>
      </div>
    </section>
  );
};
