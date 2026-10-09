import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

// Palavras estritamente proibidas em src/components, src/sections e src/lib
const FORBIDDEN_NICHE_WORDS = [
  // Nicho Odontologia
  "dentista",
  "dentistas",
  "paciente",
  "pacientes",
  "clínica",
  "clinica",
  "clínicas",
  "clinicas",
  "odontologia",
  "odonto",
  "dente",
  "dentes",
  "cfo",
  "cro",

  // Nicho Advocacia
  "advogado",
  "advogados",
  "advogada",
  "advogadas",
  "escritório",
  "escritorio",
  "escritórios",
  "escritorios",
  "oab",
  "jurídico",
  "juridico",
  "jurídica",
  "juridica",

  // Nicho Barbearia
  "barbeiro",
  "barbeiros",
  "barbearia",
  "barbearias",
  "corte",
  "cortes",
  "barba",
  "barbas",
];

// Diretórios onde nenhum texto de nicho é permitido
const MONITORED_DIRS = [
  path.resolve(__dirname, "../components"),
  path.resolve(__dirname, "../sections"),
  path.resolve(__dirname, "../lib"),
];

function getAllFiles(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) return [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllFiles(fullPath));
    } else if (
      entry.isFile() &&
      /\.(tsx?|jsx?|css)$/.test(entry.name) &&
      !entry.name.includes(".test.") &&
      !entry.name.includes(".spec.")
    ) {
      files.push(fullPath);
    }
  }
  return files;
}

describe("Regra de Ouro: ZERO texto de nicho no código do core", () => {
  it("não deve conter palavras de nicho em src/components, src/sections e src/lib", () => {
    const violations: Array<{ file: string; word: string; line: number; text: string }> = [];

    for (const dir of MONITORED_DIRS) {
      const files = getAllFiles(dir);

      for (const file of files) {
        const content = fs.readFileSync(file, "utf-8");
        const lines = content.split("\n");

        lines.forEach((lineText, index) => {
          // Ignora comentários de código que citam a regra de ouro
          if (lineText.trim().startsWith("//") || lineText.trim().startsWith("/*")) {
            return;
          }

          const lowerLine = lineText.toLowerCase();

          for (const word of FORBIDDEN_NICHE_WORDS) {
            // Regex de palavra inteira com limite de borda
            const regex = new RegExp(`\\b${word}\\b`, "i");
            if (regex.test(lowerLine)) {
              violations.push({
                file: path.relative(process.cwd(), file),
                word,
                line: index + 1,
                text: lineText.trim(),
              });
            }
          }
        });
      }
    }

    if (violations.length > 0) {
      const message = violations
        .map(
          (v) =>
            `[VIOLAÇÃO REGRA DE OURO] Arquivo: ${v.file}:${v.line} contém a palavra '${v.word}' -> "${v.text}"`
        )
        .join("\n");
      expect.fail(
        `Foram encontradas ${violations.length} ocorrências de palavras de nicho no código do core!\n${message}`
      );
    }

    expect(violations).toHaveLength(0);
  });
});
