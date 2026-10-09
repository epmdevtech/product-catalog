import { describe, it, expect } from "vitest";

describe("Sanity check do esqueleto da aplicação", () => {
  it("deve validar o ambiente de execução dos testes", () => {
    expect(1 + 1).toBe(2);
  });
});
