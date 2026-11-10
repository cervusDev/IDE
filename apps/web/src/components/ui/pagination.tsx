'use client'
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

interface PaginationBarProps {
  pagination: PaginationMeta;
  onPageChange: (newPage: number) => void;
  isLoading?: boolean;
}

export const Pagination: React.FC<PaginationBarProps> = ({
  pagination,
  onPageChange,
  isLoading = false,
}) => {
  const { page, totalPages, totalItems } = pagination;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-3.5 sm:px-4 rounded-2xl border border-zinc-200 bg-white shadow-sm gap-3">
      <div className="text-xs sm:text-sm text-zinc-600">
        Mostrando página <span className="font-semibold text-zinc-900">{page}</span> de{" "}
        <span className="font-semibold text-zinc-900">{totalPages}</span> ({totalItems} registros)
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(Math.max(page - 1, 1))}
          disabled={page === 1 || isLoading}
          className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1 cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Anterior
        </button>

        <button
          onClick={() => onPageChange(Math.min(page + 1, totalPages))}
          disabled={page >= totalPages || isLoading}
          className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1 cursor-pointer"
        >
          Próxima
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};