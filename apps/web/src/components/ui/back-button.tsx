'use client'

import { ArrowLeft } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  const isHomePage = pathname === "/painel_controle" || pathname === "/painel_controle/";

  if (isHomePage) return null;

  return (
    <button
      onClick={() => router.back()}
      title="Voltar à página anterior"
      className="fixed top-6 left-[calc(16rem+1.5rem)] z-50 inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-zinc-700 bg-white/95 hover:bg-zinc-100 border border-zinc-200 rounded-xl transition-all duration-200 shadow-md backdrop-blur-md active:scale-[0.97] group cursor-pointer"
    >
      <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1 text-[#307FE2]" />
      <span className="hidden sm:inline">Voltar</span>
    </button>
  );
}