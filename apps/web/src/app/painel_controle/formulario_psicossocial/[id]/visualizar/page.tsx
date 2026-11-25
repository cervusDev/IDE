'use client'

import { use, useState } from "react";
import { PsychosocialForm } from "../../cadastrar/page";
import { useVersionsScreening, useFindScreening } from "@/hooks/useScreening"; // Ajuste o caminho do hook
import { Loader2, History } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function VisualizarFormularioPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const initialId = resolvedParams.id;
  const [selectedId, setSelectedId] = useState<string>(initialId);
  const { data: screeningDetail, isLoading: isLoadingDetail, isError: isErrorDetail } = useFindScreening(selectedId);
  const registration = screeningDetail?.informational?.registration ?? "";
  const { data: versionsData } = useVersionsScreening(
    { registration },
    { enabled: Boolean(registration) }
  );

  // 3. Busca a lista de versões vinculadas ao registro (para permitir a troca de versão na tela)

  if (isLoadingDetail) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[600px] gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#D72685]" />
        <p className="text-zinc-600 font-medium">Carregando detalhes do cadastro...</p>
      </div>
    );
  }

  if (isErrorDetail || !screeningDetail) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[600px] gap-2">
        <p className="text-red-600 font-semibold">Erro ao carregar os dados do formulário.</p>
        <p className="text-zinc-500 text-sm">O registro solicitado não foi encontrado ou ocorreu uma falha na rede.</p>
      </div>
    );
  }

  // Mapeia os dados vindos da API para o formato esperado pelo `FormSchemaType` do PsychosocialForm
  const formattedInitialData = {
    healthUnity: screeningDetail.informational.healthUnity,
    registration: screeningDetail.informational.registration,
    nis: screeningDetail.informational.nis,
    studentName: screeningDetail.informational.studentName,
    studentBirthDate: screeningDetail.informational.studentBirthDate,
    studentColor: screeningDetail.informational.studentColor,
    studentAge: screeningDetail.informational.studentAge,
    studentRa: screeningDetail.informational.studentRa,
    studentGender: screeningDetail.informational.studentGender as any,
    studentEducationalAttainment: screeningDetail.informational.studentEducationalAttainment,
    studentSchoolName: screeningDetail.informational.studentSchoolName,
    studentSchoolPeriod: screeningDetail.informational.studentSchoolPeriod,
    streetAddress: screeningDetail.informational.streetAddress,
    neighborhood: screeningDetail.informational.neighborhood,

    motherName: screeningDetail.informational.motherName,
    motherAge: screeningDetail.informational.motherAge,
    motherEducationalAttainment: screeningDetail.informational.motherEducationalAttainment,
    motherOccupation: screeningDetail.informational.motherOccupation,
    motherContact: screeningDetail.informational.motherContact,

    fatherName: screeningDetail.informational.fatherName,
    fatherAge: screeningDetail.informational.fatherAge,
    fatherEducationalAttainment: screeningDetail.informational.fatherEducationalAttainment,
    fatherOccupation: screeningDetail.informational.fatherOccupation,
    fatherContact: screeningDetail.informational.fatherContact,

    grossHouseholdIncome: screeningDetail.informational.grossHouseholdIncome,
    parentMaritalStatus: screeningDetail.informational.parentsMaritalStatus,
    legalGuardianName: screeningDetail.informational.legalGuardianName,
    religion: screeningDetail.informational.religion,
    housingStatus: screeningDetail.informational.housingStatus as any,

    // Benefícios Sociais
    ...screeningDetail.benefits,

    // Membros da Família
    members: screeningDetail.familyMembers.map((member) => ({
      fullName: member.fullName,
      age: member.age,
      relationship: member.relationship,
      educational_attainment: member.educationalAttainment, // Ajuste caso a chave no form seja educationalAttainment
      educationalAttainment: member.educationalAttainment,
      contact: member.contact,
    })),

    // Avaliação Psicossocial
    ...screeningDetail.psychosocialEvaluation,
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
      {/* Barra superior de histórico / seletor de versões */}
      {versionsData?.list && versionsData.list.length > 1 && (
        <div className="bg-white p-3 rounded-2xl border border-zinc-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-fit">
          <div className="flex items-center gap-2 text-zinc-700 font-medium text-sm whitespace-nowrap">
            <History className="w-4 h-4 text-[#D72685] shrink-0" />
            <span>Histórico de Versões:</span>
          </div>
          <div className="w-full sm:w-auto">
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="bg-zinc-50 border border-zinc-300 text-zinc-800 text-sm rounded-xl px-3 py-1.5 outline-none focus:border-[#D72685] transition w-full sm:w-52"
            >
              {versionsData.list.map((v) => (
                <option key={v.id} value={v.id}>
                  Versão {v.version} {v.isLatest ? "⭐ (Atual)" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Formulário em modo de visualização (readOnly={true}) */}
      <PsychosocialForm
        initialData={formattedInitialData as any}
        formId={selectedId}
        readOnly={true}
      />
    </div>
  );
}