import * as schema from './schema.js';
import { createLibSqlClient, createD1Client } from '.';

export type DrizzleClient = ReturnType<typeof createLibSqlClient> | ReturnType<typeof createD1Client>;

export type UserSelect = typeof schema.user.$inferSelect;
export type UserInsert = typeof schema.user.$inferInsert;
export type MemberSelect = typeof schema.member.$inferSelect;
export type MemberInsert = typeof schema.member.$inferInsert;
export type OrganizationSelect = typeof schema.organization.$inferSelect;
export type OrganizationInsert = typeof schema.organization.$inferInsert;
