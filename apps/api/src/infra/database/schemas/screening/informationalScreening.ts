import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  decimal,
  text,
  pgEnum,
  integer,
} from 'drizzle-orm/pg-core';

export const housingStatusEnum = pgEnum('housing_status', [
  'ALUGADO',
  'PRÓPRIO',
  'CEDIDO',
]);

export const informationalScreeningTable = pgTable('informational_screening', {
  id: uuid('id').defaultRandom().primaryKey(),
  
  // Identificadores
  healthUnity: varchar('health_unity', { length: 255 }).notNull(),
  registration: varchar('registration', { length: 50 }).notNull(),
  nis: varchar('nis', { length: 11 }).notNull().unique(),
  
  // Dados do Aluno
  studentName: varchar('student_name', { length: 255 }).notNull(),
  studentBirthDate: varchar('student_birth_date', { length: 10 }).notNull(),
  studentColor: varchar('student_color', { length: 50 }).notNull(),
  studentAge: integer('student_age').notNull(),
  studentRa: varchar('student_ra', { length: 50 }).notNull().unique(),
  
  // Dados Escolares
  educationalAttainment: varchar('educational_attainment', { length: 255 }).notNull(),
  schoolName: text('school_name').notNull(),
  schoolPeriod: varchar('school_period', { length: 100 }).notNull(),
  
  // Endereço e Contato
  streetAddress: varchar('street_address', { length: 255 }).notNull(),
  neighborhood: varchar('neighborhood', { length: 255 }).notNull(),
  
  // Dados da Mãe
  motherName: varchar('mother_name', { length: 255 }).notNull(),
  motherAge: integer('mother_age'),
  motherEducationalAttainment: varchar('mother_educational_attainment', { length: 255 }),
  motherOccupation: varchar('mother_occupation', { length: 255 }),
  motherContact: varchar('mother_contact', { length: 50 }),
  
  // Dados do Pai (Opcionais devido a registros monoparentais)
  fatherName: varchar('father_name', { length: 255 }),
  fatherAge: integer('father_age'),
  fatherEducationalAttainment: varchar('father_educational_attainment', { length: 255 }),
  fatherOccupation: varchar('father_occupation', { length: 255 }),
  fatherContact: varchar('father_contact', { length: 50 }),
  
  // Informações Socioeconômicas
  grossHouseholdIncome: decimal('gross_household_income', { precision: 10, scale: 2 }),
  parentsMaritalStatus: varchar('parents_marital_status', { length: 50 }),
  legalGuardianName: varchar('legal_guardian_name', { length: 255 }),
  religion: varchar('religion', { length: 100 }),
  housingStatus: housingStatusEnum('housing_status'),
  
  // Timestamps de Controle
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});