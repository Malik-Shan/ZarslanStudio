import type { RequestEvent } from '@sveltejs/kit';

export async function requireOrganization(event: RequestEvent) {
    if(!event.locals.user || !event.locals.session) return null;
    const {user} = event.locals;
    return await event.locals.db.query.member.findFirst({
        where: {
            userId: user.id,
            organization: {
                slug: event.params.orgSlug
            }
        },
        with:{
            organization: true
        }
    });
    // return event.locals.auth.api.getOrganization({
    //     query: {
    //         organizationSlug: event.params.orgSlug
    //     },
    //     headers: event.request.headers
    // });
}
