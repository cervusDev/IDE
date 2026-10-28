"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Links de navegação da Sidebar
  const navigation = [
    { name: "Visão Geral", href: "/dashboard" },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans text-black dark:bg-black dark:text-zinc-50">
      {/* Backdrop/Overlay para Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar / Barra Lateral */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col justify-between border-r border-black/[.08] bg-white p-6 transition-transform duration-200 ease-in-out dark:border-white/[.145] dark:bg-black lg:static lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-8">
          {/* Header da Sidebar com Logo e Botão de Fechar Mobile */}
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Image
                className="dark:invert h-5 w-[100px]"
                src="/next.svg"
                alt="Next.js logo"
                width={100}
                height={20}
                priority
              />
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="rounded-lg p-1 text-zinc-500 hover:bg-black/[.04] dark:text-zinc-400 dark:hover:bg-[#1a1a1a] lg:hidden"
              aria-label="Fechar menu"
            >
              ✕
            </button>
          </div>

          {/* Menus de Navegação */}
          <nav className="flex flex-col gap-1">
            <span className="px-3 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Menu Principal
            </span>
            <div className="mt-2 flex flex-col gap-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex h-10 items-center rounded-lg px-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "text-zinc-600 hover:bg-black/[.04] hover:text-black dark:text-zinc-400 dark:hover:bg-[#1a1a1a] dark:hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Perfil do Usuário na Rodapé da Sidebar */}
        <div className="flex flex-col gap-4 border-t border-black/[.08] pt-4 dark:border-white/[.145]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-xs font-semibold text-white dark:bg-white dark:text-black">
                US
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-medium text-black dark:text-zinc-50">
                  Usuário
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  seu@email.com
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/login"
            className="flex h-9 w-full items-center justify-center rounded-lg border border-black/[.08] text-xs font-medium text-zinc-600 transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:text-zinc-400 dark:hover:bg-[#1a1a1a] dark:hover:text-white"
          >
            Sair
          </Link>
        </div>
      </aside>

      {/* Conteúdo Principal + Header Superior para Mobile */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Header Responsivo (Visível apenas em telas menores para abrir a Sidebar) */}
        <header className="flex h-16 items-center justify-between border-b border-black/[.08] bg-white px-6 dark:border-white/[.145] dark:bg-black lg:hidden">
          <Image
            className="dark:invert h-5 w-[100px]"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
          />
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/[.08] dark:border-white/[.145]"
            aria-label="Abrir menu"
          >
            ☰
          </button>
        </header>

        {/* Área onde as páginas do dashboard serão renderizadas */}
        <main className="flex-1 p-6 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}