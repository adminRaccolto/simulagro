/**
 * Gerador de números aleatórios com semente (seed).
 *
 * Mesma semente => mesma sequência de sorteios. Isso garante que:
 *  - todas as equipes de uma turma enfrentem o mesmo clima e os mesmos eventos;
 *  - qualquer partida possa ser reproduzida exatamente (auditoria, correção de bugs).
 *
 * Algoritmo: mulberry32 (rápido, determinístico, adequado para simulação — não
 * para criptografia). A semente textual é convertida em número via hash FNV-1a.
 */

export interface Rng {
  /** Número em [0, 1). */
  next(): number;
  /** Inteiro em [min, max] (inclusive nas duas pontas). */
  int(min: number, max: number): number;
  /** Escolhe um item conforme pesos (ex.: probabilidades de cada cenário de clima). */
  pick<T>(items: readonly { value: T; weight: number }[]): T;
}

/** Converte uma semente textual (ex.: "turma-42:safra-3:clima") em inteiro de 32 bits. */
export function hashSeed(seed: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export function createRng(seed: string | number): Rng {
  let state = typeof seed === "number" ? seed >>> 0 : hashSeed(seed);

  const next = (): number => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  return {
    next,
    int(min, max) {
      if (!Number.isInteger(min) || !Number.isInteger(max) || max < min) {
        throw new Error(`Intervalo inválido: [${min}, ${max}]`);
      }
      return min + Math.floor(next() * (max - min + 1));
    },
    pick(items) {
      const total = items.reduce((sum, it) => sum + it.weight, 0);
      if (items.length === 0 || total <= 0 || items.some((it) => it.weight < 0)) {
        throw new Error("Lista de pesos inválida");
      }
      let r = next() * total;
      for (const it of items) {
        r -= it.weight;
        if (r < 0) return it.value;
      }
      return items[items.length - 1].value;
    },
  };
}
