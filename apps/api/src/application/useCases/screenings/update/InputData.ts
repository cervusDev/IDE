import { Gender, HousingStatus, IBenefit, IFamilyMember, IInformationalScreening, IPsychosocialEvaluation } from "@shared/models/screenings";

export interface UpateInformationalScreeningDTO {
  // Identificadores
  healthUnity: string;
  nis?: string | null;
  registration: string;

  // Controle de versionamento (opcionais na criação; banco aplica defaults)
  version: number;
  isLatest: boolean;

  // Controle e atribuição
  assigneeId?: string | null;
  coAuthorId?: string | null;

  // Dados do aluno
  studentName: string;
  studentBirthDate: string;
  studentColor: string;
  studentAge: number;
  studentRa: string;
  studentEducationalAttainment: string;
  studentSchoolName: string;
  studentSchoolPeriod: string;
  studentGender: Gender;
  studentGenderOther?: string | null;

  // Endereço
  streetAddress: string;
  neighborhood: string;

  // Dados da mãe
  motherName?: string | null;
  motherAge?: number | null;
  motherEducationalAttainment?: string | null;
  motherOccupation?: string | null;
  motherContact?: string | null;

  // Dados do pai
  fatherName?: string | null;
  fatherAge?: number | null;
  fatherEducationalAttainment?: string | null;
  fatherOccupation?: string | null;
  fatherContact?: string | null;

  // Informações socioeconômicas
  grossHouseholdIncome: string;
  parentsMaritalStatus: string;
  legalGuardianName: string;
  religion: string;
  housingStatus: HousingStatus;
}

export interface UpateFamilyMemberDTO {
  fullName: string;
  age: number;
  relationship: string;
  educationalAttainment: string;
  contact: string;
}

export interface UpatePsychosocialEvaluationDTO {
  mentalHealthHistory?: string | null;
  pregnancyAndBirth?: string | null;
  earlyDiet?: string | null;
  currentDiet?: string | null;
  sleepRoutine?: string | null;
  psychomotorDevelopment?: string | null;
  speechAndLanguage?: string | null;
  sphincterControl?: string | null;
  childhoodDiseases?: string | null;
  medications?: string | null;
  sexuality?: string | null;
  schoolingHistory?: string | null;
  ticsAndHabits?: string | null;
  dailyRoutine?: string | null;
  participatesInProject?: string | null;
  technologyAccess?: string | null;
  substanceUse?: string | null;
  familyDynamics?: string | null;
  assistantDescription?: string | null;
  guardianPerception?: string | null;
  interviewObservations?: string | null;
}

export interface UpateBenefitDTO {
  // 1. Transferência de renda e auxílios diretos
  familyGrant?: boolean;
  continuousCashBenefit?: boolean;
  gasAid?: boolean;
  birthAid?: boolean;
  emergencyAid?: boolean;
  stateIncomeAid?: boolean;

  // 2. Tarifas sociais e serviços básicos
  socialEnergyTariff?: boolean;
  socialWaterTariff?: boolean;

  // 3. Educação, infância e juventude
  peDeMeia?: boolean;
  milkProgram?: boolean;
  menstrualDignityProgram?: boolean;
  youthId?: boolean;

  // 4. Habitação e infraestrutura
  socialRent?: boolean;
  socialHousing?: boolean;
  greenGrant?: boolean;

  // 5. Acompanhamento socioassistencial (CRAS/CREAS)
  participatesInPaif?: boolean;
  participatesInPaefi?: boolean;
  childLaborEradication?: boolean;

  // 6. Isenções, documentos e transporte
  feeExemption?: boolean;
  elderlyCard?: boolean;
  freeTransit?: boolean;
  inclusionAid?: boolean;

  // Outros
  others?: boolean;
  othersDescription?: string | null;
}

export interface InputData {
  informational: Partial<UpateInformationalScreeningDTO>;
  familyMembers?: Partial<UpateFamilyMemberDTO[]>;
  psychosocialEvaluation?: Partial<UpatePsychosocialEvaluationDTO>;
  benefits?: Partial<UpateBenefitDTO>;
  registration: string
  coAuthorId: string;
}