'use client'

import { use } from "react";
import { Loader2 } from "lucide-react";
import PsychosocialForm from "@/app/painel_controle/formulario_psicossocial/cadastrar/page";
import { useFindScreening } from "@/hooks/useScreening"; // Ajuste o caminho do seu hook
import { FormSchemaType } from "../cadastrar/schema";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditarFormularioPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  // 1. Busca os dados reais do registro pelo ID
  const { data: screeningDetail, isLoading, isError } = useFindScreening(id);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[600px] gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#D72685]" />
        <p className="text-zinc-600 font-medium">Carregando formulário para edição...</p>
      </div>
    );
  }

  if (isError || !screeningDetail) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[600px] gap-2">
        <p className="text-red-600 font-semibold">Erro ao carregar os dados para edição.</p>
        <p className="text-zinc-500 text-sm">Verifique se o registro existe ou tente novamente.</p>
      </div>
    );
  }

  // 2. Adapta o objeto retornado pela API para a estrutura esperada pelo FormSchemaType
  const initialData: Partial<FormSchemaType> = {
    // --- Passo 1: Dados Gerais ---
    healthUnity: screeningDetail.informational.healthUnity,
    registration: screeningDetail.informational.registration,
    nis: screeningDetail.informational.nis ?? "",
    studentName: screeningDetail.informational.studentName,
    studentBirthDate: screeningDetail.informational.studentBirthDate,
    studentColor: screeningDetail.informational.studentColor,
    studentAge: String(screeningDetail.informational.studentAge),
    studentRa: screeningDetail.informational.studentRa,
    studentGender: screeningDetail.informational.studentGender as FormSchemaType["studentGender"],
    studentGenderOther: screeningDetail.informational.studentGenderOther ?? "",
    studentEducationalAttainment: screeningDetail.informational.studentEducationalAttainment,
    studentSchoolName: screeningDetail.informational.studentSchoolName,
    studentSchoolPeriod: screeningDetail.informational.studentSchoolPeriod,
    streetAddress: screeningDetail.informational.streetAddress,
    neighborhood: screeningDetail.informational.neighborhood,

    motherName: screeningDetail.informational.motherName,
    motherAge: String(screeningDetail.informational.motherAge),
    motherEducationalAttainment: screeningDetail.informational.motherEducationalAttainment,
    motherOccupation: screeningDetail.informational.motherOccupation,
    motherContact: screeningDetail.informational.motherContact,

    fatherName: screeningDetail.informational.fatherName,
    fatherAge: String(screeningDetail.informational.fatherAge),
    fatherEducationalAttainment: screeningDetail.informational.fatherEducationalAttainment,
    fatherOccupation: screeningDetail.informational.fatherOccupation,
    fatherContact: screeningDetail.informational.fatherContact,

    grossHouseholdIncome: Number(screeningDetail.informational.grossHouseholdIncome),
    parentMaritalStatus: screeningDetail.informational.parentsMaritalStatus,
    legalGuardianName: screeningDetail.informational.legalGuardianName,
    religion: screeningDetail.informational.religion,
    housingStatus: screeningDetail.informational.housingStatus as FormSchemaType["housingStatus"],

    // --- Passo 2: Programas Sociais ---
    ...screeningDetail.benefits,
    // --- Passo 3: Composição Familiar ---
    members: screeningDetail.familyMembers.map((member) => ({
      fullName: member.fullName,
      age: String(member.age),
      relationship: member.relationship,
      educationalAttainment: member.educationalAttainment,
      contact: member.contact ?? "",
    })),
    ...screeningDetail.psychosocialEvaluation,
  };

  return (
    <PsychosocialForm 
      initialData={initialData} 
      formId={id} 
      readOnly={false} 
    />
  );
}