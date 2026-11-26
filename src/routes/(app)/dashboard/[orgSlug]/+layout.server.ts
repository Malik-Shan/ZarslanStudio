import type { LayoutServerLoad } from './$types';

import { dev } from '$app/env';
import { requireOrganization } from '#lib/server/organizations/guards.js';
import { resolve } from '$app/paths';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async (event) => {
    return requireOrganization(event)
        .then((data) => {
            if (!data || !data.organization) {
                console.log("erro ran")
                throw new Error('No organization found.');
            };

            event.cookies.set('__session_org_slug', data.organization.slug, {
                path: '/dashboard',
                httpOnly: true,
                secure: !dev,
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 365
            });

            return {
                organization: data.organization,
                member: data
            };
        })
        .catch(() => {
            console.log("coookie deleted hopefully");
            event.cookies.delete('__session_org_slug', {
                path: '/dashboard'
            });
            redirect(307, resolve('/(app)/dashboard'));
            // Hide whether an organization exists
            // when the user doesn't have access.

            // if (
            //     cause instanceof APIError &&
            //     (cause.status === 'BAD_REQUEST' ||
            //         cause.status === 'FORBIDDEN')
            // ) {
            //     error(404, 'Organization not found');
            // }

            // Unexpected errors should remain 500 errors.
            // throw cause;
        });
};
