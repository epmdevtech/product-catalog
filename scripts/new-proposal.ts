#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROPOSALS_DIR = path.resolve(__dirname, "../src/data/proposals");

function sanitizeShortName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function generateRandomToken(length = 8): string {
  // Gera token aleatório de 8 caracteres [a-z0-9] usando bytes criptograficamente seguros
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = crypto.randomBytes(length);
  let token = "";
  for (let i = 0; i < length; i++) {
    token += chars[bytes[i] % chars.length];
  }
  return token;
}

async function main() {
  console.log("\n=======================================================");
  console.log("   EPM DevTech — Gerador de Nova Proposta Comercial   ");
  console.log("=======================================================\n");

  const rl = readline.createInterface({ input, output });

  try {
    const nomeNegocio = await rl.question("1. Nome do negócio / cliente: ");
    if (!nomeNegocio.trim()) {
      console.error("Erro: Nome do negócio é obrigatório.");
      process.exit(1);
    }

    const defaultShort = sanitizeShortName(nomeNegocio);
    const nomeCurtoInput = await rl.question(
      `2. Nome curto para URL [padrão: ${defaultShort}]: `
    );
    const nomeCurto = sanitizeShortName(nomeCurtoInput || defaultShort);

    const responsavel = await rl.question("3. Nome do responsável / A/C (opcional): ");

    const nichoSlug = (
      await rl.question("4. Nicho (odontologia / advocacia / barbearia) [odontologia]: ")
    )
      .trim()
      .toLowerCase() || "odontologia";

    const profsInput = await rl.question("5. Quantidade de profissionais [1]: ");
    const profissionais = parseInt(profsInput, 10) || 1;

    const unidsInput = await rl.question("6. Quantidade de unidades [1]: ");
    const unidades = parseInt(unidsInput, 10) || 1;

    const planoInput = (
      await rl.question("7. Plano (essencial / pro / multiunidade) [pro]: ")
    )
      .trim()
      .toLowerCase() || "pro";

    const whatsInput = (
      await rl.question("8. Incluir add-on WhatsApp? (s/n) [s]: ")
    )
      .trim()
      .toLowerCase();
    const incluirWhatsApp = whatsInput !== "n";

    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 30);
    const dateFormatted = defaultDate.toLocaleDateString("pt-BR");

    const validadeAteInput = await rl.question(
      `9. Validade da proposta [padrão: ${dateFormatted}]: `
    );
    const validadeAte = validadeAteInput.trim() || dateFormatted;

    const observacoes = await rl.question(
      "10. Observações adicionais (opcional): "
    );

    const descontoInput = await rl.question(
      "11. Desconto especial à vista em % (ex: 10, ou deixe vazio): "
    );
    let condicaoAVistaEspecial:
      | { tipo: "percentual" | "fixo"; valor: number; descricao: string }
      | undefined;

    if (descontoInput.trim()) {
      const perc = parseFloat(descontoInput);
      if (!isNaN(perc) && perc > 0) {
        condicaoAVistaEspecial = {
          tipo: "percentual",
          valor: perc,
          descricao: `${perc}% de desconto à vista na implantação`,
        };
      }
    }

    // Geração do token criptográfico imprevisível
    const token = generateRandomToken(8);
    const slug = `${nomeCurto}-${token}`;

    const hoje = new Date().toLocaleDateString("pt-BR");

    const propostaData = {
      slug,
      nichoSlug,
      nomeNegocio: nomeNegocio.trim(),
      responsavel: responsavel.trim() || undefined,
      profissionais,
      unidades,
      plano: planoInput,
      incluirWhatsApp,
      validadeAte,
      observacoes: observacoes.trim() || undefined,
      condicaoAVistaEspecial,
      criadoEm: hoje,
    };

    if (!fs.existsSync(PROPOSALS_DIR)) {
      fs.mkdirSync(PROPOSALS_DIR, { recursive: true });
    }

    const filePath = path.join(PROPOSALS_DIR, `${slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(propostaData, null, 2), "utf-8");

    console.log("\n=======================================================");
    console.log("   ✅ PROPOSTA GERADA COM SUCESSO!");
    console.log("=======================================================");
    console.log(`- Slug:     ${slug}`);
    console.log(`- Arquivo:  ${path.relative(process.cwd(), filePath)}`);
    console.log(`- URL Prod: https://catalogo.epmdevtech.com.br/proposta/${slug}`);
    console.log(`            https://planos.epmdevtech.com.br/proposta/${slug}`);
    console.log(`- URL Dev:  http://localhost:5173/proposta/${slug}`);
    console.log("=======================================================\n");
  } finally {
    rl.close();
  }
}

main().catch((err) => {
  console.error("Erro fatal ao gerar proposta:", err);
  process.exit(1);
});
