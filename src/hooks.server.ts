import type { Handle } from '@sveltejs/kit/hooks';
import {env} from 'cloudflare:workers';
interface WorkSpaceRole {
	path: `/${string}`,
	role: 'admin' | 'user' | 'employee'
}

import { svelteKitHandler } from 'better-auth/svelte-kit';

import { createLibSqlClient, createD1Client } from './lib/server/db';
import { createAuth } from './lib/server/auth';

import {DATABASE_URL} from "$app/env/private";
import { building } from '$app/env';
import { error, redirect } from '@sveltejs/kit';


const SpacesWithRole = {
	app: {
		path: '/dashboard',
		role: 'user'
	},
	user: {
		path: '/user',
		role: 'user'
	},
	employee: {
		path: '/workspace',
		role: 'employee'
	}
} as const satisfies Record<string, WorkSpaceRole>

const signInPage = "/signin"

const handleBetterAuth: Handle = async ({ event, resolve }) => {
	const d1 = env.zarslanstudio_db_dev;
	if(d1) {
		event.locals.db = createD1Client(d1);
	} else if(DATABASE_URL){
		event.locals.db = createLibSqlClient(DATABASE_URL);
	} else {
		throw new Error("No database found.");
	}

	const auth = createAuth(event.locals.db);
	event.locals.auth = auth;

	const session = await event.locals.auth.api.getSession({
		headers: event.request.headers
	});


	const { pathname, search } = event.url;

	// TODO: Fix this to be more useable
	const employeeRoute = pathname.startsWith(SpacesWithRole.employee.path);
	const appRoute = pathname.startsWith(SpacesWithRole.app.path);
	const userRoute = pathname.startsWith(SpacesWithRole.user.path);

	event.locals.session = session?.session ?? null;
	event.locals.user = session?.user ?? null;

	if (employeeRoute || appRoute || userRoute) {

		if (!session) {
			const returnTo = encodeURIComponent(pathname + search);
			redirect(303, `${signInPage}?returnTo=${returnTo}`)
		}


		const roles = session.user.role?.split(',');

		if (!roles?.includes('admin')) {
			// TODO: fix this to be more reuseable
			if (employeeRoute && !roles?.includes(SpacesWithRole.employee.role) || 
				appRoute && !roles?.includes(SpacesWithRole.app.role)||
				userRoute && !roles?.includes(SpacesWithRole.user.role)) {
				error(404, "Page not found")
			}
		}
	}

	return svelteKitHandler({ event, resolve, auth, building });
};

export const handle: Handle = handleBetterAuth;
