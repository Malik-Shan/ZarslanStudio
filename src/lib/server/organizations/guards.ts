import { auth } from '#lib/auth/authServer.js';

export function requireOrganization({
    request,
    slug
}: {
    request: Request;
    slug: string;
}) {
    return auth.api.getOrganization({
        query: {
            organizationSlug: slug
        },
        headers: request.headers
    });
}
