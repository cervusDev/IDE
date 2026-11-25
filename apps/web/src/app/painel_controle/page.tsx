"use client";

import { useCountScreenings } from "@/hooks/useScreening";
import Link from "next/link";

export default function HomePage() {
  const { data, isLoading, isError } = useCountScreenings();
  const familyCountValue = isLoading
    ? "..."
    : isError
      ? "—"
      : String(data?.count ?? 0);
  const stats = [
    {
      label: "Famílias Cadastradas",
      value: familyCountValue,
      change: "Núcleos Familiares",
      disabled: false,
    },
    {
      label: "Indicadores Alcançados",
      value: "-",
      change: "Módulo indisponível",
      disabled: true,
    }
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
      title: "Gestão de Projetos",
      description: "Acompanhe o andamento das oficinas, atividades socioeducativas e o engajamento dos assistidos.",
      href: "#",
      badge: "Em breve",
      disabled: true, // Desativado
    },
  ];

  return (
    <div className="space-y-10 text-zinc-900">
      {/* Mensagem de Boas-Vindas */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-8 sm:p-10 shadow-sm">
        <div className="flex flex-col gap-3">
          <span className="text-sm font-bold uppercase tracking-widest text-[#D72685]">
            Painel do Colaborador
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900">
            Bem-vindo à Plataforma IDE
          </h1>
          <p className="max-w-3xl text-base sm:text-lg text-zinc-700 mt-1 leading-relaxed">
            <strong className="text-zinc-900 font-semibold">Associação Ide de Assistência à Infância e à Juventude</strong>.
            Acesse as ferramentas administrativas para gestão de dados socioeconômicos, acompanhamento das famílias e registro de assistidos.
          </p>
        </div>
      </div>

      {/* Cards com Métricas / Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat) => {
          if (stat.disabled) {
            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-zinc-200 bg-zinc-50/80 p-7 opacity-75 cursor-not-allowed select-none"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm sm:text-base font-medium text-zinc-500">
                    {stat.label}
                  </p>
                  <span className="text-xs font-semibold text-zinc-600 bg-zinc-200/80 px-2.5 py-0.5 rounded-full border border-zinc-300/60">
                    Em breve
                  </span>
                </div>
                <p className="text-4xl sm:text-5xl font-extrabold text-zinc-500 mt-2">
                  {stat.value}
                </p>
                <p className="text-sm font-semibold text-zinc-500 mt-2">
                  {stat.change}
                </p>
              </div>
            );
          }

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm"
            >
              <p className="text-sm sm:text-base font-medium text-zinc-600">
                {stat.label}
              </p>
              <p className="text-4xl sm:text-5xl font-extrabold text-zinc-900 mt-2">
                {stat.value}
              </p>
              <p className="text-sm font-semibold text-[#43B02A] mt-2">
                {stat.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* Acesso Rápido */}
      <div className="space-y-5">
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">
          Acesso Rápido
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action) => {
            if (action.disabled) {
              return (
                <div
                  key={action.title}
                  className="relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-zinc-50/80 p-8 opacity-75 cursor-not-allowed select-none"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-zinc-600 bg-zinc-200/80 px-3 py-1 rounded-full border border-zinc-300/60">
                        {action.badge}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-zinc-600">
                      {action.title}
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-500 mt-2.5 leading-relaxed">
                      {action.description}
                    </p>
                  </div>
                  <div className="mt-8 flex items-center text-sm font-semibold text-zinc-500">
                    Módulo indisponível
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={action.title}
                href={action.href}
                className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-8 hover:border-[#D72685] hover:shadow-md transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-[#43B02A] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      {action.badge}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-900 group-hover:text-[#D72685] transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-700 mt-2.5 leading-relaxed">
                    {action.description}
                  </p>
                </div>
                <div className="mt-8 flex items-center text-sm sm:text-base font-bold text-[#D72685] group-hover:opacity-90">
                  Acessar módulo →
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}