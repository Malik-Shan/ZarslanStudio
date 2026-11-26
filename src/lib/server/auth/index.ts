import type { DrizzleClient } from '#lib/server/db/index.js';

import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from '@better-auth/drizzle-adapter/relations-v2';
import { betterAuthOptions } from './options';

import * as schema from '#lib/server/db/auth.schema.ts';


export const createAuth = (database: DrizzleClient) => {
   return betterAuth({
      database: drizzleAdapter(database, { 
         schema,
         provider: 'sqlite' }),
      ...betterAuthOptions
   });
}

export type Auth = ReturnType<typeof createAuth>;
