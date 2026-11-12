import { describe, expect, it } from "vitest";
import { createRng, hashSeed } from "./random";

describe("createRng", () => {
  it("mesma semente gera a mesma sequência (partida reproduzível)", () => {
    const a = createRng("turma-1:safra-1");
    const b = createRng("turma-1:safra-1");
    const seqA = Array.from({ length: 100 }, () => a.next());
    const seqB = Array.from({ length: 100 }, () => b.next());
    expect(seqA).toEqual(seqB);
  });

  it("sementes diferentes geram sequências diferentes", () => {
    const a = createRng("turma-1:safra-1");
    const b = createRng("turma-1:safra-2");
    expect(a.next()).not.toEqual(b.next());
  });

  it("next() fica sempre em [0, 1)", () => {
    const rng = createRng(123);
    for (let i = 0; i < 10_000; i++) {
      const x = rng.next();
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThan(1);
    }
  });

  it("int() respeita os limites e alcança as duas pontas", () => {
    const rng = createRng("dados");
    const vistos = new Set<number>();
    for (let i = 0; i < 5_000; i++) {
      const n = rng.int(1, 6);
      expect(n).toBeGreaterThanOrEqual(1);
      expect(n).toBeLessThanOrEqual(6);
      vistos.add(n);
    }
    expect(vistos).toEqual(new Set([1, 2, 3, 4, 5, 6]));
  });

  it("pick() respeita aproximadamente os pesos", () => {
    const rng = createRng("clima");
    const cenarios = [
      { value: "normal", weight: 0.6 },
      { value: "seca", weight: 0.25 },
      { value: "excesso_chuva", weight: 0.15 },
    ] as const;
    const contagem: Record<string, number> = { normal: 0, seca: 0, excesso_chuva: 0 };
    const N = 50_000;
    for (let i = 0; i < N; i++) contagem[rng.pick(cenarios)]++;
    expect(contagem.normal / N).toBeCloseTo(0.6, 1);
    expect(contagem.seca / N).toBeCloseTo(0.25, 1);
    expect(contagem.excesso_chuva / N).toBeCloseTo(0.15, 1);
  });

  it("rejeita entradas inválidas", () => {
    const rng = createRng(1);
    expect(() => rng.int(5, 1)).toThrow();
    expect(() => rng.pick([])).toThrow();
    expect(() => rng.pick([{ value: "x", weight: 0 }])).toThrow();
  });
});

describe("hashSeed", () => {
  it("é determinístico", () => {
    expect(hashSeed("abc")).toBe(hashSeed("abc"));
    expect(hashSeed("abc")).not.toBe(hashSeed("abd"));
  });
});
