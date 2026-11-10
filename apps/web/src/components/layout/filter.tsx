'use client'
import React from "react";
import { Filter, Search, RotateCcw } from "lucide-react";

export interface FilterField<T> {
  name: keyof T;
  label: string;
  type?: "text" | "number" | "select";
  placeholder?: string;
  options?: { label: string; value: string | number }[];
  colSpan?: string;
}

interface DataFilterProps<T> {
  title?: string;
  subtitle?: string;
  fields: FilterField<T>[];
  filters: T;
  setFilters: React.Dispatch<React.SetStateAction<T>>;
  onSearch: (e: React.FormEvent) => void;
  onReset: () => void;
}

export function DataFilter<T extends Record<string, any>>({
  title = "Filtrar Cadastros",
  subtitle = "",
  fields,
  filters,
  setFilters,
  onSearch,
  onReset,
}: DataFilterProps<T>) {
  const handleChange = (name: keyof T, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <details className="bg-white rounded-2xl border border-zinc-200 shadow-sm group" open>
      <summary className="p-4 sm:p-5 flex justify-between items-center cursor-pointer select-none text-base sm:text-lg font-bold text-zinc-800 hover:text-zinc-950 transition">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#307FE2]" />
          <span>{title}</span>
          {subtitle && (
            <span className="text-xs font-normal text-zinc-500 ml-2 hidden sm:inline">
              ({subtitle})
            </span>
          )}
        </div>
        <span className="transform group-open:rotate-180 transition-transform duration-200 text-xs text-zinc-400">
          ▼
        </span>
      </summary>

      <form onSubmit={onSearch} className="px-4 sm:px-5 pb-4 pt-2 border-t border-zinc-100 space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {fields.map((field) => (
            <div key={String(field.name)} className={field.colSpan || ""}>
              <label className="text-xs font-semibold mb-1 text-zinc-700 block">
                {field.label}
              </label>

              {field.type === "select" ? (
                <select
                  value={filters[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-[#307FE2] focus:border-[#307FE2]"
                >
                  <option value="">Selecione...</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || "text"}
                  placeholder={field.placeholder || ""}
                  value={filters[field.name] ?? ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-[#307FE2] focus:border-[#307FE2]"
                />
              )}
            </div>
          ))}
        </div>

        {/* Botões de Ação do Filtro */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2 border-t border-zinc-100">
          <button
            type="button"
            onClick={onReset}
            className="px-3.5 py-1.5 text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Limpar
          </button>
          <button
            type="submit"
            className="px-4 py-1.5 text-xs font-bold text-white bg-[#D72685] hover:opacity-80 rounded-xl transition-opacity shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            Pesquisar
          </button>
        </div>
      </form>
    </details>
  );
}