import React, { useState, useMemo } from "react";
import { TrendingUp, AlertCircle, Calculator } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { track } from "@vercel/analytics";
import { useNiche } from "@/contexts/NicheContext";
import { calculateROI } from "@/lib/pricing";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const RoiCalculatorSection: React.FC = () => {
  const { niche, pricing } = useNiche();

  const [ticketMedio, setTicketMedio] = useState<number>(
    niche.retorno.ticketMedioPadrao
  );
  const [atendimentosRecuperados, setAtendimentosRecuperados] = useState<number>(
    niche.retorno.atendimentosRecuperadosPadrao
  );

  const roiResult = useMemo(() => {
    return calculateROI(
      ticketMedio,
      atendimentosRecuperados,
      pricing.implantacaoTotal,
      pricing.mensalidadeTotal
    );
  }, [ticketMedio, atendimentosRecuperados, pricing.implantacaoTotal, pricing.mensalidadeTotal]);

  const handleTicketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value) || 0;
    setTicketMedio(Math.max(1, val));
    try {
      track("calculadora_usada", { nicho: niche.slug, ticketMedio: val });
    } catch {
      // Ignora erro local
    }
  };

  const handleQtdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value) || 0;
    setAtendimentosRecuperados(Math.max(1, val));
    try {
      track("calculadora_usada", { nicho: niche.slug, atendimentos: val });
    } catch {
      // Ignora erro local
    }
  };

  return (
    <section className="py-16 sm:py-24 border-b border-border-default/60">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <Badge variant="brandSubtle" className="mb-3 uppercase tracking-wider text-xs font-semibold gap-1.5">
            <Calculator className="h-3.5 w-3.5 text-brand" />
            <span>Retorno Sobre o Investimento</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Em quanto tempo o sistema se paga?
          </h2>
          <p className="text-text-secondary text-base sm:text-lg">
            Ao evitar ausências com lembretes automáticos e capturar agendamentos fora do horário comercial, sua agenda gera receita adicional imediata.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs da Calculadora */}
          <div className="lg:col-span-5 space-y-6 bg-card border border-border-default rounded-xl p-6 sm:p-7 shadow-sm">
            <h3 className="text-lg font-bold text-foreground pb-2 border-b border-border-subtle">
              Parâmetros da sua operação
            </h3>

            {/* Input 1: Ticket Médio */}
            <div className="space-y-2">
              <label
                htmlFor="input-ticket"
                className="text-xs uppercase font-bold tracking-wider text-text-secondary block"
              >
                Valor médio por {niche.termos.atendimento.singular} (R$)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-text-muted font-bold">
                  R$
                </span>
                <input
                  id="input-ticket"
                  type="number"
                  min="1"
                  step="10"
                  value={ticketMedio}
                  onChange={handleTicketChange}
                  className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-border-default bg-surface text-foreground font-bold focus:outline-none focus:ring-2 focus:ring-focus-ring text-base"
                />
              </div>
              <p className="text-[11px] text-text-muted">
                Padrão estimado para o segmento: R$ {niche.retorno.ticketMedioPadrao.toLocaleString("pt-BR")}
              </p>
            </div>

            {/* Input 2: Atendimentos Recuperados */}
            <div className="space-y-2">
              <label
                htmlFor="input-qtd"
                className="text-xs uppercase font-bold tracking-wider text-text-secondary block"
              >
                Estimativa de {niche.retorno.rotuloAtendimento}
              </label>
              <input
                id="input-qtd"
                type="number"
                min="1"
                max="500"
                step="1"
                value={atendimentosRecuperados}
                onChange={handleQtdChange}
                className="w-full px-4 py-2.5 rounded-lg border border-border-default bg-surface text-foreground font-bold focus:outline-none focus:ring-2 focus:ring-focus-ring text-base"
              />
              <p className="text-[11px] text-text-muted">
                Horários que deixam de ficar ociosos por faltas ou que foram marcados fora do expediente.
              </p>
            </div>

            {/* Resumo de Saída Rápida */}
            <div className="pt-4 border-t border-border-default/60 space-y-3">
              <div className="flex justify-between items-center text-xs text-text-secondary">
                <span>Receita adicional bruta estimada:</span>
                <span className="font-bold text-foreground text-sm">
                  + R$ {roiResult.receitaAdicionalMensal.toLocaleString("pt-BR")}/mês
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-text-secondary">
                <span>Custo mensal de operação:</span>
                <span className="text-text-muted">
                  - R$ {roiResult.mensalidade.toLocaleString("pt-BR")}/mês
                </span>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold text-foreground pt-1 border-t border-border-subtle">
                <span>Lucro líquido mensal adicional:</span>
                <span className={roiResult.temRetorno ? "text-success font-bold text-base" : "text-danger font-bold text-base"}>
                  {roiResult.lucroLiquidoMensal > 0 ? "+" : ""} R$ {roiResult.lucroLiquidoMensal.toLocaleString("pt-BR")}/mês
                </span>
              </div>
            </div>
          </div>

          {/* Gráfico e Payback (Coluna Direita) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Bloco de Payback */}
            <Card className="border border-border-default bg-card shadow-sm p-6 sm:p-7">
              <CardContent className="p-0">
                {roiResult.temRetorno ? (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs uppercase font-bold tracking-wider text-text-brand dark:text-brand flex items-center gap-1.5">
                        <TrendingUp className="h-4 w-4" />
                        <span>Estimativa de Payback</span>
                      </span>
                      <h4 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-1">
                        Aproximadamente {roiResult.paybackMeses} {roiResult.paybackMeses === 1 ? "mês" : "meses"}
                      </h4>
                      <p className="text-xs text-text-secondary mt-1">
                        Tempo estimado para o retorno gerado cobrir o valor total da implantação.
                      </p>
                    </div>

                    <div className="bg-brand/10 border border-brand/20 p-3 sm:p-4 rounded-xl text-center sm:text-right shrink-0">
                      <span className="text-[11px] text-text-muted uppercase font-semibold">Ganho Líquido em 12 meses</span>
                      <p className="text-xl sm:text-2xl font-black text-brand">
                        R$ {(roiResult.lucroLiquidoMensal * 12 - pricing.implantacaoTotal).toLocaleString("pt-BR")}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-danger/10 border border-danger/20 text-danger">
                    <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold">Investimento não se paga nestas condições</h4>
                      <p className="text-xs leading-relaxed">
                        A receita adicional estimada (R$ {roiResult.receitaAdicionalMensal.toLocaleString("pt-BR")}/mês) não cobre o custo da mensalidade (R$ {roiResult.mensalidade.toLocaleString("pt-BR")}/mês). Aumente o valor do atendimento ou a quantidade de horários recuperados para encontrar o ponto de equilíbrio.
                      </p>
                    </div>
                  </div>
                )}

                {/* Gráfico Recharts de Projeção em 12 Meses */}
                <div className="pt-6 mt-6 border-t border-border-default/60">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                      Evolução Financeira em 12 Meses (R$)
                    </span>
                    <span className="text-[11px] text-text-muted">
                      Retorno Acumulado vs Investimento Total
                    </span>
                  </div>

                  <div className="h-64 sm:h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={roiResult.projecao12Meses}
                        margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorRetorno" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2DD4BF" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#2DD4BF" stopOpacity={0.0} />
                          </linearGradient>
                          <linearGradient id="colorInvestimento" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#71717A" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#71717A" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <XAxis
                          dataKey="rotulo"
                          stroke="#71717A"
                          fontSize={10}
                          tickLine={false}
                        />
                        <YAxis
                          stroke="#71717A"
                          fontSize={10}
                          tickLine={false}
                          tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                          formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, ""]}
                          contentStyle={{
                            backgroundColor: "rgba(10, 15, 16, 0.95)",
                            borderRadius: "8px",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            fontSize: "12px",
                            color: "#fff",
                          }}
                        />
                        <Legend
                          wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
                        />
                        <Area
                          type="monotone"
                          dataKey="retornoAcumulado"
                          name="Retorno Acumulado"
                          stroke="#2DD4BF"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorRetorno)"
                        />
                        <Area
                          type="monotone"
                          dataKey="investimentoAcumulado"
                          name="Investimento Acumulado"
                          stroke="#71717A"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorInvestimento)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Disclaimer Obrigatório */}
                <p className="text-[11px] text-text-muted text-center italic mt-4 pt-3 border-t border-border-subtle">
                  * Estimativa ilustrativa com base nos parâmetros informados, não constituindo garantia formal de faturamento futuro.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
