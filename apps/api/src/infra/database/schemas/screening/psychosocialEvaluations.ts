import {
  pgTable,
  uuid,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { informationalScreeningTable } from './informationalScreening';

export const psychosocialEvaluationsTable = pgTable('psychosocial_evaluations', {
  id: uuid('id').defaultRandom().primaryKey(),

  // Relacionamento com o cadastro principal do aluno
  informationalScreeningId: uuid('informational_screening_id')
    .notNull()
    .references(() => informationalScreeningTable.id, { onDelete: 'cascade' }),

  //'Q1: A criança ou adolescente tem histórico de tratamento em saúde mental?'
  mentalHealthHistory: text('mental_health_history'),
  // 'Q2: Concepção, Gestação e Parto'
  pregnancyAndBirth: text('pregnancy_and_birth'),
  //'Q3: Aleitamento e alimentação: (tinha acesso a fruta, verdura e legumes?).'
  earlyDiet: text('early_diet'),

  //'Q4: Alimentação atual: (Histórico de alergia alimentar, seletividade alimentar, como é o acesso a alimentação e quantas refeições são feitas no day, tem acesso a frutas, verduras e legumes?).'
  currentDiet: text('current_diet'),

  //'Q5: Sono: (Como era quando bebê? Como é atualmente? Hábitos para dormir? Agitado? Quanto tempo para dormir? Onde dorme? Com quem dorme? Possui distúrbios: insônia, pesadelos, pavor noturno, sonambulismo, medo de escuro, bruxismo? Enurese noturna?).'
  sleepRoutine: text('sleep_routine'),

  // 'Q6: Desenvolvimento psicomotor: (Sentar, engatinhar, andar, qual idade? Teve dificuldade? Sofre ou sofreu quedas frequentes? Segura lápis e talher de forma correta? Manipula tesouras?).'
  psychomotorDevelopment: text('psychomotor_development'),

  //'Q7: Linguagem: (Demorou a falar? Problemas na fala? Trocas fonéticas? Fala regredida ou algum outro distúrbio?).'
  speechAndLanguage: text('speech_and_language'),

  // 'Q8: Controle Esfincteriano: (Quem ajudou no desfralde? Enurese? Encoprese? Constipação intestinal? Histórico de infecção urinária?).'
  sphincterControl: text('sphincter_control'),

  // 'Q9: Doenças da infância'
  childhoodDiseases: text('childhood_diseases'),

  // 'Q10: Medicações'
  medications: text('medications'),

  // 'Q11: Sexualidade: (Curiosidade, masturbação, precocidade, abuso, distúrbios, como é o assunto para a família?).'
  sexuality: text('sexuality'),

  // 'Q12: Escolaridade: (Idade que iniciou, adaptação, aprendizagem, reforço escolar, reprovações, comportamentos, relacionamento na escola, maiores dificuldades).'
  schoolingHistory: text('schooling_history'),

  // 'Q13: Manipulação / tiques: (roer unhas, chupar dedo, uso de chupeta e ou mamadeira, cheirinho, puxar cabelo).'
  ticsAndHabits: text('tics_and_habits'),

  // 'Q14: Rotina'
  dailyRoutine: text('daily_routine'),

  // 'Q15: Participa de projeto? Qual?'
  participatesInProject: text('participates_in_project'),

  // 'Q16: Tem acesso a tecnologia? Quanto tempo de tela por dia?'
  technologyAccess: text('technology_access'),

  // 'Q17: Contato ou uso de álcool ou drogas? Algum familiar faz uso dessas substâncias?'
  substanceUse: text('substance_use'),

  // 'Q18: Dinâmica Familiar: (Quem é a figura de autoridade? Como se relaciona com a figura de autoridade? O responsável pela criança tem rede de apoio? Existem conflitos familiares?).'
  familyDynamics: text('family_dynamics'),

  // 'Q19: Como poderia descrever o assistido?'
  assistantDescription: text('assistant_description'),

  // 'Q20: Percepção do responsável em relação a mudança do atendido após o ingresso no serviço'
  guardianPerception: text('guardian_perception'),

  // 'Q21: Observações durante a entrevista'
  interviewObservations: text('interview_observations'),

  // Timestamps
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});