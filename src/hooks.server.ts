import type { Handle } from '@sveltejs/kit/hooks';
import { building } from '$app/env';
import { auth } from '#lib/auth/authServer.ts';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { redirect } from '@sveltejs/kit';

interface WorkSpaceRole {
	path: `/${string}`,
	role: 'admin' | 'user' | 'employee'
}

const SpacesWithRole = {
	user: {
		path: '/dashboard',
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

	const isEmployeeRoute = pathname.startsWith(SpacesWithRole.employee.path);
	const isUserRoute = pathname.startsWith(SpacesWithRole.user.path);

	event.locals.session = session?.session ?? null;
	event.locals.user = session?.user ?? null;

	if (isEmployeeRoute || isUserRoute) {

		if (!session) {
			const returnTo = encodeURIComponent(pathname + search);
			redirect(303, `${signInPage}?returnTo=${returnTo}`);
		}

		const roles = session.user.role?.split(',');

		if (!roles?.includes('admin')) {

			if (isEmployeeRoute && !roles?.includes(SpacesWithRole.employee.role)) {redirect(302,'/404')}
			if (isUserRoute && !roles?.includes(SpacesWithRole.user.role)) {redirect(302,'/404')}
		}
	}

	return svelteKitHandler({ event, resolve, auth, building });
};

export const handle: Handle = handleBetterAuth;