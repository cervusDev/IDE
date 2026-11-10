'use client'
import { ReactNode } from "react";
import { Loader2 } from "lucide-react";

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading: boolean;
  keyExtractor: (item: T) => string | number;
  emptyMessage?: string;
}

export function DataTable<T>({
  data,
  columns,
  isLoading,
  keyExtractor,
  emptyMessage = "Nenhum registro encontrado.",
}: DataTableProps<T>) {
  const colSpanCount = columns.length;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-700 text-xs uppercase tracking-wider">
              {columns.map((col, index) => (
                <th key={index} className={`py-3 px-4 font-bold ${col.className || ""}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 text-zinc-800 text-xs sm:text-sm">
            {isLoading ? (
              <tr>
                <td colSpan={colSpanCount} className="py-8 text-center text-zinc-500">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#307FE2]" />
                    <span className="text-xs font-medium">Carregando...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={colSpanCount} className="py-8 text-center text-zinc-500 text-xs">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={keyExtractor(item)} className="hover:bg-zinc-50/80 transition-colors">
                  {columns.map((col, index) => (
                    <td key={index} className={`py-3 px-4 ${col.className || ""}`}>
                      {col.cell
                        ? col.cell(item)
                        : col.accessorKey
                        ? String(item[col.accessorKey] ?? "")
                        : null}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};