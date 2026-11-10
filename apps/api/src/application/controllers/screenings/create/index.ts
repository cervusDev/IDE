import {
  IController,
  IControllerRequest,
  IControllerResponse,
} from '@shared/interfaces/IController';
import { ICreateScreeningControllerFactory } from './IFactory';
import { CreateScreeningControllerBody } from './schemas';
import { EHttpCode } from '@infra/http/enums/HttpCode';
import { CreateScreeningUseCase } from '@application/useCases/screenings/create';

export class CreateScreeningController implements IController {
  private readonly createScreeningUseCase: CreateScreeningUseCase;

  constructor(factory: ICreateScreeningControllerFactory) {
    this.createScreeningUseCase = factory.makeCreateScreeningUseCase();
  }

  public async execute(
    request: IControllerRequest<CreateScreeningControllerBody>,
  ): Promise<IControllerResponse> {
    const { body } = request;

    await this.createScreeningUseCase.execute({
      benefits: {
        birthAid: body.birth_aid,
        childLaborEradication: body.child_labor_eradication,
        continuousCashBenefit: body.continuous_cash_benefit,
        elderlyCard: body.elderly_card,
        emergencyAid: body.emergency_aid,
        familyGrant: body.family_grant,
        feeExemption: body.fee_exemption,
        freeTransit: body.free_transit,
        gasAid: body.gas_aid,
        greenGrant: body.green_grant,
        inclusionAid: body.inclusion_aid,
        menstrualDignityProgram: body.menstrual_dignity_program,
        milkProgram: body.milk_program,
        others: body.others,
        othersDescription: body.others_description,
        participatesInPaefi: body.participates_in_paefi,
        participatesInPaif: body.participates_in_paif,
        peDeMeia: body.pe_de_meia,
        socialEnergyTariff: body.social_energy_tariff,
        socialWaterTariff: body.social_water_tariff,
        socialHousing: body.social_housing,
        socialRent: body.social_rent,
        youthId: body.youth_id,
      },
      familyMembers: body.family_members.map((member) => ({
        fullName: member.full_name,
        age: Number(member.age),
        relationship: member.relationship,
        educationalAttainment: member.educational_attainment || null,
        contact: member.contact || null,
      })),
      psychosocialEvaluation: {
        mentalHealthHistory: body.mental_health_history,
        pregnancyAndBirth: body.pregnancy_and_birth,
        earlyDiet: body.early_diet,
        currentDiet: body.current_diet,
        sleepRoutine: body.sleep_routine,
        psychomotorDevelopment: body.psychomotor_development,
        speechAndLanguage: body.speech_and_language,
        sphincterControl: body.sphincter_control,
        childhoodDiseases: body.childhood_diseases,
        medications: body.medications,
        sexuality: body.sexuality,
        schoolingHistory: body.schooling_history,
        ticsAndHabits: body.tics_and_habits,
        dailyRoutine: body.daily_routine,
        participatesInProject: body.participates_in_project,
        technologyAccess: body.technology_access,
        substanceUse: body.substance_use,
        familyDynamics: body.family_dynamics,
        assistantDescription: body.assistant_description,
        guardianPerception: body.guardian_perception,
        interviewObservations: body.interview_observations,
      },
      informational: {
        healthUnity: body.health_unity,
        registration: body.registration,
        nis: body.nis,
        studentName: body.student_name,
        studentBirthDate: body.student_birth_date,
        studentColor: body.student_color,
        studentAge: Number(body.student_age),
        studentRa: body.student_ra,
        studentEducationalAttainment: body.student_educational_attainment,
        studentSchoolName: body.student_school_name,
        studentSchoolPeriod: body.student_school_period,
        studentGender: body.student_gender,
        studentGenderOther: body.student_gender_other || null,
        streetAddress: body.street_address,
        neighborhood: body.neighborhood,
        motherName: body.mother_name || null,
        motherAge: body.mother_age ? Number(body.mother_age) : null,
        motherEducationalAttainment: body.mother_educational_attainment || null,
        motherOccupation: body.mother_occupation || null,
        motherContact: body.mother_contact || null,
        fatherName: body.father_name || null,
        fatherAge: body.father_age ? Number(body.father_age) : null,
        fatherEducationalAttainment: body.father_educational_attainment || null,
        fatherOccupation: body.father_occupation || null,
        fatherContact: body.father_contact || null,
        grossHouseholdIncome: body.gross_household_income.toString(),
        parentsMaritalStatus: body.parents_marital_status,
        legalGuardianName: body.legal_guardian_name,
        religion: body.religion,
        housingStatus: body.housing_status,
      },
    });
    const response: IControllerResponse = {
      body: null,
      statusCode: EHttpCode.OK,
    };
    
    return response;
  }
}