# Registro de Decisões — Simulador Empresarial Agro

Toda decisão tomada no projeto (de produto, de regra de jogo ou técnica) é registrada
aqui, em ordem cronológica. Decisões não são apagadas: se uma mudar, registra-se uma
nova entrada que substitui a anterior (indicando qual).

Formato: **D-número — título** · data · quem decidiu · decisão · motivo / consequências.

---

## D-001 — Stack tecnológica
- **Data:** antes de 2026-11-12 (definida no CLAUDE.md inicial)
- **Decidido por:** Gino
- **Decisão:** TypeScript, Next.js (App Router), Supabase (PostgreSQL + Auth, região
  São Paulo), Drizzle, Tailwind + shadcn/ui, Recharts, Zod, Vitest, Vercel, Git/GitHub.
- **Motivo:** um único projeto para telas e servidor, banco gerenciado no Brasil,
  ferramentas amplamente usadas.

## D-002 — Princípios de arquitetura
- **Data:** antes de 2026-11-12
- **Decidido por:** Gino
- **Decisão:** motor isolado com funções puras; parâmetros fora do código; sorteios
  com semente (seed) iguais para toda a turma; contabilidade por partidas dobradas;
  testes do motor antes de telas; multi-turma desde o início.

## D-003 — Público do MVP
- **Data:** 2026-11-12
- **Decidido por:** Gino
- **Decisão:** gestores do agronegócio. Usos previstos: educação empresarial, cursos
  de graduação e desenvolvimento de profissionais (versão completa); workshops e
  palestras (versão compacta e didática).
- **Consequência:** o motor terá um nível de complexidade configurável por turma
  (compacto × completo) usando as mesmas regras, sem duplicar código.

## D-004 — Formato de jogo
- **Data:** 2026-11-12
- **Decidido por:** Gino
- **Decisão:** existirão os dois modos: (a) competitivo, com equipes da mesma turma
  em ranking; (b) contra o mercado, cada equipe isolada.
- **Consequência:** o modo é escolhido na criação da turma. Ainda a definir: se o modo
  competitivo terá recursos disputados (arrendamento, armazém).

## D-005 — Número de safras por partida
- **Data:** 2026-11-12
- **Decidido por:** Gino
- **Decisão:** configurável de 2 a 10 safras (substitui a proposta inicial de 5).

## D-006 — Região base
- **Data:** 2026-11-12
- **Decidido por:** Gino
- **Decisão:** médio-norte de Mato Grosso.
- **Consequência:** parâmetros regionais ficam em arquivo de cenário, permitindo
  outras regiões no futuro.

## D-007 — Registro de decisões
- **Data:** 2026-11-12
- **Decidido por:** Gino
- **Decisão:** todas as decisões do projeto são registradas neste arquivo.

## D-008 — Versões base do projeto
- **Data:** 2026-11-12
- **Decidido por:** Claude (aprovação pendente)
- **Decisão:** Next.js 16.4, React 19.3, Tailwind 4.3, Vitest 5.1; Node.js 24 ou
  superior (versão padrão atual da Vercel).
- **Motivo:** versões estáveis mais recentes; Node 24 garante que o que roda no
  computador local é igual ao que roda na Vercel.

## D-009 — Estilo visual base do shadcn/ui
- **Data:** 2026-11-12
- **Decidido por:** Claude (aprovação pendente)
- **Decisão:** preset padrão "base-nova", cor neutra, ícones Lucide. Inclui o pacote
  `cn` (mantido pelo próprio autor do shadcn/ui) para combinar classes de estilo.
- **Motivo:** ponto de partida neutro; a identidade visual da Raccolto (cores,
  logo) poderá ser aplicada depois sem retrabalho.

## D-010 — Isolamento do motor verificado automaticamente
- **Data:** 2026-11-12
- **Decidido por:** Claude (aprovação pendente)
- **Decisão:** regra de lint impede que arquivos de `/engine` importem Next.js,
  React, banco de dados ou código das telas.
- **Motivo:** transforma o princípio "motor isolado" (D-002) em uma checagem que
  falha sozinha se alguém quebrar a regra.

## D-011 — Gerador de sorteios com semente
- **Data:** 2026-11-12
- **Decidido por:** Claude (aprovação pendente)
- **Decisão:** algoritmo mulberry32, com semente em texto (ex.:
  `"turma-42:safra-3:clima"`). Implementado em `engine/random.ts`, com testes.
- **Motivo:** rápido, determinístico e simples de auditar. Semente textual
  permite separar sorteios por turma, safra e tipo de evento sem que um interfira
  no outro.

## D-012 — Repositório no GitHub
- **Data:** 2026-11-12
- **Decidido por:** Gino
- **Decisão:** código hospedado em `github.com/adminRaccolto/simulagro`, ramo
  principal `main`.

## D-013 — Projeto Supabase
- **Data:** 2026-11-12
- **Decidido por:** Gino
- **Decisão:** projeto Supabase "simulagro" criado por Gino.

## D-014 — Forma de conexão com o banco
- **Data:** 2026-11-12
- **Decidido por:** Claude (aprovação pendente)
- **Decisão:** duas URLs de conexão: "Transaction pooler" (porta 6543) para o app
  e "Session pooler" (porta 5432) para criar/alterar tabelas (migrações via
  drizzle-kit). Chave pública do tipo "Publishable" (`sb_publishable_…`).
- **Motivo:** é a configuração recomendada pelo Supabase para apps na Vercel, onde
  muitas instâncias curtas abrem conexões; os poolers também funcionam em redes
  só IPv4.
- **Segurança:** senhas ficam apenas no `.env.local` (fora do Git) e nas variáveis
  de ambiente da Vercel. O modelo sem segredos é o `.env.example`.

---

## Pendências (a decidir)
- Modo competitivo: haverá recursos disputados entre equipes (arrendamento, armazém)?
- O que entra exatamente na versão compacta e o que entra na completa.
