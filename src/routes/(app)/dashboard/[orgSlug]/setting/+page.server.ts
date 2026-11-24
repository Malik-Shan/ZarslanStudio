import type { PageServerLoad } from "./$types";

import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({locals,params,request}) => {

	const fullOrganization = await locals.auth.api.getFullOrganization({
		query: {
			organizationSlug: params.orgSlug
		},
		headers: request.headers
	})

	if(!fullOrganization) error(404, "Organization not found.");

	return {fullOrganization};
};
