// schema.ts
import { z } from "zod";

// ------------------------------------------------------
// 1. Schemas individuais para cada etapa
// ------------------------------------------------------
const housingStatusValues = ['ALUGADO', 'PRÓPRIO', 'CEDIDO'] as const;
const genderEnum = ['M', 'F', 'O'] as const;

const optionalString = z.preprocess((val) => {
  if (val === "" || val === null || val === undefined || val === "null") {
    return undefined;
  }
  return String(val);
}, z.string().optional());

const optionalInt = z.preprocess((val) => {
  if (
    val === "" ||
    val === null ||
    val === undefined ||
    val === "null" ||
    val === "undefined"
  ) {
    return undefined;
  }

  const num = typeof val === "number" ? val : Number(String(val).trim());
  return Number.isInteger(num) ? num : null;
}, z.number().int().optional());

const cleanContact = z.preprocess(
  (val) => {
      const digits = String(val).replace(/\D/g, "");
      return digits;
  },
  z.string().max(12)
);

// Passo 1: Dados Pessoais
export const step1Schema = z.object({
  // Identificação e Cadastro
  healthUnity: z.string().min(1, 'A unidade de saúde é obrigatória'),
  registration: z.string().min(1, 'A matrícula é obrigatória'),

  // Dados do Aluno
  studentName: z.string().min(1, 'O nome do aluno é obrigatório'),
  studentBirthDate: z.string().min(10, 'A data de nascimento deve ter o formato DD/MM/AAAA').max(10, 'A data de nascimento deve ter o formato DD/MM/AAAA'),
  studentColor: z.string().min(1, 'A cor/raça do aluno é obrigatória'),
  studentAge: z.string({ message: 'A idade do aluno é obrigatória' }),
  studentRa: z.string().min(1, 'O número do RA é obrigatório'),
  studentEducationalAttainment: z.string().min(1, 'A escolaridade do aluno é obrigatória'),
  studentSchoolName: z.string().min(1, 'O nome da escola do aluno é obrigatório'),
  studentSchoolPeriod: z.string().min(1, 'O período escolar do aluno é obrigatório'),
  studentGender: z.enum(genderEnum, {
    message: 'Selecione um tipo de gênero válido',
  }),
  studentGenderOther: z.string().optional(),

  // Endereço
  streetAddress: z.string().min(1, 'O endereço da família é obrigatório'),
  neighborhood: z.string().min(1, 'O bairro é obrigatório'),

  // Dados da Mãe (Opcionais)
  motherName: optionalString,
  motherAge: optionalInt,
  motherEducationalAttainment: optionalString,
  motherOccupation: optionalString,
  motherContact: cleanContact,

  // Dados do Pai (Opcionais)
  fatherName: optionalString,
  fatherAge: optionalInt,
  fatherEducationalAttainment: optionalString,
  fatherOccupation: optionalString,
  fatherContact: cleanContact,

  // Contexto Socioeconômico e Familiar
  grossHouseholdIncome: z.coerce
    .string({ message: 'A renda bruta familiar é obrigatória' }),
  parentMaritalStatus: z.string().min(1, 'O estado civil dos pais é obrigatório'),
  legalGuardianName: z.string().min(1, 'O nome do responsável legal é obrigatório'),
  religion: z.string().min(1, 'O campo religião é obrigatório'),
  housingStatus: z.enum(housingStatusValues, {
    message: 'Selecione um tipo de moradia válido',
  }),
});

