'use client'

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Loader2, Plus, RefreshCw } from "lucide-react";
import { getFormColumns } from "./list/columns";
import { DataTable } from "@/components/layout/table";
import { DataFilter } from "@/components/layout/filter";
import { filterFields } from "./list/filter-fields";
import { Pagination, PaginationMeta } from "@/components/ui/pagination";
import { FormFilters as FormFiltersType } from "./list/types";
import { useDeleteScreening, useListScreenings, useUpdateAllStudentsAges } from "@/hooks/useScreening";
import { toast } from "sonner";

const FormListView = () => {
  const methods = useForm<FormFiltersType>({
    defaultValues: {
      healthUnity: "",
      nis: "",
      registration: "",
      studentName: "",
      studentAge: "",
      studentRa: "",
    },
  });

  const { reset } = methods;

  const [appliedFilters, setAppliedFilters] = useState<FormFiltersType>({
    healthUnity: "",
    nis: "",
    registration: "",
    studentName: "",
    studentAge: "",
    studentRa: "",
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
  });

  const { data: responseData, isLoading, refetch } = useListScreenings({
    page: String(pagination.page),
    limit: String(pagination.limit),
    healthUnity: appliedFilters.healthUnity || undefined,
    nis: appliedFilters.nis || undefined,
    registration: appliedFilters.registration || undefined,
    studentName: appliedFilters.studentName || undefined,
    studentAge: appliedFilters.studentAge ? appliedFilters.studentAge : undefined,
    studentRa: appliedFilters.studentRa || undefined,
  });

  const { mutate: updateAges, isPending } = useUpdateAllStudentsAges();
  const { mutateAsync: deleteScreening } = useDeleteScreening();


  const handleUpdate = () => {
    updateAges(undefined, {
      onSuccess: () => {
        toast.success("Idades de todos os alunos atualizadas com sucesso!")
      },
    });
  };

  const data = responseData?.list ?? [];
  const paginationMeta: PaginationMeta = {
    page: responseData?.pagination.page ?? pagination.page,
    limit: responseData?.pagination.limit ?? pagination.limit,
    totalItems: responseData?.pagination.total ?? 0,
    totalPages: Math.ceil((responseData?.pagination.total ?? 0) / pagination.limit) || 1,
  };

  const handleSearch = (formData: FormFiltersType) => {
    setAppliedFilters(formData);
    setPagination((prev) => ({ ...prev, page: 1 }));
    refetch()
  };

  const handleResetFilters = () => {
    reset();
    const emptyFilters = {
      healthUnity: "",
      nis: "",
      registration: "",
      studentName: "",
      studentAge: "",
      studentRa: "",
    };
    setAppliedFilters(emptyFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };


  const columns = useMemo(() => getFormColumns({
    onDelete: async (item) => {
       await deleteScreening({
        registration: item.registration
      });
    }
  }), [deleteScreening]);

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
        <div className="flex gap-4">
          <Link
            href="/painel_controle/formulario_psicossocial/cadastrar"
            className="px-6 py-3 text-base font-bold text-white bg-[#D72685] hover:opacity-80 rounded-xl transition-opacity shadow-md flex items-center gap-2.5 active:scale-[0.98]"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            <span>Novo Cadastro</span>
          </Link>
          <button
            onClick={handleUpdate}
            disabled={isPending}
            className="px-4 py-2 bg-[#307FE2] text-white rounded-xl font-bold hover:opacity-80 transition-opacity flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            <span>Atualizar Idades</span>
          </button>
        </div>
      </div>
      <DataFilter
        fields={filterFields}
        methods={methods}
        onSearch={handleSearch}
        onReset={handleResetFilters}
      />

      <div className="space-y-4">
        <DataTable
          data={data}
          columns={columns}
          isLoading={isLoading}
          keyExtractor={(item) => item.id}
          emptyMessage="Nenhum registro encontrado."
        />
        <Pagination
          pagination={paginationMeta}
          onPageChange={(newPage) => setPagination((prev) => ({ ...prev, page: newPage }))}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default FormListView;