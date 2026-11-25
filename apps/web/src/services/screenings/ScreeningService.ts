import { EHttpCodes } from "@/enums/http";
import apiClient from "../config/axios";
import { 
  ICountResponseBody, 
  ICreateRequestBody, 
  IFindByIdResponseBody, 
  IListParams, 
  IListResponseBody, 
  IListVersionsParams, 
  IListVersionsResponseBody 
} from "./interfaces";
import { IService } from "./IService";
import { IListScreeningInputData } from "./list/InputData";
import { IListScreeningOutputData } from "./list/OutputData";
import { ICreateScreeningServiceInputData } from "./create/InputData";
import { IListScreningVersionsInputData } from "./listVersions/InputData";
import { IListScreeningVersionsOutputData } from "./listVersions/OutputData";
import { IFindScreeningByIdInputData } from "./findById/InputData";
import { IFindScreeningByIdOutputData } from "./findById/OutputData";
import { IDeleteScreeningInputData } from "./delete/InputData";
import { IUpdateScreeningInputData } from "./update/InputData";
import { ICountSCreeningOutputData } from "./count/OutputData";

class ScreeningService implements IService {
  public async count(): Promise<ICountSCreeningOutputData> {
    const { data } = await apiClient.get<ICountResponseBody>("/screenings/count")
    const output: ICountSCreeningOutputData = {
      count: data.count
    }
    return output;
  }
  public async updateAllStudentsAges(): Promise<void> {
    await apiClient.post('/screenings/update-all-ages')
  }
  public async update(inputData: IUpdateScreeningInputData): Promise<void> {
    const body: Omit<Partial<ICreateRequestBody>, 'assignee_id'> & { co_author_id: string } = {
      co_author_id: inputData.coAuthorId,
      birth_aid: inputData.benefits?.birthAid,
      child_labor_eradication: inputData.benefits?.childLaborEradication,
      continuous_cash_benefit: inputData.benefits?.continuousCashBenefit,
      elderly_card: inputData.benefits?.elderlyCard,
      emergency_aid: inputData.benefits?.emergencyAid,
      family_grant: inputData.benefits?.familyGrant,
      fee_exemption: inputData.benefits?.feeExemption,
      free_transit: inputData.benefits?.freeTransit,
      gas_aid: inputData.benefits?.gasAid,
      green_grant: inputData.benefits?.greenGrant,
      inclusion_aid: inputData.benefits?.inclusionAid,
      menstrual_dignity_program: inputData.benefits?.menstrualDignityProgram,
      milk_program: inputData.benefits?.milkProgram,
      others: inputData.benefits?.others,
      others_description: inputData.benefits?.othersDescription,
      participates_in_paefi: inputData.benefits?.participatesInPaefi,
      participates_in_paif: inputData.benefits?.participatesInPaif,
      pe_de_meia: inputData.benefits?.peDeMeia,
      social_energy_tariff: inputData.benefits?.socialEnergyTariff,
      social_housing: inputData.benefits?.socialHousing,
      social_rent: inputData.benefits?.socialRent,
      social_water_tariff: inputData.benefits?.socialWaterTariff,
      state_income_aid: inputData.benefits?.stateIncomeAid,
      youth_id: inputData.benefits?.youthId,
      family_members: inputData.familyMembers?.map(item => ({
        age: item.age,
        contact: item.contact,
        educational_attainment: item.educationalAttainment,
        full_name: item.fullName,
        relationship: item.relationship
      })),
      father_age: inputData.informational?.fatherAge,
      father_contact: inputData.informational?.fatherContact,
      father_educational_attainment: inputData.informational?.fatherEducationalAttainment,
      father_name: inputData.informational?.fatherName,
      father_occupation: inputData.informational?.fatherOccupation,
      gross_household_income: inputData.informational?.grossHouseholdIncome,
      health_unity: inputData.informational?.healthUnity,
      housing_status: inputData.informational?.housingStatus,
      legal_guardian_name: inputData.informational?.legalGuardianName,
      mother_age: inputData.informational?.motherAge,
      mother_contact: inputData.informational?.motherContact,
      mother_educational_attainment: inputData.informational?.motherEducationalAttainment,
      mother_name: inputData.informational?.motherName,
      mother_occupation: inputData.informational?.motherOccupation,
      neighborhood: inputData.informational?.neighborhood,
      parents_marital_status: inputData.informational?.parentsMaritalStatus,
      registration: inputData.informational?.registration,
      religion: inputData.informational?.religion,
      street_address: inputData.informational?.streetAddress,
      student_age: inputData.informational?.studentAge,
      student_birth_date: inputData.informational?.studentBirthDate,
      student_color: inputData.informational?.studentColor,
      student_educational_attainment: inputData.informational?.studentEducationalAttainment,
      student_gender: inputData.informational?.studentGender,
      student_gender_other: inputData.informational?.studentGenderOther,
      student_name: inputData.informational?.studentName,
      student_ra: inputData.informational?.studentRa,
      student_school_name: inputData.informational?.studentSchoolName,
      student_school_period: inputData.informational?.studentSchoolPeriod,
      nis: inputData.informational?.nis,
      assistant_description: inputData.psychosocialEvaluation?.assistantDescription,
      childhood_diseases: inputData.psychosocialEvaluation?.childhoodDiseases,
      current_diet: inputData.psychosocialEvaluation?.currentDiet,
      daily_routine: inputData.psychosocialEvaluation?.dailyRoutine,
      early_diet: inputData.psychosocialEvaluation?.earlyDiet,
      family_dynamics: inputData.psychosocialEvaluation?.familyDynamics,
      guardian_perception: inputData.psychosocialEvaluation?.guardianPerception,
      interview_observations: inputData.psychosocialEvaluation?.interviewObservations,
      medications: inputData.psychosocialEvaluation?.medications,
      mental_health_history: inputData.psychosocialEvaluation?.mentalHealthHistory,
      participates_in_project: inputData.psychosocialEvaluation?.participatesInProject,
      pregnancy_and_birth: inputData.psychosocialEvaluation?.pregnancyAndBirth,
      psychomotor_development: inputData.psychosocialEvaluation?.psychomotorDevelopment,
      schooling_history: inputData.psychosocialEvaluation?.schoolingHistory,
      sexuality: inputData.psychosocialEvaluation?.sexuality,
      sleep_routine: inputData.psychosocialEvaluation?.sleepRoutine,
      speech_and_language: inputData.psychosocialEvaluation?.speechAndLanguage,
      sphincter_control: inputData.psychosocialEvaluation?.sphincterControl,
      substance_use: inputData.psychosocialEvaluation?.substanceUse,
      technology_access: inputData.psychosocialEvaluation?.technologyAccess,
      tics_and_habits: inputData.psychosocialEvaluation?.ticsAndHabits
    }
    await apiClient.put(`/screenings/${inputData.registration}`, body);
  }
  public async delete(inputData: IDeleteScreeningInputData): Promise<void> {
    await apiClient.delete(`/screenings/${inputData.registration}`);
  }
  public async findById(inputData: IFindScreeningByIdInputData): Promise<IFindScreeningByIdOutputData> {
    const { data } = await apiClient.get<IFindByIdResponseBody>(`/screenings/${inputData.id}`)
    const output: IFindScreeningByIdOutputData = {
      benefits: {
        birthAid: data.birth_aid,
        childLaborEradication: data.child_labor_eradication,
        continuousCashBenefit: data.continuous_cash_benefit,
        elderlyCard: data.elderly_card,
        emergencyAid: data.emergency_aid,
        familyGrant: data.family_grant,
        feeExemption: data.fee_exemption,
        freeTransit: data.free_transit,
        gasAid: data.gas_aid,
        greenGrant: data.green_grant,
        inclusionAid: data.inclusion_aid,
        menstrualDignityProgram: data.menstrual_dignity_program,
        milkProgram: data.milk_program,
        others: data.others,
        othersDescription: data.others_description,
        participatesInPaefi: data.participates_in_paefi,
        participatesInPaif: data.participates_in_paefi,
        peDeMeia: data.pe_de_meia,
        socialEnergyTariff: data.social_energy_tariff,
        socialHousing: data.social_housing,
        socialRent: data.social_rent,
        socialWaterTariff: data.social_water_tariff,
        stateIncomeAid: data.state_income_aid,
        youthId: data.youth_id
      },
      familyMembers: data.family_members.map(item => ({
        age: item.age,
        contact: item.contact,
        educationalAttainment: item.educational_attainment,
        fullName: item.full_name,
        relationship: item.relationship,
      })),
      informational: {
        fatherAge: data.father_age,
        fatherEducationalAttainment: data.father_educational_attainment,
        grossHouseholdIncome: data.gross_household_income,
        healthUnity: data.health_unity,
        housingStatus: data.housing_status,
        legalGuardianName: data.legal_guardian_name,
        motherAge: data.mother_age,
        motherContact: data.mother_contact,
        motherEducationalAttainment: data.mother_educational_attainment,
        neighborhood: data.neighborhood,
        parentsMaritalStatus: data.parents_marital_status,
        registration: data.registration,
        religion: data.religion,
        streetAddress: data.street_address,
        studentAge: data.student_age,
        studentBirthDate: data.student_birth_date,
        studentColor: data.student_color,
        studentEducationalAttainment: data.student_educational_attainment,
        studentGender: data.student_gender,
        studentName: data.student_name,
        studentRa: data.student_ra,
        studentSchoolName: data.student_school_name,
        studentSchoolPeriod: data.student_school_period,
        fatherContact: data.father_contact,
        fatherName: data.father_name,
        fatherOccupation: data.father_occupation,
        motherName: data.mother_name,
        motherOccupation: data.mother_occupation,
        nis: data.nis,
        studentGenderOther: data.student_gender_other,
      },
      psychosocialEvaluation: {
        assistantDescription: data.assistant_description,
        childhoodDiseases: data.childhood_diseases,
        currentDiet: data.current_diet,
        dailyRoutine: data.daily_routine,
        earlyDiet: data.early_diet,
        familyDynamics: data.family_dynamics,
        guardianPerception: data.guardian_perception,
        interviewObservations: data.interview_observations,
        medications: data.medications,
        mentalHealthHistory: data.mental_health_history,
        participatesInProject: data.participates_in_project,
        pregnancyAndBirth: data.pregnancy_and_birth,
        psychomotorDevelopment: data.psychomotor_development,
        schoolingHistory: data.schooling_history,
        sexuality: data.sexuality,
        sleepRoutine: data.sleep_routine,
        speechAndLanguage: data.speech_and_language,
        sphincterControl: data.sphincter_control,
        substanceUse: data.substance_use,
        technologyAccess: data.technology_access,
        ticsAndHabits: data.tics_and_habits
      }
    }
    return output;
  }
  public async listVersions(inputData: IListScreningVersionsInputData): Promise<IListScreeningVersionsOutputData> {
    const params: IListVersionsParams = {
      registration: inputData.registration
    }
    const { data, status } = await apiClient.get<IListVersionsResponseBody>(`/screenings-versions`, { params });
    if (EHttpCodes.NoContent === status) {
      const output: IListScreeningVersionsOutputData = {
        list: []
      }
      return output;
    } 
    const output: IListScreeningVersionsOutputData = {
      list: data.list.map(item => ({
        id: item.id,
        isLatest: item.is_latest,
        version: item.version
      }))
    }
    return output;
  }
  public async list(inputData: IListScreeningInputData): Promise<IListScreeningOutputData> {
    const params: IListParams = {
      health_unity: inputData.healthUnity,
      limit: inputData.limit,
      nis: inputData.nis,
      page: inputData.page,
      ra: inputData.studentRa,
      registration: inputData.registration,
      student_age: inputData.studentAge,
      student_name: inputData.studentName
    };
    const { data, status } = await apiClient.get<IListResponseBody>("/screenings", { params });
    if (EHttpCodes.NoContent === status) {
      const output: IListScreeningOutputData = {
        list: [],
        pagination: {
          limit: 0,
          page: 1,
          total: 0
        }
      }
      return output;
    }
    const output: IListScreeningOutputData = {
      list: data.list.map(item => ({
        healthUnity: item.health_unity,
        legalGuardianName: item.legal_guardian_name,
        nis: item.nis,
        registration: item.registration,
        studentAge: item.student_age,
        studentName: item.student_name,
        id: item.id,
        studentRa: item.student_ra
      })),
      pagination: {
        limit: data.pagination.limit,
        page: data.pagination.page,
        total: data.pagination.total
      }
    }
    return output;
  }
  public async create(inputData: ICreateScreeningServiceInputData): Promise<void> {
    const body: ICreateRequestBody = {
      birth_aid: inputData.benefits.birthAid,
      child_labor_eradication: inputData.benefits.childLaborEradication,
      continuous_cash_benefit: inputData.benefits.continuousCashBenefit,
      elderly_card: inputData.benefits.elderlyCard,
      emergency_aid: inputData.benefits.emergencyAid,
      family_grant: inputData.benefits.familyGrant,
      fee_exemption: inputData.benefits.feeExemption,
      free_transit: inputData.benefits.freeTransit,
      gas_aid: inputData.benefits.gasAid,
      green_grant: inputData.benefits.greenGrant,
      inclusion_aid: inputData.benefits.inclusionAid,
      menstrual_dignity_program: inputData.benefits.menstrualDignityProgram,
      milk_program: inputData.benefits.milkProgram,
      others: inputData.benefits.others,
      others_description: inputData.benefits.othersDescription,
      participates_in_paefi: inputData.benefits.participatesInPaefi,
      participates_in_paif: inputData.benefits.participatesInPaif,
      pe_de_meia: inputData.benefits.peDeMeia,
      social_energy_tariff: inputData.benefits.socialEnergyTariff,
      social_housing: inputData.benefits.socialHousing,
      social_rent: inputData.benefits.socialRent,
      social_water_tariff: inputData.benefits.socialWaterTariff,
      state_income_aid: inputData.benefits.stateIncomeAid,
      youth_id: inputData.benefits.youthId,
      family_members: inputData.familyMembers.map(item => ({
        age: item.age,
        contact: item.contact,
        educational_attainment: item.educationalAttainment,
        full_name: item.fullName,
        relationship: item.relationship
      })),
      assignee_id: inputData.informational.assigneeId,
      father_age: inputData.informational.fatherAge,
      father_contact: inputData.informational.fatherContact,
      father_educational_attainment: inputData.informational.fatherEducationalAttainment,
      father_name: inputData.informational.fatherName,
      father_occupation: inputData.informational.fatherOccupation,
      gross_household_income: inputData.informational.grossHouseholdIncome,
      health_unity: inputData.informational.healthUnity,
      housing_status: inputData.informational.housingStatus,
      legal_guardian_name: inputData.informational.legalGuardianName,
      mother_age: inputData.informational.motherAge,
      mother_contact: inputData.informational.motherContact,
      mother_educational_attainment: inputData.informational.motherEducationalAttainment,
      mother_name: inputData.informational.motherName,
      mother_occupation: inputData.informational.motherOccupation,
      neighborhood: inputData.informational.neighborhood,
      parents_marital_status: inputData.informational.parentsMaritalStatus,
      registration: inputData.informational.registration,
      religion: inputData.informational.religion,
      street_address: inputData.informational.streetAddress,
      student_age: inputData.informational.studentAge,
      student_birth_date: inputData.informational.studentBirthDate,
      student_color: inputData.informational.studentColor,
      student_educational_attainment: inputData.informational.studentEducationalAttainment,
      student_gender: inputData.informational.studentGender,
      student_gender_other: inputData.informational.studentGenderOther,
      student_name: inputData.informational.studentName,
      student_ra: inputData.informational.studentRa,
      student_school_name: inputData.informational.studentSchoolName,
      student_school_period: inputData.informational.studentSchoolPeriod,
      nis: inputData.informational.nis,
      assistant_description: inputData.psychosocialEvaluation.assistantDescription,
      childhood_diseases: inputData.psychosocialEvaluation.childhoodDiseases,
      current_diet: inputData.psychosocialEvaluation.currentDiet,
      daily_routine: inputData.psychosocialEvaluation.dailyRoutine,
      early_diet: inputData.psychosocialEvaluation.earlyDiet,
      family_dynamics: inputData.psychosocialEvaluation.familyDynamics,
      guardian_perception: inputData.psychosocialEvaluation.guardianPerception,
      interview_observations: inputData.psychosocialEvaluation.interviewObservations,
      medications: inputData.psychosocialEvaluation.medications,
      mental_health_history: inputData.psychosocialEvaluation.mentalHealthHistory,
      participates_in_project: inputData.psychosocialEvaluation.participatesInProject,
      pregnancy_and_birth: inputData.psychosocialEvaluation.pregnancyAndBirth,
      psychomotor_development: inputData.psychosocialEvaluation.psychomotorDevelopment,
      schooling_history: inputData.psychosocialEvaluation.schoolingHistory,
      sexuality: inputData.psychosocialEvaluation.sexuality,
      sleep_routine: inputData.psychosocialEvaluation.sleepRoutine,
      speech_and_language: inputData.psychosocialEvaluation.speechAndLanguage,
      sphincter_control: inputData.psychosocialEvaluation.sphincterControl,
      substance_use: inputData.psychosocialEvaluation.substanceUse,
      technology_access: inputData.psychosocialEvaluation.technologyAccess,
      tics_and_habits: inputData.psychosocialEvaluation.ticsAndHabits
    }
    await apiClient.post("/screenings", body)
  }
}
export const screeningService = new ScreeningService();
