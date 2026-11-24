import {
   BETTER_AUTH_URL,
   BETTER_AUTH_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET
} from '$app/env/private';

import { betterAuth } from 'better-auth/minimal';
import {admin, organization, lastLoginMethod} from 'better-auth/plugins'
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import * as schema from '#lib/server/db/schema.js';
import { roles, ac } from '#lib/auth/permissions.ts';
import type { DrizzleClient } from '#lib/server/db/index.js';


export const createAuth = (database: DrizzleClient) => {
   return betterAuth({
      baseURL: BETTER_AUTH_URL,
      secret: BETTER_AUTH_SECRET,
      database: drizzleAdapter(database, { 
         schema,
         provider: 'sqlite' }),
      socialProviders: {
         google: {
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET
         }
      },
      plugins: [
         admin(),
         organization({
            allowUserToCreateOrganization:true,
            ac,
            roles
         },
         ),
         lastLoginMethod(),
         sveltekitCookies(getRequestEvent)
      ]
   });
}

export type Auth = ReturnType<typeof createAuth>;
