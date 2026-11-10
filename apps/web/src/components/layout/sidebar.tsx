"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigation = [
    { name: "Visão Geral", href: "/painel_controle" },
    { name: "Form. socioassistencial", href: "/painel_controle/formulario_psicossocial" },
  ];

  return (
    <>
      {/* Overlay para Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Header Mobile para abrir a Sidebar */}
      <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-6 lg:hidden shadow-sm">
        <Image
          className="h-5 w-[100px]"
          src="/logo.png"
          alt="IDE logo"
          width={100}
          height={40}
        />
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
          aria-label="Abrir menu"
        >
          ☰
        </button>
      </header>

      {/* Sidebar Lateral */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col justify-between border-r border-zinc-200 bg-white p-6 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 shadow-sm ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-8">
          {/* Header da Sidebar */}
          <div className="flex items-center justify-between">
            <Link href="/painel_controle" className="flex items-center gap-2">
              <Image
                className="h-20 w-[100px]"
                src="/logo.png"
                alt="IDE logo"
                width={100}
                height={40}
                priority
              />
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="rounded-lg p-1 text-zinc-500 hover:bg-zinc-100 lg:hidden cursor-pointer"
              aria-label="Fechar menu"
            >
              ✕
            </button>
          </div>

          {/* Menus de Navegação */}
          <nav className="flex flex-col gap-1">
            <span className="px-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
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
                    className={`flex h-10 items-center rounded-xl px-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#F2CD00] text-white font-semibold shadow-sm"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Rodapé da Sidebar / Usuário */}
        <div className="flex flex-col gap-4 border-t border-zinc-200 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-800 border border-zinc-200">
                US
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-medium text-zinc-900">
                  Usuário
                </span>
                <span className="text-xs text-zinc-500">
                  seu@email.com
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/"
            className="flex h-9 w-full items-center justify-center rounded-xl border border-[#D72685] text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          >
            Sair
          </Link>
        </div>
      </aside>
    </>
  );
}