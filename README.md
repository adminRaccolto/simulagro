# SimulAgro — Simulador Empresarial do Agronegócio

Business game educacional para gestores do agronegócio (Raccolto Consultoria).

- Contexto do projeto e regras de trabalho: [`CLAUDE.md`](CLAUDE.md)
- Registro de decisões: [`docs/decisoes.md`](docs/decisoes.md)
- Motor do jogo: [`engine/`](engine/README.md)

## Requisitos
- Node.js 24 ou superior

## Comandos
| Comando             | O que faz                                              |
| ------------------- | ------------------------------------------------------ |
| `npm install`       | Instala as dependências                                |
| `npm run dev`       | Abre o app no navegador em http://localhost:3000       |
| `npm test`          | Roda os testes do motor                                |
| `npm run check`     | Lint + checagem de tipos + testes (rodar antes de commitar) |
| `npm run build`     | Gera a versão de produção                              |

## Estrutura
```
app/          telas e rotas (Next.js App Router)
components/   componentes visuais (shadcn/ui)
engine/       motor do jogo — funções puras, sem banco nem tela
lib/          utilitários compartilhados
docs/         especificações e registro de decisões
```
