import {
	BETTER_AUTH_URL,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET
} from '$app/env/private';

import { betterAuth } from 'better-auth/minimal';
import {admin, organization, lastLoginMethod} from 'better-auth/plugins'
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import { ac,owner, member, scripter, admin as AdminRole } from './permissions.js';
import { createD1Client } from '#lib/server/db/index.js';
import { env } from 'cloudflare:workers';

const db = createD1Client(env.zarslanstudio_db_dev);

export const auth = betterAuth({
	baseURL: BETTER_AUTH_URL,
	database: drizzleAdapter(db, { provider: 'sqlite' }),
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
