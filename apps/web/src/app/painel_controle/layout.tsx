import React, { Suspense } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { BackButton } from "@/components/ui/back-button"; // Ajuste o import conforme o caminho do seu projeto

export default function DashboardHomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[var(--background)] text-zinc-900 relative">
      <Sidebar />
      
      {/* O Suspense isola o uso de usePathname() e evita o erro de prerendering */}
      <Suspense fallback={null}>
        <BackButton />
      </Suspense>

      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}