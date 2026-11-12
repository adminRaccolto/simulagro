import { z } from "zod";

/**
 * Variáveis de ambiente validadas. Se faltar alguma, o erro diz exatamente qual
 * e onde configurá-la, em vez de falhar de forma obscura mais adiante.
 */

const publicSchema = z.object({
  supabaseUrl: z.url("NEXT_PUBLIC_SUPABASE_URL ausente ou inválida"),
  supabasePublishableKey: z
    .string("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ausente")
    .min(1, "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ausente"),
});

const serverSchema = z.object({
  databaseUrl: z
    .string("DATABASE_URL ausente")
    .startsWith("postgres", "DATABASE_URL deve começar com postgres:// ou postgresql://"),
});

function parse<T>(schema: z.ZodType<T>, input: unknown): T {
  const result = schema.safeParse(input);
  if (!result.success) {
    const problemas = result.error.issues.map((i) => `  - ${i.message}`).join("\n");
    throw new Error(
      `Configuração incompleta. Verifique o arquivo .env.local (local) ou as ` +
        `variáveis de ambiente na Vercel:\n${problemas}`,
    );
  }
  return result.data;
}

/** Variáveis públicas (podem ir para o navegador). Referências literais exigidas pelo Next.js. */
export function publicEnv() {
  return parse(publicSchema, {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabasePublishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  });
}

/** Variáveis secretas — somente no servidor. */
export function serverEnv() {
  return parse(serverSchema, {
    databaseUrl: process.env.DATABASE_URL,
  });
}
