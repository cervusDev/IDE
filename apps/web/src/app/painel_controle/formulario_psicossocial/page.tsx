'use client'

import { useState, useEffect, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Plus } from "lucide-react";
import { formColumns } from "./list/columns";
import { DataTable } from "@/components/layout/table";
import { DataFilter } from "@/components/layout/filter";
import { filterFields } from "./list/filter-fields";
import { Pagination, PaginationMeta } from "@/components/ui/pagination";
import { FormListItem, FormFilters as FormFiltersType } from "./list/types";
import { Button } from "@/components/ui/button";

const ALL_MOCK_FORMS: FormListItem[] = [
  { id: "1", registration: "MAT-2026-001", healthUnity: "UBS Central", nis: "123.45678.90-1", studentName: "João Pedro Silva", studentAge: "10", studentRa: "98765432-X", legalGuardianName: "Maria da Silva", createdAt: "10/11/2026" },
  { id: "2", registration: "MAT-2026-002", healthUnity: "UBS Norte", nis: "223.45678.90-2", studentName: "Ana Clara Souza", studentAge: "9", studentRa: "87654321-Y", legalGuardianName: "Carlos Souza", createdAt: "10/11/2026" },
  { id: "3", registration: "MAT-2026-003", healthUnity: "UBS Sul", nis: "323.45678.90-3", studentName: "Lucas Gabriel", studentAge: "11", studentRa: "76543210-Z", legalGuardianName: "Juliana Gabriel", createdAt: "10/11/2026" },
  { id: "4", registration: "MAT-2026-004", healthUnity: "UBS Leste", nis: "423.45678.90-4", studentName: "Beatriz Lima", studentAge: "8", studentRa: "65432109-W", legalGuardianName: "Roberto Lima", createdAt: "10/11/2026" },
  { id: "5", registration: "MAT-2026-005", healthUnity: "UBS Oeste", nis: "523.45678.90-5", studentName: "Gabriel Santos", studentAge: "12", studentRa: "54321098-V", legalGuardianName: "Fernanda Santos", createdAt: "10/11/2026" },
  { id: "6", registration: "MAT-2026-006", healthUnity: "UBS Central", nis: "623.45678.90-6", studentName: "Larissa Oliveira", studentAge: "7", studentRa: "43210987-U", legalGuardianName: "Marcos Oliveira", createdAt: "10/11/2026" },
  { id: "7", registration: "MAT-2026-007", healthUnity: "UBS Norte", nis: "723.45678.90-7", studentName: "Matheus Henrique", studentAge: "10", studentRa: "32109876-T", legalGuardianName: "Patrícia Henrique", createdAt: "10/11/2026" },
  { id: "8", registration: "MAT-2026-008", healthUnity: "UBS Sul", nis: "823.45678.90-8", studentName: "Camila Rodrigues", studentAge: "9", studentRa: "21098765-S", legalGuardianName: "Bruno Rodrigues", createdAt: "10/11/2026" },
  { id: "9", registration: "MAT-2026-009", healthUnity: "UBS Leste", nis: "923.45678.90-9", studentName: "Vitor Hugo", studentAge: "11", studentRa: "10987654-R", legalGuardianName: "Renata Hugo", createdAt: "10/11/2026" },
  { id: "10", registration: "MAT-2026-010", healthUnity: "UBS Oeste", nis: "023.45678.90-0", studentName: "Isabela Cristina", studentAge: "8", studentRa: "09876543-Q", legalGuardianName: "Marcelo Cristina", createdAt: "10/11/2026" },
  { id: "11", registration: "MAT-2026-011", healthUnity: "UBS Central", nis: "113.45678.90-1", studentName: "Rafael Costa", studentAge: "10", studentRa: "98765431-P", legalGuardianName: "Sandra Costa", createdAt: "10/11/2026" },
];

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

  // Estado separado apenas para os filtros que foram EFETIVAMENTE APLICADOS no botão "Pesquisar"
  const [appliedFilters, setAppliedFilters] = useState<FormFiltersType>({
    healthUnity: "",
    nis: "",
    registration: "",
    studentName: "",
    studentAge: "",
    studentRa: "",
  });

  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    limit: 8,
    totalItems: 0,
    totalPages: 1,
  });

  const [data, setData] = useState<FormListItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // A filtragem agora usa estritamente os filtros aplicados, e não o watch em tempo real
  const filteredForms = useMemo(() => {
    return ALL_MOCK_FORMS.filter((item) => {
      const matchName = appliedFilters.studentName
        ? item.studentName.toLowerCase().includes(appliedFilters.studentName.toLowerCase())
        : true;
      const matchUnity = appliedFilters.healthUnity
        ? item.healthUnity.toLowerCase().includes(appliedFilters.healthUnity.toLowerCase())
        : true;
      const matchNis = appliedFilters.nis ? item?.nis?.includes(appliedFilters.nis) : true;
      const matchRegistration = appliedFilters.registration ? item.registration.includes(appliedFilters.registration) : true;
      const matchRa = appliedFilters.studentRa ? item.studentRa.includes(appliedFilters.studentRa) : true;

      return matchName && matchUnity && matchNis && matchRegistration && matchRa;
    });
  }, [appliedFilters]);

  const fetchFormsFromBackend = useCallback(async (page: number, limit: number) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedData = filteredForms.slice(startIndex, endIndex);

      const totalItems = filteredForms.length;
      const totalPages = Math.ceil(totalItems / limit) || 1;

      setData(paginatedData);
      setPagination({
        page,
        limit,
        totalItems,
        totalPages,
      });
    } catch (error) {
      console.error("Erro ao buscar formulários:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filteredForms]);

  // O useEffect agora depende apenas da paginação e dos filtros aplicados
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchFormsFromBackend(pagination.page, pagination.limit);
  }, [appliedFilters, pagination.page, pagination.limit, fetchFormsFromBackend]);

  const handleSearch = (formData: FormFiltersType) => {
    // Disparado somente ao clicar no botão "Pesquisar"
    setAppliedFilters(formData);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleResetFilters = () => {
    reset(); // Reseta os campos do formulário visualmente
    const emptyFilters = {
      healthUnity: "",
      nis: "",
      registration: "",
      studentName: "",
      studentAge: "",
      studentRa: "",
    };
    setAppliedFilters(emptyFilters); // Reseta os filtros aplicados
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
        <div className="flex gap-4">
          <Link
            href="/painel_controle/formulario_psicossocial/cadastrar"
            className="px-6 py-3 text-base font-bold text-white bg-[#D72685] hover:opacity-80 rounded-xl transition-opacity shadow-md flex items-center gap-2.5 active:scale-[0.98]"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            <span>Novo Cadastro</span>
          </Link>
          <button className="px-6 py-3 text-base font-bold text-white bg-[#D72685] hover:opacity-80 rounded-xl transition-opacity shadow-md flex items-center gap-2.5 active:scale-[0.98]">
            Atualizar Formulários
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