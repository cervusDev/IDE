'use client'
import { useFormContext } from "react-hook-form";
import { FormSchemaType } from "../schema";
import { Input } from "@/components/inputs/input";
import { Select } from "@/components/inputs/select";

export const StepGeneralData = () => {
  const {
    register,
    watch,
  } = useFormContext<FormSchemaType>();

  const studentGenderValue = watch("studentGender");

  return (
    <div className="space-y-8 text-zinc-900">
      {/* Cabeçalho */}
      <div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
          Passo 1: Identificação e Dados Gerais
        </h2>
        <p className="text-base sm:text-lg text-zinc-600 mt-1">
          Preencha as informações do atendido e do núcleo familiar.
        </p>
      </div>

      {/* SEÇÃO 1: Dados de Registro e Saúde */}
      <details className="bg-white rounded-2xl border border-zinc-200 shadow-sm group" open={false}>
        <summary className="p-5 sm:p-7 flex justify-between items-center cursor-pointer select-none text-lg sm:text-xl font-bold text-zinc-800 hover:text-zinc-950 transition">
          <span>Dados de Registro e Saúde</span>
          <span className="transform group-open:rotate-180 transition-transform duration-200 text-sm font-normal text-zinc-400">
            ▼
          </span>
        </summary>
        <div className="px-5 sm:px-7 pb-6 pt-2 border-t border-zinc-100 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-7">
              <Input
                label="Unidade de Saúde"
                placeholder="Ex: UBS Central"
                {...register("healthUnity")}
              />
              {/* <CommentEditor
                externalLogsIsOpen={false}
                // initialContent={
                //   (useDraftStore
                //     .getState()
                //     .get(`${location.pathname}:comment`)?.content as
                //     | string
                //     | undefined) ?? ''
                // }
                // isDisabled={!!ticket?.closingDate}
                onSubmit={() => { }}
                isDisabled={false}
              // onUpdate={handleUpdateCommentDraft}
              /> */}
            </div>
            <div className="md:col-span-5">
              <Input
                label="Matrícula"
                placeholder="Nº de matrícula"
                {...register("registration")}
              />
            </div>
          </div>
        </div>
      </details>

      {/* SEÇÃO 2: Informações do Atendido */}
      <details className="bg-white rounded-2xl border border-zinc-200 shadow-sm group" open={false}>
        <summary className="p-5 sm:p-7 flex justify-between items-center cursor-pointer select-none text-lg sm:text-xl font-bold text-zinc-800 hover:text-zinc-950 transition">
          <span>Informações do Atendido</span>
          <span className="transform group-open:rotate-180 transition-transform duration-200 text-sm font-normal text-zinc-400">
            ▼
          </span>
        </summary>
        <div className="px-5 sm:px-7 pb-6 pt-2 border-t border-zinc-100 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-6">
              <Input
                label="Nome Completo do atendido"
                placeholder="Ex: João da Silva"
                {...register("studentName")}
              />
            </div>
            <div className="md:col-span-3">
              <Input
                label="Data de Nascimento"
                placeholder="DD/MM/AAAA"
                {...register("studentBirthDate")}
              />
            </div>
            <div className="md:col-span-3">
              <Input
                label="Idade"
                type="number"
                placeholder="Ex: 10"
                {...register("studentAge")}
              />
            </div>

            <div className="md:col-span-4">
              <Input
                label="Cor / Raça"
                placeholder="Ex: Parda, Branca..."
                {...register("studentColor")}
              />
            </div>
            <div className="md:col-span-4">
              <Input
                label="RA (Registro atendido)"
                placeholder="Nº do RA"
                {...register("studentRa")}
              />
            </div>
            <div className="md:col-span-4">
              <Input
                label="Escolaridade"
                placeholder="Ex: 5º Ano EF"
                {...register("studentEducationalAttainment")}
              />
            </div>

            <div className="md:col-span-8">
              <Input
                label="Nome da Escola"
                placeholder="Ex: E.E. Professor João"
                {...register("studentSchoolName")}
              />
            </div>
            <div className="md:col-span-4">
              <Input
                label="Período Escolar"
                placeholder="Ex: Manhã / Tarde"
                {...register("studentSchoolPeriod")}
              />
            </div>

            <div className="md:col-span-4">
              <Select
                label="Gênero"
                name="studentGender"
                options={[
                  { label: "Masculino", value: "M" },
                  { label: "Feminino", value: "F" },
                  { label: "Outro", value: "O" },
                ]}
              />
            </div>

            {studentGenderValue === "O" && (
              <div className="md:col-span-4">
                <Input
                  label="Especifique o Gênero"
                  placeholder="Informe..."
                  className="bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400 text-base sm:text-lg py-3 focus:border-[#307FE2] focus:ring-[#307FE2]"
                  {...register("studentGenderOther")}
                />
              </div>
            )}
          </div>
        </div>
      </details>

      {/* SEÇÃO 3: Endereço */}
      <details className="bg-white rounded-2xl border border-zinc-200 shadow-sm group" open={false}>
        <summary className="p-5 sm:p-7 flex justify-between items-center cursor-pointer select-none text-lg sm:text-xl font-bold text-zinc-800 hover:text-zinc-950 transition">
          <span>Endereço Familiar</span>
          <span className="transform group-open:rotate-180 transition-transform duration-200 text-sm font-normal text-zinc-400">
            ▼
          </span>
        </summary>
        <div className="px-5 sm:px-7 pb-6 pt-2 border-t border-zinc-100 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-8">
              <Input
                label="Endereço (Rua, Nº, Compl.)"
                placeholder="Ex: Rua das Flores, 123"
                {...register("streetAddress")}
              />
            </div>
            <div className="md:col-span-4">
              <Input
                label="Bairro"
                placeholder="Ex: Centro"
                {...register("neighborhood")}
              />
            </div>
          </div>
        </div>
      </details>

      {/* SEÇÃO 4: Filiação (Mãe e Pai) */}
      <details className="bg-white rounded-2xl border border-zinc-200 shadow-sm group" open={false}>
        <summary className="p-5 sm:p-7 flex justify-between items-center cursor-pointer select-none text-lg sm:text-xl font-bold text-zinc-800 hover:text-zinc-950 transition">
          <span>Filiação (Opcional)</span>
          <span className="transform group-open:rotate-180 transition-transform duration-200 text-sm font-normal text-zinc-400">
            ▼
          </span>
        </summary>
        <div className="px-5 sm:px-7 pb-6 pt-2 border-t border-zinc-100 space-y-5">
          {/* Dados da Mãe */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-zinc-50 p-5 rounded-xl border border-zinc-200">
            <div className="md:col-span-12 font-bold text-zinc-800 text-base sm:text-lg">
              Dados da Mãe
            </div>
            <div className="md:col-span-6">
              <Input
                label="Nome da Mãe"
                placeholder="Nome completo"
                {...register("motherName")}
              />
            </div>
            <div className="md:col-span-2">
              <Input
                label="Idade"
                type="number"
                placeholder="Ex: 35"
                {...register("motherAge")}
              />
            </div>
            <div className="md:col-span-4">
              <Input
                label="Contato da Mãe"
                placeholder="(00) 00000-0000"
                {...register("motherContact")}
              />
            </div>
            <div className="md:col-span-6">
              <Input
                label="Escolaridade da Mãe"
                placeholder="Ex: Ensino Médio Completo"
                {...register("motherEducationalAttainment")}
              />
            </div>
            <div className="md:col-span-6">
              <Input
                label="Ocupação da Mãe"
                placeholder="Ex: Autônoma"
                {...register("motherOccupation")}
              />
            </div>
          </div>

          {/* Dados do Pai */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-zinc-50 p-5 rounded-xl border border-zinc-200">
            <div className="md:col-span-12 font-bold text-zinc-800 text-base sm:text-lg">
              Dados do Pai
            </div>
            <div className="md:col-span-6">
              <Input
                label="Nome do Pai"
                placeholder="Nome completo"
                {...register("fatherName")}
              />
            </div>
            <div className="md:col-span-2">
              <Input
                label="Idade"
                type="number"
                placeholder="Ex: 38"
                {...register("fatherAge")}
              />
            </div>
            <div className="md:col-span-4">
              <Input
                label="Contato do Pai"
                placeholder="(00) 00000-0000"
                {...register("fatherContact")}
              />
            </div>
            <div className="md:col-span-6">
              <Input
                label="Escolaridade do Pai"
                placeholder="Ex: Ensino Fundamental"
                {...register("fatherEducationalAttainment")}
              />
            </div>
            <div className="md:col-span-6">
              <Input
                label="Ocupação do Pai"
                placeholder="Ex: Mecânico"
                {...register("fatherOccupation")}
              />
            </div>
          </div>
        </div>
      </details>

      {/* SEÇÃO 5: Informações Socioeconômicas e Responsável Legal */}
      <details className="bg-white rounded-2xl border border-zinc-200 shadow-sm group" open={false}>
        <summary className="p-5 sm:p-7 flex justify-between items-center cursor-pointer select-none text-lg sm:text-xl font-bold text-zinc-800 hover:text-zinc-950 transition">
          <span>Condições Socioeconômicas e Guarda</span>
          <span className="transform group-open:rotate-180 transition-transform duration-200 text-sm font-normal text-zinc-400">
            ▼
          </span>
        </summary>
        <div className="px-5 sm:px-7 pb-6 pt-2 border-t border-zinc-100 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-6">
              <Input
                label="Nome do Responsável Legal"
                placeholder="Ex: Maria da Silva"
                {...register("legalGuardianName")}
              />
            </div>
            <div className="md:col-span-6">
              <Input
                label="Estado Civil dos Pais/Responsáveis"
                placeholder="Ex: Casados, Divorciados..."
                {...register("parentMaritalStatus")}
              />
            </div>
            <div className="md:col-span-4">
              <Input
                label="Renda Bruta Familiar (R$)"
                type="number"
                step="0.01"
                placeholder="Ex: 2500.00"
                {...register("grossHouseholdIncome")}
              />
            </div>
            <div className="md:col-span-4">
              <Input
                label="Religião"
                placeholder="Ex: Católica, Evangélica..."
                {...register("religion")}
              />
            </div>
            <div className="md:col-span-4">
              <Select
                label="Situação da Moradia"
                name="housingStatus"
                options={[
                  { label: "Própria", value: "PRÓPRIO" },
                  { label: "Alugada", value: "ALUGADO" },
                  { label: "Cedida", value: "CEDIDO" },
                ]}
              />
            </div>
          </div>
        </div>
      </details>
    </div>
  );
};