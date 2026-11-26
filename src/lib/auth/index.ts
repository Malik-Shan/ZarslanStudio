import { betterAuth } from "better-auth/minimal";
import { betterAuthOptions } from "#lib/server/auth/options.ts";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { createLibSqlClient } from "../server/db";
import * as schema from '#lib/server/db/auth.schema.ts';

const db = createLibSqlClient('file:local.db');
export const auth = betterAuth({
   database: drizzleAdapter(db, {
      provider: 'sqlite',
      schema
   }),
   ...betterAuthOptions
});
