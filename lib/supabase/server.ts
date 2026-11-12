import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { publicEnv } from "@/lib/env";

/**
 * Cliente Supabase para uso no servidor (Server Components, Server Actions, rotas).
 * Lê/escreve a sessão do usuário nos cookies da requisição.
 */
export async function createClient() {
  const cookieStore = await cookies();
  const { supabaseUrl, supabasePublishableKey } = publicEnv();

  return createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Chamado a partir de um Server Component (cookies só leitura).
          // Pode ser ignorado: a renovação de sessão será feita pelo proxy
          // quando o login for implementado.
        }
      },
    },
  });
}
