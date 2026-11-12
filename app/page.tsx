export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center bg-background px-6 py-24">
      <div className="flex max-w-xl flex-col gap-6">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Raccolto Consultoria
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
          SimulAgro
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">
          Simulador empresarial do agronegócio. Gerencie uma fazenda de grãos no
          médio-norte de Mato Grosso ao longo de várias safras: produção,
          comercialização e finanças.
        </p>
        <p className="rounded-lg border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
          Em construção — etapa 1: estrutura do projeto.
        </p>
      </div>
    </main>
  );
}
