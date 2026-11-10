'use client'
import { useFormContext } from "react-hook-form";
import { FormSchemaType } from "../schema";
import { Eye } from "lucide-react";

interface StepReviewProps {
  readOnly?: boolean;
}

export const StepReview = ({ readOnly = false }: StepReviewProps) => {
  const { getValues } = useFormContext<FormSchemaType>();

  const studentName = getValues("studentName");
  const legalGuardianName = getValues("legalGuardianName");
  const membersCount = getValues("members")?.length || 0;

  return (
    <div className="space-y-8 text-zinc-900 text-center py-10 px-5 sm:px-10 bg-white rounded-2xl border border-zinc-200 shadow-sm">
      {/* Ícone Adaptado: Olho para leitura ou Check para revisão de envio */}
      <div className={`w-16 h-16 border-2 rounded-full flex items-center justify-center mx-auto font-bold text-2xl shadow-sm ${
        readOnly 
          ? "border-blue-200 bg-blue-50 text-[#307FE2]" 
          : "border-emerald-200 bg-emerald-50 text-[#43B02A]"
      }`}>
        {readOnly ? <Eye className="w-8 h-8" /> : "✓"}
      </div>

      {/* Título e Subtítulo Dinâmicos */}
      <div className="space-y-2.5">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
          {readOnly ? "Resumo do Cadastro Visualizado" : "Tudo pronto para o envio"}
        </h2>
        <p className="text-base sm:text-lg text-zinc-600 max-w-xl mx-auto">
          {readOnly
            ? "Este é um registro consolidado no sistema. Confira abaixo as principais informações gerais do atendido."
            : "Todas as etapas foram preenchidas. Verifique o resumo abaixo antes de salvar o cadastro no sistema."}
        </p>
      </div>

      {/* Card de Resumo das Informações */}
      <div className="bg-zinc-50 p-6 sm:p-7 rounded-2xl border border-zinc-200 text-left max-w-xl mx-auto space-y-4 text-base sm:text-lg shadow-sm">
        <div className="flex justify-between items-center border-b border-zinc-200 pb-3">
          <span className="text-zinc-500 font-medium">Atendido:</span>
          <span className="font-bold text-zinc-900">{studentName || "Não informado"}</span>
        </div>
        <div className="flex justify-between items-center border-b border-zinc-200 pb-3">
          <span className="text-zinc-500 font-medium">Responsável:</span>
          <span className="font-bold text-zinc-900">{legalGuardianName || "Não informado"}</span>
        </div>
        <div className="flex justify-between items-center pt-1">
          <span className="text-zinc-500 font-medium">Membros da Família:</span>
          <span className="font-bold text-zinc-900">{membersCount} cadastrado(s)</span>
        </div>
      </div>

      <p className="text-sm sm:text-base text-zinc-500">
        {readOnly
          ? "Você pode navegar pelas etapas anteriores utilizando o botão Voltar para consultar os dados."
          : "Revise as informações se necessário utilizando o botão Voltar, ou finalize o processo."}
      </p>
    </div>
  );
};