'use client'
import { useEffect, useState } from "react";
import { StepReview } from "./steps/review";
import { Stepper } from "@/components/ui/stepper";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculateAge } from "@/helpers/calculateAge";
import { firstStepValue, stepTitles } from "./consts";
import { StepGeneralData } from "./steps/general-data";
import { StepSocialPrograms } from "./steps/social-programs";
import { StepFamilyComposition } from "./steps/family-composition";
import { fullFormSchema, stepSchemas, FormSchemaType } from "./schema";
import { useForm, FormProvider, Resolver, useWatch } from "react-hook-form";
import { StepPsychosocialEvaluation } from "./steps/psychosocial-evaluation";
import { useRouter } from "next/navigation";

interface PsychosocialFormProps {
  initialData?: Partial<FormSchemaType>;
  formId?: string;
  readOnly?: boolean; // <- Nova prop para modo visualização
}

export const PsychosocialForm = ({ initialData, formId, readOnly = false }: PsychosocialFormProps) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(firstStepValue);
  const isEditing = Boolean(formId) && !readOnly;

  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(fullFormSchema) as Resolver<FormSchemaType>,
    mode: "onTouched",
    defaultValues: initialData || {},
  });

  const { handleSubmit, trigger, control, setValue, reset, formState: { isSubmitting } } = methods;

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const birthDateValue = useWatch({ control, name: "studentBirthDate" });

  useEffect(() => {
    if (!readOnly) {
      const calculatedAge = calculateAge(birthDateValue);
      if (calculatedAge) {
        setValue("studentAge", calculatedAge, { shouldValidate: true, shouldDirty: true });
      }
    }
  }, [birthDateValue, setValue, readOnly]);

  const handleNext = async () => {
    if (readOnly) {
      // No modo leitura, avança livremente sem validar campos obrigatórios
      setCurrentStep((prev) => Math.min(prev + 1, stepTitles.length));
      return;
    }

    const currentStepSchema = stepSchemas[currentStep - 1];
    const fieldsToValidate = Object.keys(currentStepSchema.shape) as (keyof FormSchemaType)[];
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, stepTitles.length));
    }
  };

  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const onSubmit = async (data: FormSchemaType) => {
    if (readOnly) return;

    try {
      const endpoint = isEditing
        ? `https://api.sua-aplicacao.com/endpoint/${formId}`
        : "https://api.sua-aplicacao.com/endpoint";

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert(isEditing ? "Atualizado com sucesso!" : "Criado com sucesso!");
        router.push("/painel_controle/formulario_psicossocial/list");
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 sm:p-8 bg-white rounded-2xl border border-zinc-200 shadow-sm my-6 text-zinc-900">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-100">
        <h2 className="text-2xl font-bold text-zinc-900">
          {readOnly
            ? "Visualizar Cadastro Psicossocial"
            : isEditing
              ? "Editar Cadastro Psicossocial"
              : "Novo Cadastro Psicossocial"}
        </h2>
        {readOnly && (
          <span className="px-3 py-1 bg-zinc-100 text-zinc-600 text-xs font-semibold rounded-full border border-zinc-200">
            Modo Leitura
          </span>
        )}
      </div>

      <Stepper currentStep={currentStep} steps={stepTitles} />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
          {/* O fieldset disabled bloqueia interações em todos os inputs filhos no modo leitura */}
          <fieldset disabled={readOnly} className="space-y-6">
            {currentStep === 1 && <StepGeneralData />}
            {currentStep === 2 && <StepSocialPrograms />}
            {currentStep === 3 && <StepFamilyComposition readOnly={readOnly} />}
            {currentStep === 4 && <StepPsychosocialEvaluation />}
            {currentStep === 5 && <StepReview readOnly={readOnly} />}
          </fieldset>

          <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 pt-6 border-t border-zinc-200">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="px-6 py-2.5 bg-[#F2CD00] text-zinc-900 rounded-xl disabled:opacity-40 hover:opacity-85 font-semibold transition-opacity cursor-pointer shadow-sm"
            >
              Voltar
            </button>

            <div className="flex items-center gap-3">
              {readOnly ? (
                <button
                  type="button"
                  onClick={() => router.push("/painel_controle/formulario_psicossocial/")}
                  className="px-6 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl font-semibold transition-all cursor-pointer"
                >
                  Voltar para a Listagem
                </button>
              ) : null}

              {currentStep < stepTitles.length ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-[#D72685] hover:opacity-80 text-white rounded-xl font-bold transition-opacity shadow-sm cursor-pointer"
                >
                  Próximo
                </button>
              ) : !readOnly ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#43B02A] hover:opacity-80 text-white rounded-xl font-bold transition-opacity shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "Salvando..." : isEditing ? "Salvar Alterações" : "Finalizar & Enviar"}
                </button>
              ) : null}
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default PsychosocialForm;