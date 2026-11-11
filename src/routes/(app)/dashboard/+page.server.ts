import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { auth } from '#lib/auth/authServer.js';
import {dev} from '$app/env'
import { slugify } from '#lib';

export const load: PageServerLoad = async ({ cookies, request }) => {
    const session_org_id = cookies.get('__session_org_slug');

    if (session_org_id) {
        const organization = await auth.api.getOrganization({
            query: {
                organizationId: session_org_id 
            },
            headers: request.headers
        })
        .then((org) => {
            return org;

        })
        .catch(() => {
            cookies.delete('__session_org_id', {
                path: '/dashboard'
            });
            return null
        })
        if (organization) {
            redirect(307, `/dashboard/${slugify(organization.slug)}`);
        };
    };

    const organizations = await auth.api.listOrganizations({
        headers: request.headers
    });

    if (organizations.length === 0) {
        return {
            organization: null
        };
    };

    cookies.set('__session_org_id', organizations[0].id, {
        path: '/dashboard',
        httpOnly: true,
        secure: !dev,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365
    });

    redirect(307, `/dashboard/${organizations[0].slug}`);
};