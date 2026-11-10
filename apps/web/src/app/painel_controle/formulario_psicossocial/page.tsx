'use client'

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { formColumns } from "./list/columns";
import { DataTable } from "@/components/layout/table";
import { DataFilter } from "@/components/layout/filter";
import { filterFields } from "./list/filter-fields";
import { Pagination, PaginationMeta } from "@/components/ui/pagination";
import { FormListItem, FormFilters as FormFiltersType } from "./list/types";

const FormListView = () => {
  const [filters, setFilters] = useState<FormFiltersType>({
    healthUnity: "",
    nis: "",
    registration: "",
    studentName: "",
    studentAge: "",
    studentRa: "",
  });

  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1,
  });

  const [data, setData] = useState<FormListItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Função simulada de busca no backend
  const fetchFormsFromBackend = useCallback(async (currentFilters: FormFiltersType, page: number, limit: number) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));

      const mockData: FormListItem[] = [
        {
          id: "1",
          registration: "MAT-2026-001",
          healthUnity: "UBS Central",
          nis: "123.45678.90-1",
          studentName: "João Pedro Silva",
          studentAge: "10",
          studentRa: "98765432-X",
          legalGuardianName: "Maria da Silva",
          createdAt: "10/11/2026",
        },
      ];

      setData(mockData);
      setPagination({
        page,
        limit,
        totalItems: 1,
        totalPages: 1,
      });
    } catch (error) {
      console.error("Erro ao buscar formulários:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFormsFromBackend(filters, pagination.page, pagination.limit);
  }, [filters, pagination.page, pagination.limit, fetchFormsFromBackend]);

  // Ação ao submeter o formulário de filtro
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination((prev) => ({ ...prev, page: 1 }));
    // Os dados já são atualizados no estado por causa do binding do DataFilter
  };

  // Ação ao limpar os filtros
  const handleResetFilters = () => {
    setFilters({
      healthUnity: "",
      nis: "",
      registration: "",
      studentName: "",
      studentAge: "",
      studentRa: "",
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return (
    <div className="space-y-6 text-zinc-900 max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
            Cadastros socioassistenciais
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 mt-1">
            Gerencie e filtre os formulários cadastrados no sistema socioassistencial.
          </p>
        </div>

        <Link
          href="/painel_controle/formulario_psicossocial/cadastrar"
          className="px-6 py-3 text-base font-bold text-white bg-[#D72685] hover:opacity-80 rounded-xl transition-opacity shadow-md flex items-center gap-2.5 active:scale-[0.98]"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
          <span>Novo Cadastro</span>
        </Link>
      </div>

      <DataFilter
        title="Filtrar Cadastros"
        fields={filterFields}
        filters={filters}
        setFilters={setFilters}
        onSearch={handleSearch}
        onReset={handleResetFilters}
      />

      <div className="space-y-4">
        <DataTable
          data={data}
          columns={formColumns}
          isLoading={isLoading}
          keyExtractor={(item) => item.id}
          emptyMessage="Nenhum registro encontrado."
        />

        <Pagination
          pagination={pagination}
          onPageChange={(newPage) => setPagination((prev) => ({ ...prev, page: newPage }))}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default FormListView;