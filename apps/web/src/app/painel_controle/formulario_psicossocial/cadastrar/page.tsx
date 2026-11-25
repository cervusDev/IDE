'use client'
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { useCreateScreening, useUpdateScreening } from "@/hooks/useScreening";
import { useAuthStore } from "@/contexts/auth";
import { toast } from "sonner";

interface PsychosocialFormProps {
  initialData?: Partial<FormSchemaType>;
  formId?: string;
  readOnly?: boolean;
}

export const PsychosocialForm = ({ initialData, formId, readOnly = false }: PsychosocialFormProps) => {
  const router = useRouter();
  const { user } = useAuthStore();

  const { mutate: createScreening, isPending: isCreating } = useCreateScreening();
  const { mutate: updateScreening, isPending: isUpdating } = useUpdateScreening();

  const [currentStep, setCurrentStep] = useState(firstStepValue);
  const isEditing = Boolean(formId) && !readOnly;
  const isMutating = isCreating || isUpdating;

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

  const onSubmit = useCallback((data: FormSchemaType) => {
    if (readOnly) return;
    if (isEditing && formId) {
      updateScreening(
        {
          benefits: {
            birthAid: data.birthAid,
            childLaborEradication: data.childLaborEradication,
            continuousCashBenefit: data.continuousCashBenefit,
            elderlyCard: data.elderlyCard,
            emergencyAid: data.emergencyAid,
            familyGrant: data.familyGrant,
            feeExemption: data.feeExemption,
            freeTransit: data.freeTransit,
            gasAid: data.gasAid,
            greenGrant: data.greenGrant,
            inclusionAid: data.inclusionAid,
            menstrualDignityProgram: data.menstrualDignityProgram,
            milkProgram: data.milkProgram,
            others: data.others,
            othersDescription: data.othersDescription,
            participatesInPaefi: data.participatesInPaefi,
            participatesInPaif: data.participatesInPaif,
            peDeMeia: data.peDeMeia,
            socialEnergyTariff: data.socialEnergyTariff,
            socialHousing: data.socialHousing,
            socialRent: data.socialRent,
            socialWaterTariff: data.socialWaterTariff,
            stateIncomeAid: data.stateIncomeAid,
            youthId: data.youthId
          },
          familyMembers: data.members.map(item => ({
            age: Number(item.age),
            contact: item.contact,
            educationalAttainment: item.educationalAttainment,
            fullName: item.fullName,
            relationship: item.relationship
          })),
          informational: {
            assigneeId: String(user?.id),
            fatherAge: Number(data.fatherAge),
            fatherContact: data.fatherContact,
            fatherEducationalAttainment: data.fatherEducationalAttainment,
            fatherName: data.fatherName,
            fatherOccupation: data.fatherOccupation,
            grossHouseholdIncome: data.grossHouseholdIncome,
            healthUnity: data.healthUnity,
            housingStatus: data.housingStatus,
            legalGuardianName: data.legalGuardianName,
            motherAge: Number(data.motherAge),
            motherContact: data.motherContact,
            motherEducationalAttainment: data.motherEducationalAttainment,
            motherName: data.motherName,
            motherOccupation: data.motherOccupation,
            neighborhood: data.neighborhood,
            parentsMaritalStatus: data.parentMaritalStatus,
            registration: data.registration,
            religion: data.religion,
            streetAddress: data.streetAddress,
            studentAge: Number(data.studentAge),
            studentBirthDate: data.studentBirthDate,
            studentColor: data.studentColor,
            studentEducationalAttainment: data.studentEducationalAttainment,
            studentGender: data.studentGender,
            studentGenderOther: data.studentGenderOther,
            studentName: data.studentName,
            studentRa: data.studentRa,
            studentSchoolName: data.studentSchoolName,
            studentSchoolPeriod: data.studentSchoolPeriod,
            nis: data.nis
          },
          psychosocialEvaluation: {
            assistantDescription: data.assistantDescription,
            childhoodDiseases: data.childhoodDiseases,
            currentDiet: data.currentDiet,
            dailyRoutine: data.dailyRoutine,
            earlyDiet: data.earlyDiet,
            familyDynamics: data.familyDynamics,
            guardianPerception: data.guardianPerception,
            interviewObservations: data.interviewObservations,
            medications: data.medications,
            mentalHealthHistory: data.mentalHealthHistory,
            participatesInProject: data.participatesInProject,
            pregnancyAndBirth: data.pregnancyAndBirth,
            psychomotorDevelopment: data.psychomotorDevelopment,
            schoolingHistory: data.schoolingHistory,
            sexuality: data.sexuality,
            sleepRoutine: data.sleepRoutine,
            speechAndLanguage: data.speechAndLanguage,
            sphincterControl: data.sphincterControl,
            substanceUse: data.substanceUse,
            technologyAccess: data.technologyAccess,
            ticsAndHabits: data.ticsAndHabits,
          },
          registration: String(initialData?.registration),
          coAuthorId: String(user?.id),
        },
        {
          onSuccess: () => {
            toast.success('Triagem atualizada com sucesso!');
            router.push('/painel_controle/formulario_psicossocial/');
          },
          onError: () => {
            toast.error('Falha ao atualizar a triagem. Verifique os dados.');
          },
        }
      );
      return;
    }
    createScreening({
      benefits: {
        birthAid: data.birthAid,
        childLaborEradication: data.childLaborEradication,
        continuousCashBenefit: data.continuousCashBenefit,
        elderlyCard: data.elderlyCard,
        emergencyAid: data.emergencyAid,
        familyGrant: data.familyGrant,
        feeExemption: data.feeExemption,
        freeTransit: data.freeTransit,
        gasAid: data.gasAid,
        greenGrant: data.greenGrant,
        inclusionAid: data.inclusionAid,
        menstrualDignityProgram: data.menstrualDignityProgram,
        milkProgram: data.milkProgram,
        others: data.others,
        othersDescription: data.othersDescription,
        participatesInPaefi: data.participatesInPaefi,
        participatesInPaif: data.participatesInPaif,
        peDeMeia: data.peDeMeia,
        socialEnergyTariff: data.socialEnergyTariff,
        socialHousing: data.socialHousing,
        socialRent: data.socialRent,
        socialWaterTariff: data.socialWaterTariff,
        stateIncomeAid: data.stateIncomeAid,
        youthId: data.youthId
      },
      familyMembers: data.members.map(item => ({
        age: Number(item.age),
        contact: item.contact,
        educationalAttainment: item.educationalAttainment,
        fullName: item.fullName,
        relationship: item.relationship
      })),
      informational: {
        assigneeId: String(user?.id),
        fatherAge: Number(data.fatherAge),
        fatherContact: data.fatherContact,
        fatherEducationalAttainment: data.fatherEducationalAttainment,
        fatherName: data.fatherName,
        fatherOccupation: data.fatherOccupation,
        grossHouseholdIncome: data.grossHouseholdIncome,
        healthUnity: data.healthUnity,
        housingStatus: data.housingStatus,
        legalGuardianName: data.legalGuardianName,
        motherAge: Number(data.motherAge),
        motherContact: data.motherContact,
        motherEducationalAttainment: data.motherEducationalAttainment,
        motherName: data.motherName,
        motherOccupation: data.motherOccupation,
        neighborhood: data.neighborhood,
        parentsMaritalStatus: data.parentMaritalStatus,
        registration: data.registration,
        religion: data.religion,
        streetAddress: data.streetAddress,
        studentAge: Number(data.studentAge),
        studentBirthDate: data.studentBirthDate,
        studentColor: data.studentColor,
        studentEducationalAttainment: data.studentEducationalAttainment,
        studentGender: data.studentGender,
        studentGenderOther: data.studentGenderOther,
        studentName: data.studentName,
        studentRa: data.studentRa,
        studentSchoolName: data.studentSchoolName,
        studentSchoolPeriod: data.studentSchoolPeriod,
        nis: data.nis
      },
      psychosocialEvaluation: {
        assistantDescription: data.assistantDescription,
        childhoodDiseases: data.childhoodDiseases,
        currentDiet: data.currentDiet,
        dailyRoutine: data.dailyRoutine,
        earlyDiet: data.earlyDiet,
        familyDynamics: data.familyDynamics,
        guardianPerception: data.guardianPerception,
        interviewObservations: data.interviewObservations,
        medications: data.medications,
        mentalHealthHistory: data.mentalHealthHistory,
        participatesInProject: data.participatesInProject,
        pregnancyAndBirth: data.pregnancyAndBirth,
        psychomotorDevelopment: data.psychomotorDevelopment,
        schoolingHistory: data.schoolingHistory,
        sexuality: data.sexuality,
        sleepRoutine: data.sleepRoutine,
        speechAndLanguage: data.speechAndLanguage,
        sphincterControl: data.sphincterControl,
        substanceUse: data.substanceUse,
        technologyAccess: data.technologyAccess,
        ticsAndHabits: data.ticsAndHabits,
      },
    }, {
      onSuccess: () => {
        toast.success('Triagem criada com sucesso!');
        router.push('/painel_controle/formulario_psicossocial/');
      },
      onError: () => {
        toast.success('Falha ao salvar a triagem. Verifique os dados.');
      },
    });
  }, [readOnly, user?.id, isEditing, formId, createScreening, updateScreening, initialData?.registration, router]);


  const [readyStep, setReadyStep] = useState<number | null>(null);

  useEffect(() => {
    if (currentStep !== stepTitles.length) {
      return;
    }

    const timer = window.setTimeout(() => {
      setReadyStep(currentStep);
    }, 350);

    return () => window.clearTimeout(timer);
  }, [currentStep]);

  const isSubmitReady = currentStep === stepTitles.length && readyStep === currentStep;

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
          <span className="px-3 py-1 bg-[#43B02A] text-[#fff] text-xs font-semibold rounded-full border border-zinc-200">
            Modo Leitura
          </span>
        )}
      </div>

      <Stepper currentStep={currentStep} steps={stepTitles} />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
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
              className="px-6 py-2.5 bg-zinc-100 text-zinc-700 hover:bg-zinc-200 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed font-semibold transition-all cursor-pointer shadow-sm"
            >
              Voltar
            </button>

            <div className="flex items-center gap-3">
              {readOnly ? (
                <button
                  type="button"
                  disabled={isMutating}
                  onClick={() => router.push("/painel_controle/formulario_psicossocial/")}
                  className="px-6 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl font-semibold transition-all cursor-pointer"
                >
                  Voltar para a Listagem
                </button>
              ) : null}

              {currentStep < stepTitles.length && !isSubmitReady ? (
                <button
                  key="next-step-btn"
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-[#D72685] hover:opacity-80 text-white rounded-xl font-bold transition-opacity shadow-sm cursor-pointer"
                >
                  Próximo
                </button>
              ) : !readOnly ? (
                <button
                  key="submit-form-btn"
                  type="submit"
                  disabled={isSubmitting || isMutating || !isSubmitReady}
                  className="px-6 py-2.5 bg-[#43B02A] hover:opacity-80 text-white rounded-xl font-bold transition-opacity shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {(isSubmitting || isMutating)
                    ? "Salvando..."
                    : isEditing
                      ? "Salvar Alterações"
                      : "Finalizar & Enviar"}
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