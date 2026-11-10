import Link from "next/link";

export default function HomePage() {
  const stats = [
    { label: "Assistidos Ativos", value: "128", change: "Crianças e Jovens" },
    { label: "Famílias Cadastradas", value: "94", change: "Núcleos Familiares" },
  ];

  const quickActions = [
    {
      title: "Cadastrar Assistido",
      description: "Preencha a ficha socioeconômica e dados de identificação.",
      href: "/painel_controle/formulario_psicossocial/cadastrar",
      badge: "Formulário",
      disabled: false, // Ativo
    },
    {
      title: "Análise Estatística & Indicadores",
      description: "Gere gráficos e relatórios demográficos sobre renda, faixa etária e vulnerabilidade das famílias.",
      href: "#",
      badge: "Em breve",
      disabled: true, // Desativado (Novo módulo analítico)
    },
    {
      title: "Programas Sociais",
      description: "Visualize os benefícios vinculados aos cadastros.",
      href: "#",
      badge: "Em breve",
      disabled: true, // Desativado
    },
  ];

  return (
    <div className="space-y-8 text-zinc-900">
      {/* Mensagem de Boas-Vindas */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#D72685]">
            Painel do Colaborador
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
            Bem-vindo à Plataforma IDE
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-zinc-600 mt-1">
            <strong className="text-zinc-900 font-semibold">Associação Ide de Assistência à Infância e à Juventude</strong>.
            Acesse as ferramentas administrativas para gestão de dados socioeconômicos, acompanhamento das famílias e registro de assistidos.
          </p>
        </div>
      </div>

      {/* Cards com Métricas / Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
          >
            <p className="text-xs font-medium text-zinc-500">{stat.label}</p>
            <p className="text-3xl font-bold text-zinc-900 mt-2">{stat.value}</p>
            <p className="text-xs font-medium text-[#43B02A] mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Acesso Rápido */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-800">
          Acesso Rápido
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => {
            if (action.disabled) {
              return (
                <div
                  key={action.title}
                  className="relative flex flex-col justify-between rounded-xl border border-zinc-200 bg-zinc-50/60 p-6 opacity-60 cursor-not-allowed select-none"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-zinc-500 bg-zinc-200/60 px-2.5 py-1 rounded-full border border-zinc-300/50">
                        {action.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-zinc-500">
                      {action.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 line-clamp-2">
                      {action.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center text-xs font-medium text-zinc-400">
                    Módulo indisponível
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={action.title}
                href={action.href}
                className="group relative flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 hover:border-[#D72685] hover:shadow-md transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-[#43B02A] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      {action.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 group-hover:text-[#D72685] transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-xs text-zinc-600 mt-2 line-clamp-2">
                    {action.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center text-xs font-bold text-[#D72685] group-hover:opacity-90">
                  Acessar módulo &rarr;
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Comunicados Internos / Informações Institucionais */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-bold text-zinc-800 mb-2">
          Orientações do Sistema
        </h3>
        <ul className="list-disc list-inside text-xs text-zinc-600 space-y-1.5 leading-relaxed">
          <li>Mantenha as fichas cadastrais sempre atualizadas para relatórios socioassistenciais.</li>
          <li>Em caso de dúvida no preenchimento do NIS ou programas sociais, consulte o manual interno no menu de apoio.</li>
          <li>Todos os dados dos assistidos estão protegidos de acordo com as normas de privacidade e LGPD.</li>
        </ul>
      </div>
    </div>
  );
}