// Passo 2: Endereço
export const step2Schema = z.object({
  nis: z.string().optional(),

  familyGrant: z.boolean().default(false),
  continuousCashBenefit: z.boolean().default(false),
  gasAid: z.boolean().default(false),
  birthAid: z.boolean().default(false),
  emergencyAid: z.boolean().default(false),
  stateIncomeAid: z.boolean().default(false),

  // 2. Tarifas Sociais e Serviços Básicos
  socialEnergyTariff: z.boolean().default(false),
  socialWaterTariff: z.boolean().default(false),

  // 3. Educação, Infância e Juventude
  peDeMeia: z.boolean().default(false),
  milkProgram: z.boolean().default(false),
  menstrualDignityProgram: z.boolean().default(false),
  youthId: z.boolean().default(false),

  // 4. Habitação e Infraestrutura
  socialRent: z.boolean().default(false),
  socialHousing: z.boolean().default(false),
  greenGrant: z.boolean().default(false),

  // 5. Acompanhamento Socioassistencial (CRAS/CREAS)
  participatesInPaif: z.boolean().default(false),
  participatesInPaefi: z.boolean().default(false),
  childLaborEradication: z.boolean().default(false),

  // 6. Isenções, Documentos e Transporte
  feeExemption: z.boolean().default(false),
  elderlyCard: z.boolean().default(false),
  freeTransit: z.boolean().default(false),
  inclusionAid: z.boolean().default(false),

  // Outros
  others: z.boolean().default(false),
  othersDescription: z.string().max(255, 'A descrição deve ter no máximo 255 caracteres').optional().or(z.literal('')),
});

// Passo 3: Preferências
export const familyMemberSchema = z.object({
  fullName: z.string().min(1, 'O nome completo é obrigatório').max(255),
  age: z.string().min(1, 'A idade é obrigatória'),
  relationship: z.string().min(1, 'O grau de parentesco é obrigatório').max(100),
  educationalAttainment: z.string().max(255),
  contact: cleanContact
});

export const step3Schema = z.object({
  members: z.array(familyMemberSchema).min(1, 'Adicione pelo menos um membro familiar.'),
});
// Passo 4: Segurança
export const step4Schema = z.object({
  // Seção 1: Saúde e Histórico Médico
  mentalHealthHistory: z.string().optional().or(z.literal('')),
  childhoodDiseases: z.string().optional().or(z.literal('')),
  medications: z.string().optional().or(z.literal('')),

  // Seção 2: Gestação, Alimentação e Sono
  pregnancyAndBirth: z.string().optional().or(z.literal('')),
  earlyDiet: z.string().optional().or(z.literal('')),
  currentDiet: z.string().optional().or(z.literal('')),
  sleepRoutine: z.string().optional().or(z.literal('')),

  // Seção 3: Desenvolvimento Infantil e Linguagem
  psychomotorDevelopment: z.string().optional().or(z.literal('')),
  speechAndLanguage: z.string().optional().or(z.literal('')),
  sphincterControl: z.string().optional().or(z.literal('')),
  ticsAndHabits: z.string().optional().or(z.literal('')),

  // Seção 4: Comportamento, Escolaridade e Rotina
  sexuality: z.string().optional().or(z.literal('')),
  schoolingHistory: z.string().optional().or(z.literal('')),
  dailyRoutine: z.string().optional().or(z.literal('')),
  participatesInProject: z.string().optional().or(z.literal('')),
  technologyAccess: z.string().optional().or(z.literal('')),
  substanceUse: z.string().optional().or(z.literal('')),

  // Seção 5: Dinâmica Familiar e Avaliação Profissional
  familyDynamics: z.string().optional().or(z.literal('')),
  assistantDescription: z.string().optional().or(z.literal('')),
  guardianPerception: z.string().optional().or(z.literal('')),
  interviewObservations: z.string().optional().or(z.literal('')),
});

// ------------------------------------------------------
// 2. Schema Completo (União usando .extend() recomendado)
// ------------------------------------------------------
export const fullFormSchema = step1Schema
  .extend(step2Schema.shape)
  .extend(step3Schema.shape)
  .extend(step4Schema.shape)

// Tipo TypeScript gerado a partir do schema completo
export type FormSchemaType = z.infer<typeof fullFormSchema>;

// ------------------------------------------------------
// 3. Array ordenado para validação dinâmica no trigger()
// ------------------------------------------------------
export const stepSchemas = [
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
];