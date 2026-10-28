export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Boas-vindas */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Visão Geral
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Aqui está um resumo das atividades e métricas recentes do seu sistema.
        </p>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex flex-col justify-between rounded-xl border border-black/[.08] bg-white p-6 dark:border-white/[.145] dark:bg-black">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Total de Acessos</span>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-black dark:text-zinc-50">12.480</span>
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">+12% este mês</span>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-black/[.08] bg-white p-6 dark:border-white/[.145] dark:bg-black">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Usuários Ativos</span>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-black dark:text-zinc-50">1.245</span>
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">+4% hoje</span>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-black/[.08] bg-white p-6 dark:border-white/[.145] dark:bg-black">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Status do Sistema</span>
          <div className="mt-4 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-sm font-medium text-black dark:text-zinc-50">Operacional</span>
          </div>
        </div>
      </div>

      {/* Seção de Atividades */}
      <div className="flex flex-col rounded-xl border border-black/[.08] bg-white p-6 dark:border-white/[.145] dark:bg-black">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-black dark:text-zinc-50">
            Atividades Recentes
          </h2>
          <button className="text-xs font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors">
            Ver tudo
          </button>
        </div>

        <div className="flex flex-col divide-y divide-black/[.08] dark:divide-white/[.145]">
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-black dark:text-zinc-200">Novo usuário cadastrado</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">Há 5 minutos</span>
              </div>
            </div>
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">ID #8492</span>
          </div>

          <div className="flex flex-col py-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-black dark:text-zinc-200">Deploy realizado com sucesso</span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">Há 2 horas</span>
                </div>
              </div>
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">v1.2.4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}