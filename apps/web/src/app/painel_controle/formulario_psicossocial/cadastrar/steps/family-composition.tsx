'use client'
import { useFormContext, useFieldArray } from "react-hook-form";
import { FormSchemaType } from "../schema";
import { Input } from "@/components/inputs/input";

interface StepFamilyCompositionProps {
  readOnly?: boolean;
}

export const StepFamilyComposition = ({ readOnly = false }: StepFamilyCompositionProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FormSchemaType>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  const handleAddMember = () => {
    if (readOnly) return;
    append({
      fullName: "",
      age: "",
      relationship: "",
      educationalAttainment: "",
      contact: "",
    });
  };

  return (
    <div className="space-y-8 text-zinc-900">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
            Passo 3: Composição Familiar
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 mt-1">
            {readOnly
              ? "Membros que compõem o núcleo familiar do atendido."
              : "Adicione os membros que compõem o núcleo familiar do atendido."}
          </p>
        </div>

        {/* Oculta o botão de adicionar no modo leitura */}
        {!readOnly && (
          <button
            type="button"
            onClick={handleAddMember}
            className="px-5 py-2.5 text-base sm:text-lg font-semibold text-white bg-[#D72685] rounded-xl hover:opacity-90 transition-opacity duration-200 flex items-center gap-2.5 shadow-sm cursor-pointer"
          >
            <span className="text-2xl leading-none font-bold">+</span>
            <span>Adicionar Familiar</span>
          </button>
        )}
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="bg-white p-5 sm:p-7 rounded-2xl border border-zinc-200 space-y-6 relative group transition shadow-sm"
          >
            {/* Header do Card */}
            <div className="flex justify-between items-center border-b border-zinc-100 pb-4">
              <span className="text-lg sm:text-xl font-bold text-zinc-800 tracking-wide">
                Familiar #{index + 1}
              </span>

              {/* Oculta o botão de remover no modo leitura */}
              {!readOnly && fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:text-red-700 text-base font-semibold transition px-3.5 py-1.5 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 cursor-pointer"
                >
                  Remover
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Nome Completo */}
              <div className="md:col-span-6">
                <Input
                  label="Nome Completo"
                  placeholder="Ex: Ana Souza"
                  className="bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400 text-base sm:text-lg py-3 focus:border-[#307FE2] focus:ring-[#307FE2]"
                  {...register(`members.${index}.fullName`)}
                />
              </div>

              {/* Idade */}
              <div className="md:col-span-2">
                <Input
                  label="Idade"
                  type="number"
                  placeholder="Ex: 40"
                  className="bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400 text-base sm:text-lg py-3 focus:border-[#307FE2] focus:ring-[#307FE2]"
                  {...register(`members.${index}.age`)}
                />
              </div>

              {/* Parentesco */}
              <div className="md:col-span-4">
                <Input
                  label="Parentesco"
                  placeholder="Ex: Mãe, Irmão, Avó..."
                  className="bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400 text-base sm:text-lg py-3 focus:border-[#307FE2] focus:ring-[#307FE2]"
                  {...register(`members.${index}.relationship`)}
                />
              </div>

              {/* Escolaridade */}
              <div className="md:col-span-6">
                <Input
                  label="Escolaridade (Opcional)"
                  placeholder="Ex: Ensino Superior Completo"
                  className="bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400 text-base sm:text-lg py-3 focus:border-[#307FE2] focus:ring-[#307FE2]"
                  {...register(`members.${index}.educationalAttainment`)}
                />
              </div>

              {/* Contato */}
              <div className="md:col-span-6">
                <Input
                  label="Contato / Telefone (Opcional)"
                  placeholder="(00) 00000-0000"
                  className="bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400 text-base sm:text-lg py-3 focus:border-[#307FE2] focus:ring-[#307FE2]"
                  {...register(`members.${index}.contact`)}
                />
              </div>
            </div>
          </div>
        ))}

        {fields.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-zinc-300 text-zinc-500 text-base sm:text-lg shadow-sm">
            {readOnly
              ? "Nenhum familiar cadastrado neste registro."
              : "Nenhum familiar adicionado. Clique no botão acima para começar."}
          </div>
        )}

        {errors.members?.root?.message && (
          <p className="text-base text-red-600 font-medium mt-3">{errors.members.root.message}</p>
        )}
      </div>
    </div>
  );
};