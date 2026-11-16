import { relations } from 'drizzle-orm';
import { informationalScreeningTable } from './informationalScreening';
import { familyMembersTable } from './familyMembers';
import { psychosocialEvaluationsTable } from './psychosocialEvaluations';
import { benefitsTable } from './benefits';
import { usersTable } from '../users';

export const informationalScreeningRelations = relations(
  informationalScreeningTable,
  ({ many, one }) => ({
    familyMembers: many(familyMembersTable),
    psychosocialEvaluation: one(psychosocialEvaluationsTable),
    benefits: one(benefitsTable),

    assignee: one(usersTable, {
      fields: [informationalScreeningTable.assigneeId],
      references: [usersTable.id],
      relationName: 'ticket_assignee',
    }),
    coAuthor: one(usersTable, {
      fields: [informationalScreeningTable.coAuthorId],
      references: [usersTable.id],
      relationName: 'ticket_coauthor',
    }),
  })
);

export const familyMembersRelations = relations(
  familyMembersTable,
  ({ one }) => ({
    informationalScreening: one(informationalScreeningTable, {
      fields: [familyMembersTable.informationalScreeningId],
      references: [informationalScreeningTable.id],
    }),
  })
);

export const psychosocialEvaluationsRelations = relations(
  psychosocialEvaluationsTable,
  ({ one }) => ({
    informationalScreening: one(informationalScreeningTable, {
      fields: [psychosocialEvaluationsTable.informationalScreeningId],
      references: [informationalScreeningTable.id],
    }),
  })
);

export const benefitsRelations = relations(
  benefitsTable,
  ({ one }) => ({
    informationalScreening: one(informationalScreeningTable, {
      fields: [benefitsTable.screeningId],
      references: [informationalScreeningTable.id],
    }),
  })
);