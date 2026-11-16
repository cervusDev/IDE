import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  decimal,
  text,
  pgEnum,
  integer,
  boolean,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { usersTable } from '../users';
import { sql } from 'drizzle-orm';
import { index } from 'drizzle-orm/pg-core';

export const housingStatusEnum = pgEnum('housing_status', [
  'ALUGADO',
  'PRÓPRIO',
  'CEDIDO',
]);

export const genderEnum = pgEnum('gender_enum', ['M', 'F', 'O']);

export const informationalScreeningTable = pgTable('informational_screening', {
  id: uuid('id').defaultRandom().primaryKey(),

  // Identificadores
  healthUnity: varchar('health_unity', { length: 255 }).notNull(),
  nis: varchar('nis', { length: 11 }),

  // O número de cadastro do aluno vive aqui mesmo
  registration: varchar('registration', { length: 50 }).notNull(),
  
  // Controle de versionamento
  version: integer('version').default(1).notNull(),
  isLatest: boolean('is_latest').default(true).notNull(),

  // ── Novos Campos de Controle e Atribuição ──
  assigneeId: uuid('assignee_id').references(() => usersTable.id, {
    onDelete: 'set null', // Se o usuário for deletado, o campo vira null em vez de quebrar o registro
  }),
  coAuthorId: uuid('co_author_id').references(() => usersTable.id, {
    onDelete: 'set null',
  }),

  // Dados do Aluno
  studentName: varchar('student_name', { length: 255 }).notNull(),
  studentBirthDate: varchar('student_birth_date', { length: 10 }).notNull(),
  studentColor: varchar('student_color', { length: 50 }).notNull(),
  studentAge: integer('student_age').notNull(),
  studentRa: varchar('student_ra', { length: 50 }).notNull(),
  studentEducationalAttainment: varchar('student_educational_attainment', { length: 255 }).notNull(),
  studentSchoolName: text('student_school_name').notNull(),
  studentSchoolPeriod: varchar('student_school_period', { length: 100 }).notNull(),
  studentGender: genderEnum('student_gender').notNull(),
  studentGenderOther: varchar('student_gender_other', { length: 100 }),

  // Endereço e Contato
  streetAddress: varchar('street_address', { length: 255 }).notNull(),
  neighborhood: varchar('neighborhood', { length: 255 }).notNull(),

  // Dados da Mãe
  motherName: varchar('mother_name', { length: 255 }),
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
}, (table) => [
  // 1. Impede que existam duas "Versões 1" para o mesmo número de cadastro
  uniqueIndex('unique_registration_version')
    .on(table.registration, table.version),

  // 2. O GRUPO DE OURO: Garante que APENAS UMA linha por registration pode ser a atual (is_latest = true)
  index('unique_latest_screening_per_registration')
    .on(table.registration)
    .where(sql`${table.isLatest} = true`),
]);