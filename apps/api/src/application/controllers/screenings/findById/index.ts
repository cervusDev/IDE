import { IController, IControllerRequest, IControllerResponse } from "@shared/interfaces/IController";
import { FindScreeningByIdControllerParamsSchema, FindScreeningByIdControllerResponseSchema } from "./schemas";
import { EHttpCode } from "@infra/http/enums/HttpCode";
import { FindScreeningByIdUseCase } from "@application/useCases/screenings/findById";
import { IAbstractFactory } from "./IFactory";

export class FindScreeningByIdController implements IController {
  private readonly findScreeningByIdUseCase: FindScreeningByIdUseCase;
  constructor(factory: IAbstractFactory) {
    this.findScreeningByIdUseCase = factory.makeFindScreeningByIdUseCase();
  }
  public async execute(
    request: IControllerRequest<unknown, FindScreeningByIdControllerParamsSchema>
  ): Promise<IControllerResponse<FindScreeningByIdControllerResponseSchema>> {
    const useCase = await this.findScreeningByIdUseCase.execute({
      id: request.params.id
    })
    const response: IControllerResponse<FindScreeningByIdControllerResponseSchema> = {
      body: {
        birth_aid: useCase.benefits.birthAid,
        child_labor_eradication: useCase.benefits.childLaborEradication,
        continuous_cash_benefit: useCase.benefits.continuousCashBenefit,
        elderly_card: useCase.benefits.elderlyCard,
        emergency_aid: useCase.benefits.emergencyAid,
        state_income_aid: useCase.benefits.stateIncomeAid,
        family_grant: useCase.benefits.familyGrant,
        fee_exemption: useCase.benefits.feeExemption,
        free_transit: useCase.benefits.freeTransit,
        gas_aid: useCase.benefits.gasAid,
        green_grant: useCase.benefits.greenGrant,
        inclusion_aid: useCase.benefits.inclusionAid,
        menstrual_dignity_program: useCase.benefits.menstrualDignityProgram,
        milk_program: useCase.benefits.milkProgram,
        others: useCase.benefits.others,
        others_description: useCase.benefits.othersDescription,
        participates_in_paefi: useCase.benefits.participatesInPaefi,
        participates_in_paif: useCase.benefits.participatesInPaif,
        pe_de_meia: useCase.benefits.peDeMeia,
        social_energy_tariff: useCase.benefits.socialEnergyTariff,
        social_water_tariff: useCase.benefits.socialWaterTariff,
        social_housing: useCase.benefits.socialHousing,
        social_rent: useCase.benefits.socialRent,
        youth_id: useCase.benefits.youthId,

        family_members: useCase.familyMembers.map(item => ({
          age: item.age,
          full_name: item.fullName,
          relationship: item.relationship,
          contact: item.contact,
          educational_attainment: item.educationalAttainment
        })),

        mental_health_history: useCase.psychosocialEvaluation.mentalHealthHistory,
        pregnancy_and_birth: useCase.psychosocialEvaluation.pregnancyAndBirth,
        early_diet: useCase.psychosocialEvaluation.earlyDiet,
        current_diet: useCase.psychosocialEvaluation.currentDiet,
        sleep_routine: useCase.psychosocialEvaluation.sleepRoutine,
        psychomotor_development: useCase.psychosocialEvaluation.psychomotorDevelopment,
        speech_and_language: useCase.psychosocialEvaluation.speechAndLanguage,
        sphincter_control: useCase.psychosocialEvaluation.sphincterControl,
        childhood_diseases: useCase.psychosocialEvaluation.childhoodDiseases,
        medications: useCase.psychosocialEvaluation.medications,
        sexuality: useCase.psychosocialEvaluation.sexuality,
        schooling_history: useCase.psychosocialEvaluation.schoolingHistory,
        tics_and_habits: useCase.psychosocialEvaluation.ticsAndHabits,
        daily_routine: useCase.psychosocialEvaluation.dailyRoutine,
        participates_in_project: useCase.psychosocialEvaluation.participatesInProject,
        technology_access: useCase.psychosocialEvaluation.technologyAccess,
        substance_use: useCase.psychosocialEvaluation.substanceUse,
        family_dynamics: useCase.psychosocialEvaluation.familyDynamics,
        assistant_description: useCase.psychosocialEvaluation.assistantDescription,
        guardian_perception: useCase.psychosocialEvaluation.guardianPerception,
        interview_observations: useCase.psychosocialEvaluation.interviewObservations,

        health_unity: useCase.informational.healthUnity,
        registration: useCase.informational.registration,
        nis: useCase.informational.nis,
        student_name: useCase.informational.studentName,
        student_birth_date: useCase.informational.studentBirthDate,
        student_color: useCase.informational.studentColor,
        student_age: useCase.informational.studentAge,
        student_ra: useCase.informational.studentRa,
        student_educational_attainment: useCase.informational.studentEducationalAttainment,
        student_school_name: useCase.informational.studentSchoolName,
        student_school_period: useCase.informational.studentSchoolPeriod,
        student_gender: useCase.informational.studentGender,
        student_gender_other: useCase.informational.studentGenderOther,
        street_address: useCase.informational.streetAddress,
        neighborhood: useCase.informational.neighborhood,
        mother_name: useCase.informational.motherName,
        mother_age: useCase.informational.motherAge,
        mother_educational_attainment: useCase.informational.motherEducationalAttainment,
        mother_occupation: useCase.informational.motherOccupation,
        mother_contact: useCase.informational.motherContact,
        father_name: useCase.informational.motherName,
        father_age: useCase.informational.fatherAge,
        father_educational_attainment: useCase.informational.fatherEducationalAttainment,
        father_occupation: useCase.informational.fatherOccupation,
        father_contact: useCase.informational.fatherContact,
        gross_household_income: useCase.informational.grossHouseholdIncome,
        parents_marital_status: useCase.informational.parentsMaritalStatus,
        legal_guardian_name: useCase.informational.legalGuardianName,
        religion: useCase.informational.religion,
        housing_status: useCase.informational.housingStatus,
      },
      statusCode: EHttpCode.OK
    }
    return response;
  }
}