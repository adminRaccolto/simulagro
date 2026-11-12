# Simulador Empresarial Agro — Contexto do Projeto

@AGENTS.md

## O que é
Simulador empresarial educacional (business game) para o agronegócio brasileiro.
Equipes/jogadores gerenciam uma fazenda de grãos ao longo de várias safras, tomando
decisões de produção, comercialização e finanças. Um motor processa as decisões a cada
rodada e devolve resultados (DRE, balanço, fluxo de caixa, ranking).

Dono do produto: Gino (Raccolto Consultoria). Gino NÃO é programador — explique
decisões técnicas em linguagem simples, em português do Brasil, e peça confirmação
antes de mudanças grandes de arquitetura.

## Stack definida
- Linguagem: TypeScript (strict) em todo o projeto
- Framework: Next.js (App Router) — telas + servidor no mesmo projeto
- Banco: PostgreSQL via Supabase (região São Paulo), com Supabase Auth para login
- ORM: Drizzle
- UI: Tailwind CSS + shadcn/ui; gráficos com Recharts
- Validação: Zod (todas as decisões de jogadores validadas no servidor)
- Testes: Vitest
- Hospedagem: Vercel (app, região Brasil) + Supabase (banco)
- Versionamento: Git + GitHub

## Princípios de arquitetura
1. **Motor isolado**: as regras do jogo ficam em um módulo próprio (`/engine`), com
   funções puras — sem acesso a banco, rede ou tela. Entrada: estado + decisões +
   parâmetros. Saída: novo estado + resultados.
2. **Parâmetros fora do código**: produtividades, custos, preços, alíquotas,
   probabilidades de clima etc. ficam em arquivos de parâmetros/cenários, para serem
   recalibrados sem reprogramar.
3. **Aleatoriedade com semente (seed)**: o clima e os eventos sorteados são iguais
   para todas as equipes da mesma turma (disputa justa) e toda partida é reproduzível.
4. **Contabilidade por partidas dobradas**: DRE, balanço e fluxo de caixa sempre
   fecham. Testes devem garantir que ativo = passivo + PL em toda rodada.
5. **Testes do motor são obrigatórios** antes de qualquer tela.
6. **Multi-turma desde o início**: todo dado pertence a uma turma; um facilitador
   nunca vê dados de turmas de outros.

## Modelo de jogo (rascunho)
- Rodada = 1 safra (soja verão + milho safrinha). Número de safras configurável
  por partida, de 2 a 10 (o facilitador escolhe ao criar a turma).
- Região base: médio-norte de Mato Grosso (confirmado). O motor deve aceitar outras
  regiões no futuro via arquivo de cenário.
- Blocos do motor:
  - Produção: área, pacote tecnológico, janela de plantio, produtividade × clima sorteado
  - Comercialização: preço = CBOT + prêmio + câmbio − frete (basis); venda spot,
    venda antecipada/travas, barter, armazenagem
  - Financeiro: capital próprio, custeio, juros, seguro rural, tributos simplificados
    (Funrural, IR do produtor rural etc.) — módulo tributário será validado por contador
  - Eventos: choques definidos pelo facilitador ou sorteados
  - Pontuação: scorecard (lucro, patrimônio, liquidez, gestão de risco)
- Produtor é tomador de preço: a competição vem da gestão de risco e margem, não de
  disputa de market share.

## Registro de decisões (OBRIGATÓRIO)
Toda decisão tomada com Gino (produto, regras do jogo ou técnica) deve ser registrada
em `/docs/decisoes.md` no mesmo momento em que for tomada, seguindo o formato do
arquivo (D-número, data, quem decidiu, decisão, motivo/consequências). Decisões
técnicas que eu (Claude) tomar por conta própria também entram, marcadas como
"Decidido por: Claude (aprovação pendente)" quando Gino ainda não as tiver revisado.

## Decisões confirmadas com Gino (2026-11-12) — resumo; detalhes em /docs/decisoes.md
1. **Público**: gestores do agronegócio. Usos previstos:
   - Educação empresarial e cursos (graduação, desenvolvimento de profissionais):
     versão completa, várias safras, decisões detalhadas.
   - Workshops e palestras: versão compacta e didática (menos decisões, poucas
     safras, resultados fáceis de explicar em sala).
   → O motor precisa de um "nível de complexidade" configurável por turma
     (ex.: compacto × completo), sem duplicar regras.
2. **Formato**: os dois modos existirão:
   - Competitivo: equipes da mesma turma, com ranking (e, a definir, recursos
     disputados como arrendamento e armazém).
   - Contra o mercado: cada jogador/equipe isolado, sem interação com os demais.
   → O modo é escolhido na criação da turma.
3. **Safras por partida**: de 2 a 10, configurável.
4. **Região base**: médio-norte de MT.

## Ordem de trabalho do MVP
1. Estrutura do projeto, lint, testes, conexão Supabase, deploy inicial na Vercel
2. Especificação detalhada do motor (documento em `/docs/motor.md`) — revisar com Gino
3. Motor + testes (sem tela)
4. Modo solo jogável (uma fazenda, telas simples)
5. Turmas, equipes, facilitador, ranking
6. Piloto
