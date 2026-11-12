# Motor do jogo (`/engine`)

Regras do simulador em funções puras: **sem** banco de dados, rede, telas, React ou
Next.js. Entrada: estado + decisões + parâmetros → saída: novo estado + resultados.

Regra verificada automaticamente pelo lint: arquivos desta pasta não podem importar
`next`, `react`, banco de dados nem código das telas (`@/app`, `@/components`, `@/db`).

Todo arquivo de regra tem um arquivo de teste ao lado (`*.test.ts`). Rodar: `npm test`.
