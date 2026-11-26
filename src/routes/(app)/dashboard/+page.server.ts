import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, locals }) => {
    const {user} = locals;

    if(!user) error(401, "User not logged in.")

    const session_org_slug = cookies.get('__session_org_slug');

    if (session_org_slug) {
        console.log("Redirect to the selected org")
        redirect(307, `/dashboard/${session_org_slug}`);
        // const organization = await locals.auth.api.getOrganization({
        //     query: {
        //         organizationSlug: session_org_slug
        //     },
        //     headers: request.headers
        // })
        // .then((org) => {
        //     return org;
        //
        // })
        // .catch(() => {
        //     cookies.delete('__session_org_slug', {
        //         path: '/dashboard'
        //     });
        //     return null
        // })
        // if (organization) {
        //     redirect(307, `/dashboard/${organization.slug}`);
        // };
    };


    console.log("First org goten");
    // This only does the redirect.
    const available_org = await locals.db.query.member.findFirst({
        columns:{},
        where: {
            userId: user.id
        },
        with: {
            organization: true
        }
    })

    if (!available_org) {
        return {
            organization: null
        };
    }

    redirect(307, `/dashboard/${available_org.organization?.slug}`);
};
