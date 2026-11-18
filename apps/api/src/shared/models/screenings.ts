export interface IFamilyMember {
  fullName: string;
  age: number;
  relationship: string;
  educationalAttainment?: string | null;
  contact?: string | null;
}

export type HousingStatus = 'ALUGADO' | 'PRÓPRIO' | 'CEDIDO';
export type Gender = 'M' | 'F' | 'O';

export const housingStatusSchemaValues = ['ALUGADO', 'PRÓPRIO', 'CEDIDO'] as const;
export const genderEnumSchemaValues = ['M', 'F', 'O'] as const;


export interface IInformationalScreening {
  healthUnity: string;
  registration: string;
  nis?: string | null;
  
  // Dados do Aluno
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
  
  // Endereço e Contato
  streetAddress: string;
  neighborhood: string;
  
  // Dados da Mãe
  motherName?: string | null;
  motherAge?: number | null;
  motherEducationalAttainment?: string | null;
  motherOccupation?: string | null;
  motherContact?: string | null;
  
  // Dados do Pai
  fatherName?: string | null;
  fatherAge?: number | null;
  fatherEducationalAttainment?: string | null;
  fatherOccupation?: string | null;
  fatherContact?: string | null;
  
  // Informações Socioeconômicas
  grossHouseholdIncome: number; // O Drizzle costuma retornar decimais como string por segurança de precisão
  parentsMaritalStatus: string;
  legalGuardianName: string;
  religion: string;
  housingStatus: HousingStatus;
}

export interface IPsychosocialEvaluation {
  mentalHealthHistory?: string | null ;
  pregnancyAndBirth?: string | null ;
  earlyDiet?: string | null ;
  currentDiet?: string | null ;
  sleepRoutine?: string | null ;
  psychomotorDevelopment?: string | null ;
  speechAndLanguage?: string | null ;
  sphincterControl?: string | null ;
  childhoodDiseases?: string | null ;
  medications?: string | null ;
  sexuality?: string | null ;
  schoolingHistory?: string | null ;
  ticsAndHabits?: string | null ;
  dailyRoutine?: string | null ;
  participatesInProject?: string | null ;
  technologyAccess?: string | null ;
  substanceUse?: string | null ;
  familyDynamics?: string | null ;
  assistantDescription?: string | null ;
  guardianPerception?: string | null ;
  interviewObservations?: string | null ;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBenefit {
  // Transferência de Renda e Auxílios
  familyGrant: boolean;
  continuousCashBenefit: boolean;
  gasAid: boolean;
  birthAid: boolean;
  emergencyAid: boolean;
  stateIncomeAid: boolean;
  
  // Tarifas Sociais
  socialEnergyTariff: boolean;
  socialWaterTariff: boolean;
  
  // Educação e Infância
  peDeMeia: boolean;
  milkProgram: boolean;
  menstrualDignityProgram: boolean;
  youthId: boolean;
  
  // Habitação
  socialRent: boolean;
  socialHousing: boolean;
  greenGrant: boolean;
  
  // Acompanhamento Socioassistencial
  participatesInPaif: boolean;
  participatesInPaefi: boolean;
  childLaborEradication: boolean;
  
  // Isenções, Documentos e Transporte
  feeExemption: boolean;
  elderlyCard: boolean;
  freeTransit: boolean;
  inclusionAid: boolean;
  
  others: boolean;
  othersDescription?: string | null;
}