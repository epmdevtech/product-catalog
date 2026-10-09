import { describe, it, expect } from "vitest";
import { odontologia } from "@/data/niches/odontologia";
import { advocacia } from "@/data/niches/advocacia";
import { barbearia } from "@/data/niches/barbearia";
import {
  calculatePricing,
  calculateInstallments,
  calculateROI,
  identifyProfile,
} from "../pricing";

describe("Motor de Cálculo de Preços (pricing.ts)", () => {
  describe("Identificação de Perfil", () => {
    it("deve identificar perfil solo com 1 profissional e 1 unidade", () => {
      expect(identifyProfile(1, 1)).toBe("solo");
    });

    it("deve identificar perfil pequena com 2 a 4 profissionais e 1 unidade", () => {
      expect(identifyProfile(2, 1)).toBe("pequena");
      expect(identifyProfile(4, 1)).toBe("pequena");
    });

    it("deve identificar perfil media com 5 ou mais profissionais e 1 unidade", () => {
      expect(identifyProfile(5, 1)).toBe("media");
      expect(identifyProfile(10, 1)).toBe("media");
      expect(identifyProfile(11, 1)).toBe("media");
    });

    it("deve identificar perfil multiunidade quando unidades > 1", () => {
      expect(identifyProfile(1, 2)).toBe("multiunidade");
      expect(identifyProfile(10, 3)).toBe("multiunidade");
    });
  });

  describe("Nicho: Odontologia", () => {
    it("1 dentista (solo, 1 unidade)", () => {
      const res = calculatePricing(odontologia, {
        profissionais: 1,
        unidades: 1,
        incluirWhatsApp: false,
      });
      expect(res.perfilIdentificado).toBe("solo");
      expect(res.planoRecomendado).toBe("pro");
      expect(res.implantacaoTotal).toBe(3490);
      expect(res.mensalidadeTotal).toBe(169);
    });

    it("4 dentistas (pequena, 1 unidade)", () => {
      const res = calculatePricing(odontologia, {
        profissionais: 4,
        unidades: 1,
        incluirWhatsApp: false,
      });
      expect(res.perfilIdentificado).toBe("pequena");
      expect(res.implantacaoTotal).toBe(4990);
      expect(res.mensalidadeTotal).toBe(249);
    });

    it("5 dentistas (media, 1 unidade)", () => {
      const res = calculatePricing(odontologia, {
        profissionais: 5,
        unidades: 1,
        incluirWhatsApp: false,
      });
      expect(res.perfilIdentificado).toBe("media");
      expect(res.implantacaoTotal).toBe(6990);
      expect(res.mensalidadeTotal).toBe(329);
      expect(res.profissionaisAdicionaisQtd).toBe(0);
    });

    it("11 dentistas (media, 1 unidade, com 1 profissional adicional)", () => {
      const res = calculatePricing(odontologia, {
        profissionais: 11,
        unidades: 1,
        incluirWhatsApp: false,
      });
      expect(res.perfilIdentificado).toBe("media");
      expect(res.profissionaisAdicionaisQtd).toBe(1);
      expect(res.implantacaoTotal).toBe(6990);
      // 329 + (1 * 29) = 358
      expect(res.mensalidadeTotal).toBe(329 + 29);
    });

    it("2 unidades (multiunidade)", () => {
      const res = calculatePricing(odontologia, {
        profissionais: 6,
        unidades: 2,
        incluirWhatsApp: false,
      });
      expect(res.perfilIdentificado).toBe("multiunidade");
      expect(res.planoRecomendado).toBe("multiunidade");
      expect(res.implantacaoTotal).toBe(8990);
      expect(res.mensalidadeTotal).toBe(349);
    });

    it("3 unidades (multiunidade + 1 unidade adicional)", () => {
      const res = calculatePricing(odontologia, {
        profissionais: 8,
        unidades: 3,
        incluirWhatsApp: false,
      });
      expect(res.perfilIdentificado).toBe("multiunidade");
      expect(res.unidadesAdicionaisQtd).toBe(1);
      // 8990 + 1500 = 10490
      expect(res.implantacaoTotal).toBe(8990 + 1500);
      // 349 + 79 = 428
      expect(res.mensalidadeTotal).toBe(349 + 79);
    });

    it("com add-on de WhatsApp", () => {
      const res = calculatePricing(odontologia, {
        profissionais: 1,
        unidades: 1,
        incluirWhatsApp: true,
      });
      expect(res.mensalidadeWhatsApp).toBe(119);
      expect(res.mensalidadeTotal).toBe(169 + 119);
    });
  });

  describe("Nicho: Advocacia", () => {
    it("1 advogado (solo, 1 unidade)", () => {
      const res = calculatePricing(advocacia, {
        profissionais: 1,
        unidades: 1,
        incluirWhatsApp: false,
      });
      expect(res.implantacaoTotal).toBe(3490);
      expect(res.mensalidadeTotal).toBe(169);
    });

    it("4 advogados (pequena)", () => {
      const res = calculatePricing(advocacia, {
        profissionais: 4,
        unidades: 1,
        incluirWhatsApp: false,
      });
      expect(res.implantacaoTotal).toBe(4990);
      expect(res.mensalidadeTotal).toBe(249);
    });

    it("11 advogados (media + 1 adicional)", () => {
      const res = calculatePricing(advocacia, {
        profissionais: 11,
        unidades: 1,
        incluirWhatsApp: false,
      });
      expect(res.implantacaoTotal).toBe(6990);
      expect(res.mensalidadeTotal).toBe(329 + 29);
    });

    it("3 unidades com add-on de WhatsApp", () => {
      const res = calculatePricing(advocacia, {
        profissionais: 5,
        unidades: 3,
        incluirWhatsApp: true,
      });
      expect(res.implantacaoTotal).toBe(8990 + 1500);
      expect(res.mensalidadeTotal).toBe(349 + 79 + 119);
    });
  });

  describe("Nicho: Barbearia", () => {
    it("1 barbeiro (solo)", () => {
      const res = calculatePricing(barbearia, {
        profissionais: 1,
        unidades: 1,
        incluirWhatsApp: false,
      });
      expect(res.implantacaoTotal).toBe(1990);
      expect(res.mensalidadeTotal).toBe(99);
    });

    it("4 barbeiros (pequena)", () => {
      const res = calculatePricing(barbearia, {
        profissionais: 4,
        unidades: 1,
        incluirWhatsApp: false,
      });
      expect(res.implantacaoTotal).toBe(2990);
      expect(res.mensalidadeTotal).toBe(149);
    });

    it("5 barbeiros (media)", () => {
      const res = calculatePricing(barbearia, {
        profissionais: 5,
        unidades: 1,
        incluirWhatsApp: false,
      });
      expect(res.implantacaoTotal).toBe(4490);
      expect(res.mensalidadeTotal).toBe(219);
    });

    it("11 barbeiros (media + 1 profissional a R$ 19)", () => {
      const res = calculatePricing(barbearia, {
        profissionais: 11,
        unidades: 1,
        incluirWhatsApp: false,
      });
      expect(res.implantacaoTotal).toBe(4490);
      expect(res.mensalidadeTotal).toBe(219 + 19);
    });

    it("3 unidades (6490 + 1000) e mensalidade (299 + 49)", () => {
      const res = calculatePricing(barbearia, {
        profissionais: 4,
        unidades: 3,
        incluirWhatsApp: false,
      });
      expect(res.implantacaoTotal).toBe(6490 + 1000);
      expect(res.mensalidadeTotal).toBe(299 + 49);
    });

    it("com add-on de WhatsApp da barbearia (R$ 79)", () => {
      const res = calculatePricing(barbearia, {
        profissionais: 1,
        unidades: 1,
        incluirWhatsApp: true,
      });
      expect(res.mensalidadeWhatsApp).toBe(79);
      expect(res.mensalidadeTotal).toBe(99 + 79);
    });
  });

  describe("Parcelamento e Condições de Pagamento", () => {
    it("deve calcular modelo 50/50 para unidade única", () => {
      const res = calculateInstallments(4990, false);
      expect(res.modeloEntradaSaldo.rotulo).toContain("50/50");
      expect(res.modeloEntradaSaldo.etapas).toHaveLength(2);
      expect(res.modeloEntradaSaldo.etapas[0].valor).toBe(2495);
      expect(res.modeloEntradaSaldo.etapas[1].valor).toBe(2495);
    });

    it("deve calcular modelo 50/25/25 para multiunidade", () => {
      const res = calculateInstallments(8990, true);
      expect(res.modeloEntradaSaldo.rotulo).toContain("50/25/25");
      expect(res.modeloEntradaSaldo.etapas).toHaveLength(3);
      expect(res.modeloEntradaSaldo.etapas[0].valor).toBe(4495);
      expect(res.modeloEntradaSaldo.etapas[1].valor).toBe(2247.5);
      expect(res.modeloEntradaSaldo.etapas[2].valor).toBe(2247.5);
    });

    it("deve calcular parcelas EPM em 3x e 4x sem juros", () => {
      const res = calculateInstallments(3490, false);
      expect(res.parcelasEpm3x.valorParcela).toBe(Math.round((3490 / 3) * 100) / 100);
      expect(res.parcelasEpm4x.valorParcela).toBe(Math.round((3490 / 4) * 100) / 100);
      expect(res.parcelasCartao6x.valorParcelaAproximada).toBe(Math.round((3490 / 6) * 100) / 100);
    });

    it("deve aplicar condição à vista percentual quando presente na proposta", () => {
      const res = calculateInstallments(4990, false, {
        tipo: "percentual",
        valor: 10,
      });
      expect(res.condicaoAVistaAplicada).toBeDefined();
      expect(res.condicaoAVistaAplicada?.economia).toBe(499);
      expect(res.condicaoAVistaAplicada?.valorFinal).toBe(4491);
    });

    it("deve aplicar condição à vista em valor fixo quando presente", () => {
      const res = calculateInstallments(4990, false, {
        tipo: "fixo",
        valor: 500,
      });
      expect(res.condicaoAVistaAplicada?.economia).toBe(500);
      expect(res.condicaoAVistaAplicada?.valorFinal).toBe(4490);
    });
  });

  describe("Calculadora de Retorno (ROI) e Payback", () => {
    it("deve calcular payback positivo corretamente", () => {
      // 3 consultas a R$ 250 = R$ 750/mês. Mensalidade R$ 249. Lucro = R$ 501/mês.
      // Implantação = R$ 4990. Payback = 4990 / 501 = ~10 meses.
      const roi = calculateROI(250, 3, 4990, 249);
      expect(roi.temRetorno).toBe(true);
      expect(roi.receitaAdicionalMensal).toBe(750);
      expect(roi.lucroLiquidoMensal).toBe(501);
      expect(roi.paybackMeses).toBeCloseTo(10, 0);
      expect(roi.projecao12Meses).toHaveLength(13);
    });

    it("deve indicar ausência de payback quando a receita adicional não cobre a mensalidade", () => {
      // 1 atendimento a R$ 50 = R$ 50/mês. Mensalidade R$ 149. Lucro = -R$ 99.
      const roi = calculateROI(50, 1, 2990, 149);
      expect(roi.temRetorno).toBe(false);
      expect(roi.paybackMeses).toBeNull();
      expect(roi.lucroLiquidoMensal).toBe(-99);
    });

    it("deve indicar ausência de payback quando a receita empata com a mensalidade", () => {
      const roi = calculateROI(100, 1, 2000, 100);
      expect(roi.temRetorno).toBe(false);
      expect(roi.paybackMeses).toBeNull();
    });
  });
});
