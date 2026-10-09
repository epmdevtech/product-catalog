import { describe, it, expect } from "vitest";
import {
  calculatePricing,
  calculateInstallments,
  calculateROI,
  identifyProfile,
} from "../pricing";
import { pricingTable } from "@/data/pricing";

describe("Motor de Cálculo de Preço Único (pricing.ts)", () => {
  describe("Identificação de Perfil", () => {
    it("deve identificar perfil solo com 1 profissional e 1 unidade", () => {
      expect(identifyProfile(1, 1)).toBe("solo");
    });

    it("deve identificar perfil pequena com 2 a 4 profissionais e 1 unidade", () => {
      expect(identifyProfile(2, 1)).toBe("pequena");
      expect(identifyProfile(4, 1)).toBe("pequena");
    });

    it("deve identificar perfil media com 5 a 10 profissionais e 1 unidade", () => {
      expect(identifyProfile(5, 1)).toBe("media");
      expect(identifyProfile(10, 1)).toBe("media");
      expect(identifyProfile(11, 1)).toBe("media");
    });

    it("deve identificar perfil multiunidade quando unidades > 1", () => {
      expect(identifyProfile(1, 2)).toBe("multiunidade");
      expect(identifyProfile(10, 3)).toBe("multiunidade");
    });
  });

  describe("Tabela de Preços Canônica", () => {
    it("1 profissional (perfil solo, 1 unidade)", () => {
      const res = calculatePricing({
        profissionais: 1,
        unidades: 1,
        incluirWhatsApp: false,
      });
      expect(res.perfilIdentificado).toBe("solo");
      expect(res.planoRecomendado).toBe("pro");
      expect(res.implantacaoTotal).toBe(3490);
      expect(res.mensalidadeTotal).toBe(169);
    });

    it("4 profissionais (perfil pequena, 1 unidade)", () => {
      const res = calculatePricing({
        profissionais: 4,
        unidades: 1,
        incluirWhatsApp: false,
      });
      expect(res.perfilIdentificado).toBe("pequena");
      expect(res.planoRecomendado).toBe("pro");
      expect(res.implantacaoTotal).toBe(4990);
      expect(res.mensalidadeTotal).toBe(249);
    });

    it("5 profissionais (perfil media, 1 unidade)", () => {
      const res = calculatePricing({
        profissionais: 5,
        unidades: 1,
        incluirWhatsApp: false,
      });
      expect(res.perfilIdentificado).toBe("media");
      expect(res.planoRecomendado).toBe("pro");
      expect(res.implantacaoTotal).toBe(6990);
      expect(res.mensalidadeTotal).toBe(329);
      expect(res.profissionaisAdicionaisQtd).toBe(0);
    });

    it("11 profissionais (perfil media com 1 profissional adicional, 1 unidade)", () => {
      const res = calculatePricing({
        profissionais: 11,
        unidades: 1,
        incluirWhatsApp: false,
      });
      expect(res.perfilIdentificado).toBe("media");
      expect(res.implantacaoTotal).toBe(6990);
      expect(res.profissionaisAdicionaisQtd).toBe(1);
      // 329 + (1 * 29) = 358
      expect(res.mensalidadeTotal).toBe(329 + pricingTable.adicionalProfissionalMensal);
      expect(res.mensalidadeTotal).toBe(358);
    });

    it("2 unidades (perfil multiunidade base, até 15 profissionais)", () => {
      const res = calculatePricing({
        profissionais: 8,
        unidades: 2,
        incluirWhatsApp: false,
      });
      expect(res.perfilIdentificado).toBe("multiunidade");
      expect(res.planoRecomendado).toBe("multiunidade");
      expect(res.implantacaoTotal).toBe(8990);
      expect(res.mensalidadeTotal).toBe(349);
      expect(res.unidadesAdicionaisQtd).toBe(0);
    });

    it("3 unidades (perfil multiunidade com 1 unidade adicional além de 2)", () => {
      const res = calculatePricing({
        profissionais: 10,
        unidades: 3,
        incluirWhatsApp: false,
      });
      expect(res.perfilIdentificado).toBe("multiunidade");
      expect(res.unidadesAdicionaisQtd).toBe(1);
      // Implantação: 8990 + 1500 = 10490
      expect(res.implantacaoTotal).toBe(8990 + pricingTable.adicionalUnidadeImplantacao);
      expect(res.implantacaoTotal).toBe(10490);
      // Mensalidade: 349 + 79 = 428
      expect(res.mensalidadeTotal).toBe(349 + pricingTable.adicionalUnidadeMensal);
      expect(res.mensalidadeTotal).toBe(428);
    });

    it("Plano Essencial (apenas site institucional, sem agendamento)", () => {
      const res = calculatePricing({
        profissionais: 3,
        unidades: 1,
        incluirWhatsApp: false,
        planoSelecionado: "essencial",
      });
      expect(res.planoEfetivo).toBe("essencial");
      expect(res.implantacaoTotal).toBe(3490);
      expect(res.mensalidadeTotal).toBe(149);
    });

    it("Add-on de automação e lembretes por WhatsApp", () => {
      const semWhats = calculatePricing({
        profissionais: 2,
        unidades: 1,
        incluirWhatsApp: false,
      });
      const comWhats = calculatePricing({
        profissionais: 2,
        unidades: 1,
        incluirWhatsApp: true,
      });

      expect(comWhats.mensalidadeWhatsApp).toBe(pricingTable.lembretesWhatsAppMensal);
      expect(comWhats.mensalidadeTotal).toBe(
        semWhats.mensalidadeTotal + pricingTable.lembretesWhatsAppMensal
      );
    });
  });

  describe("Condições Comerciais e Parcelamentos", () => {
    it("deve calcular modelo entrada e saldo 50/50 em unidade única", () => {
      const inst = calculateInstallments(4990, false);
      expect(inst.modeloEntradaSaldo.rotulo).toBe("Entrada e saldo (50/50)");
      expect(inst.modeloEntradaSaldo.etapas).toHaveLength(2);
      expect(inst.modeloEntradaSaldo.etapas[0].valor).toBe(2495);
      expect(inst.modeloEntradaSaldo.etapas[1].valor).toBe(2495);
    });

    it("deve calcular modelo entrada e saldo 50/25/25 para multiunidade", () => {
      const inst = calculateInstallments(8990, true);
      expect(inst.modeloEntradaSaldo.rotulo).toBe("Entrada e saldo (50/25/25)");
      expect(inst.modeloEntradaSaldo.etapas).toHaveLength(3);
      expect(inst.modeloEntradaSaldo.etapas[0].valor).toBe(4495);
      expect(inst.modeloEntradaSaldo.etapas[1].valor).toBe(2247.5);
      expect(inst.modeloEntradaSaldo.etapas[2].valor).toBe(2247.5);
    });

    it("deve calcular parcelamento EPM 3x e 4x sem juros e cartão 6x", () => {
      const inst = calculateInstallments(4990, false);
      expect(inst.parcelasEpm3x.parcelas).toBe(3);
      expect(inst.parcelasEpm3x.valorParcela).toBe(1663.33);
      expect(inst.parcelasEpm4x.parcelas).toBe(4);
      expect(inst.parcelasEpm4x.valorParcela).toBe(1247.5);
      expect(inst.parcelasCartao6x.parcelas).toBe(6);
      expect(inst.parcelasCartao6x.valorParcelaAproximada).toBe(831.67);
    });

    it("deve aplicar desconto à vista percentual quando configurado", () => {
      const inst = calculateInstallments(5000, false, {
        tipo: "percentual",
        valor: 10,
      });
      expect(inst.condicaoAVistaAplicada).toBeDefined();
      expect(inst.condicaoAVistaAplicada?.valorOriginal).toBe(5000);
      expect(inst.condicaoAVistaAplicada?.economia).toBe(500);
      expect(inst.condicaoAVistaAplicada?.valorFinal).toBe(4500);
    });

    it("deve aplicar desconto à vista fixo quando configurado", () => {
      const inst = calculateInstallments(5000, false, {
        tipo: "fixo",
        valor: 300,
      });
      expect(inst.condicaoAVistaAplicada).toBeDefined();
      expect(inst.condicaoAVistaAplicada?.economia).toBe(300);
      expect(inst.condicaoAVistaAplicada?.valorFinal).toBe(4700);
    });
  });

  describe("Calculadora de Retorno (ROI e Payback)", () => {
    it("deve calcular payback positivo quando a receita adicional supera a mensalidade", () => {
      const ticketMedio = 200;
      const recuperados = 3; // Receita adicional = 600
      const mensalidade = 200; // Lucro líquido = 400
      const implantacao = 4000;

      const roi = calculateROI(ticketMedio, recuperados, implantacao, mensalidade);
      expect(roi.temRetorno).toBe(true);
      expect(roi.receitaAdicionalMensal).toBe(600);
      expect(roi.lucroLiquidoMensal).toBe(400);
      expect(roi.paybackMeses).toBe(10);
      expect(roi.projecao12Meses).toHaveLength(13); // Mês 0 até 12
    });

    it("deve reportar payback inexistente quando lucro líquido mensal for <= 0", () => {
      const ticketMedio = 50;
      const recuperados = 1; // Receita adicional = 50
      const mensalidade = 200; // Lucro líquido = -150

      const roi = calculateROI(ticketMedio, recuperados, 4000, mensalidade);
      expect(roi.temRetorno).toBe(false);
      expect(roi.paybackMeses).toBeNull();
      expect(roi.lucroLiquidoMensal).toBe(-150);
    });
  });
});
