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
import { ac,owner, member, scripter, admin as AdminRole } from './permissions.js';
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
         admin({
            defaultRole: 'user',
            adminUserIds:['wxJz9rRb7ZZFFJsLfmDyvMPWaM3E6RRU']
         }),
         organization({
            allowUserToCreateOrganization:true,
            ac,
            roles: {
               owner,
               admin: AdminRole,
               member,
               scripter
            }
         },
         ),
         lastLoginMethod(),
         sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
      ]
   });
}

export type BetterAuth = ReturnType<typeof createAuth>;


