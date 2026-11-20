import type { Handle } from '@sveltejs/kit/hooks';
import { building } from '$app/env';
import { auth } from '#lib/auth/authServer.ts';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { error, redirect } from '@sveltejs/kit';

interface WorkSpaceRole {
	path: `/${string}`,
	role: 'admin' | 'user' | 'employee'
}

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
	const session = await auth.api.getSession({
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
			redirect(303, `${signInPage}?returnTo=${returnTo}`);
		}

		const roles = session.user.role?.split(',');

		if (!roles?.includes('admin')) {

			// TODO: fix this to be more reuseable
			if (employeeRoute && !roles?.includes(SpacesWithRole.employee.role)) {redirect(302,'/404')}
			if (appRoute && !roles?.includes(SpacesWithRole.app.role)) {error(404, "Page not found.")}
			if (userRoute && !roles?.includes(SpacesWithRole.user.role)) {redirect(302,'/404')}
		}
	}

	return svelteKitHandler({ event, resolve, auth, building });
};

export const handle: Handle = handleBetterAuth;
