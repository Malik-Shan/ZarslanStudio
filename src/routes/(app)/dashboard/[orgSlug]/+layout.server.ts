import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { APIError } from 'better-auth/api';
import { requireOrganization } from '#lib/server/organizations/guards.js';

export const load: LayoutServerLoad = async ({ params, request }) => {
    console.log("ORG SLUG Layout Server.ts")
    return requireOrganization({
        request,
        slug: params.orgSlug
    })
        .then((organization) => {
            if (!organization) {
                error(404, 'Organization not found');
            }

            return {
                organization
            };
        })
        .catch((cause) => {
            // Hide whether an organization exists
            // when the user doesn't have access.
            if (
                cause instanceof APIError &&
                (cause.status === 'BAD_REQUEST' ||
                    cause.status === 'FORBIDDEN')
            ) {
                error(404, 'Organization not found');
            }

            // Unexpected errors should remain 500 errors.
            throw cause;
        });
};
