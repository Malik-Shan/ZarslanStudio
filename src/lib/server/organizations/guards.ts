import type { RequestEvent } from '@sveltejs/kit';

export function requireOrganization(event: RequestEvent) {
    return event.locals.auth.api.getOrganization({
        query: {
            organizationSlug: event.params.orgSlug
        },
        headers: event.request.headers
    });
}
