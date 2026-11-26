import {
   BETTER_AUTH_URL,
   BETTER_AUTH_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET
} from '$app/env/private';

import type { BetterAuthOptions } from "better-auth";

import {admin, organization, lastLoginMethod} from 'better-auth/plugins'
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import { roles, ac } from '#lib/auth/permissions.ts';

export const betterAuthOptions = {
      baseURL: BETTER_AUTH_URL,
      secret: BETTER_AUTH_SECRET,
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
} satisfies BetterAuthOptions;
