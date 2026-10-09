import { pricingTable } from "@/data/pricing";

export type PerfilEstrutura = "solo" | "pequena" | "media" | "multiunidade";
export type PlanoId = "essencial" | "pro" | "multiunidade";

export interface PricingSimulationInput {
  profissionais: number;
  unidades: number;
  incluirWhatsApp: boolean;
  planoSelecionado?: PlanoId;
}

export interface PricingSimulationResult {
  perfilIdentificado: PerfilEstrutura;
  planoRecomendado: PlanoId;
  planoEfetivo: PlanoId;
  implantacaoBase: number;
  implantacaoAdicionalUnidades: number;
  implantacaoTotal: number;
  mensalidadeBase: number;
  mensalidadeAdicionalProfissionais: number;
  mensalidadeAdicionalUnidades: number;
  mensalidadeWhatsApp: number;
  mensalidadeTotal: number;
  profissionaisAdicionaisQtd: number;
  unidadesAdicionaisQtd: number;
}

export interface CondicaoAVista {
  tipo: "percentual" | "fixo";
  valor: number;
}

export interface InstallmentsResult {
  implantacaoTotal: number;
  modeloEntradaSaldo: {
    rotulo: string;
    etapas: Array<{ descricao: string; percentual: number; valor: number }>;
  };
  parcelasEpm3x: { parcelas: 3; valorParcela: number };
  parcelasEpm4x: { parcelas: 4; valorParcela: number };
  parcelasCartao6x: { parcelas: 6; valorParcelaAproximada: number };
  condicaoAVistaAplicada?: {
    valorOriginal: number;
    valorFinal: number;
    economia: number;
    descricao: string;
  };
}

export interface RoiSimulationResult {
  ticketMedio: number;
  atendimentosRecuperados: number;
  receitaAdicionalMensal: number;
  mensalidade: number;
  lucroLiquidoMensal: number;
  temRetorno: boolean;
  paybackMeses: number | null;
  projecao12Meses: Array<{
    mes: number;
    rotulo: string;
    investimentoAcumulado: number;
    retornoAcumulado: number;
  }>;
}

/**
 * Identifica o perfil de negócio conforme número de profissionais e unidades
 */
export function identifyProfile(profissionais: number, unidades: number): PerfilEstrutura {
  if (unidades > 1) {
    return "multiunidade";
  }
  if (profissionais <= 1) {
    return "solo";
  }
  if (profissionais <= 4) {
    return "pequena";
  }
  return "media";
}

/**
 * Calcula a precificação com base estrita na tabela única da EPM DevTech
 */
export function calculatePricing(
  input: PricingSimulationInput
): PricingSimulationResult {
  const profissionais = Math.max(1, input.profissionais);
  const unidades = Math.max(1, input.unidades);
  const perfilIdentificado = identifyProfile(profissionais, unidades);

  const planoRecomendado: PlanoId =
    unidades > 1 ? "multiunidade" : "pro";

  const planoEfetivo: PlanoId = input.planoSelecionado || planoRecomendado;

  let implantacaoBase = 0;
  let mensalidadeBase = 0;

  if (planoEfetivo === "essencial") {
    implantacaoBase = pricingTable.essencial.implantacao;
    mensalidadeBase = pricingTable.essencial.mensalidade;
  } else if (perfilIdentificado === "multiunidade") {
    implantacaoBase = pricingTable.multiunidade.implantacao;
    mensalidadeBase = pricingTable.multiunidade.mensalidade;
  } else if (perfilIdentificado === "media") {
    implantacaoBase = pricingTable.media.implantacao;
    mensalidadeBase = pricingTable.media.mensalidade;
  } else if (perfilIdentificado === "pequena") {
    implantacaoBase = pricingTable.pequena.implantacao;
    mensalidadeBase = pricingTable.pequena.mensalidade;
  } else {
    implantacaoBase = pricingTable.solo.implantacao;
    mensalidadeBase = pricingTable.solo.mensalidade;
  }

  // Unidades adicionais além de 2
  const unidadesAdicionaisQtd = Math.max(0, unidades - 2);
  const implantacaoAdicionalUnidades =
    unidadesAdicionaisQtd * pricingTable.adicionalUnidadeImplantacao;
  const mensalidadeAdicionalUnidades =
    unidadesAdicionaisQtd * pricingTable.adicionalUnidadeMensal;

  // Profissionais adicionais
  let profissionaisAdicionaisQtd = 0;
  if (perfilIdentificado === "multiunidade") {
    if (profissionais > 15) {
      profissionaisAdicionaisQtd = profissionais - 15;
    }
  } else if (perfilIdentificado === "media") {
    if (profissionais > 10) {
      profissionaisAdicionaisQtd = profissionais - 10;
    }
  }

  const mensalidadeAdicionalProfissionais =
    profissionaisAdicionaisQtd * pricingTable.adicionalProfissionalMensal;

  const mensalidadeWhatsApp = input.incluirWhatsApp
    ? pricingTable.lembretesWhatsAppMensal
    : 0;

  const implantacaoTotal = implantacaoBase + implantacaoAdicionalUnidades;
  const mensalidadeTotal =
    mensalidadeBase +
    mensalidadeAdicionalProfissionais +
    mensalidadeAdicionalUnidades +
    mensalidadeWhatsApp;

  return {
    perfilIdentificado,
    planoRecomendado,
    planoEfetivo,
    implantacaoBase,
    implantacaoAdicionalUnidades,
    implantacaoTotal,
    mensalidadeBase,
    mensalidadeAdicionalProfissionais,
    mensalidadeAdicionalUnidades,
    mensalidadeWhatsApp,
    mensalidadeTotal,
    profissionaisAdicionaisQtd,
    unidadesAdicionaisQtd,
  };
}

/**
 * Calcula parcelamentos e opções de pagamento (exclusivamente para a implantação)
 */
export function calculateInstallments(
  implantacaoTotal: number,
  isMultiunidade: boolean,
  condicaoAVista?: CondicaoAVista
): InstallmentsResult {
  const parcelasEpm3x = {
    parcelas: 3 as const,
    valorParcela: Math.round((implantacaoTotal / 3) * 100) / 100,
  };

  const parcelasEpm4x = {
    parcelas: 4 as const,
    valorParcela: Math.round((implantacaoTotal / 4) * 100) / 100,
  };

  const parcelasCartao6x = {
    parcelas: 6 as const,
    valorParcelaAproximada: Math.round((implantacaoTotal / 6) * 100) / 100,
  };

  let modeloEntradaSaldo: InstallmentsResult["modeloEntradaSaldo"];

  if (isMultiunidade) {
    const v50 = Math.round(implantacaoTotal * 0.5 * 100) / 100;
    const v25 = Math.round(implantacaoTotal * 0.25 * 100) / 100;
    modeloEntradaSaldo = {
      rotulo: "Entrada e saldo (50/25/25)",
      etapas: [
        { descricao: "Contratação", percentual: 50, valor: v50 },
        { descricao: "Homologação", percentual: 25, valor: v25 },
        { descricao: "Aprovação e Publicação", percentual: 25, valor: v25 },
      ],
    };
  } else {
    const v50 = Math.round(implantacaoTotal * 0.5 * 100) / 100;
    modeloEntradaSaldo = {
      rotulo: "Entrada e saldo (50/50)",
      etapas: [
        { descricao: "Contratação (50%)", percentual: 50, valor: v50 },
        { descricao: "Aprovação e Publicação (50%)", percentual: 50, valor: v50 },
      ],
    };
  }

  let condicaoAVistaAplicada: InstallmentsResult["condicaoAVistaAplicada"] | undefined;

  if (condicaoAVista && condicaoAVista.valor > 0) {
    let desconto = 0;
    let descricao = "";
    if (condicaoAVista.tipo === "percentual") {
      desconto = (implantacaoTotal * condicaoAVista.valor) / 100;
      descricao = `${condicaoAVista.valor}% de desconto à vista`;
    } else {
      desconto = condicaoAVista.valor;
      descricao = `R$ ${condicaoAVista.valor} de desconto à vista`;
    }
    const valorFinal = Math.max(0, implantacaoTotal - desconto);
    condicaoAVistaAplicada = {
      valorOriginal: implantacaoTotal,
      valorFinal: Math.round(valorFinal * 100) / 100,
      economia: Math.round(desconto * 100) / 100,
      descricao,
    };
  }

  return {
    implantacaoTotal,
    modeloEntradaSaldo,
    parcelasEpm3x,
    parcelasEpm4x,
    parcelasCartao6x,
    condicaoAVistaAplicada,
  };
}

/**
 * Calcula projeção de retorno sobre o investimento e prazo de payback
 */
export function calculateROI(
  ticketMedio: number,
  atendimentosRecuperados: number,
  implantacao: number,
  mensalidade: number
): RoiSimulationResult {
  const receitaAdicionalMensal = ticketMedio * atendimentosRecuperados;
  const lucroLiquidoMensal = receitaAdicionalMensal - mensalidade;

  const temRetorno = lucroLiquidoMensal > 0;
  let paybackMeses: number | null = null;

  if (temRetorno) {
    const mesesCalculados = implantacao / lucroLiquidoMensal;
    paybackMeses = Math.round(mesesCalculados * 10) / 10;
  }

  const projecao12Meses: RoiSimulationResult["projecao12Meses"] = [];

  for (let mes = 0; mes <= 12; mes++) {
    const investimentoAcumulado = implantacao + mensalidade * mes;
    const retornoAcumulado = receitaAdicionalMensal * mes;

    projecao12Meses.push({
      mes,
      rotulo: mes === 0 ? "Início" : `Mês ${mes}`,
      investimentoAcumulado: Math.round(investimentoAcumulado),
      retornoAcumulado: Math.round(retornoAcumulado),
    });
  }

  return {
    ticketMedio,
    atendimentosRecuperados,
    receitaAdicionalMensal,
    mensalidade,
    lucroLiquidoMensal,
    temRetorno,
    paybackMeses,
    projecao12Meses,
  };
}
