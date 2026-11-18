import type { PageServerLoad } from "./$types";
import { auth } from "#lib/auth/authServer.ts";
import { redirect } from "@sveltejs/kit";
import { resolve } from "$app/paths";
import { error } from "console";

export const load: PageServerLoad = async ({locals, params, request}) => {
	if(!locals.session) error(404, "Page doesn't exist");

	const fullOrganization = await auth.api.getFullOrganization({
		query: {
			organizationSlug: params.orgSlug,
		},
		headers: request.headers
	})

	if(!fullOrganization) redirect(307, resolve('/(app)/dashboard'))

	const org_delete = await auth.api.hasPermission({
		headers: request.headers,
		body: {
			organizationId: fullOrganization.id,
			permissions: {
				script: ['create']
			}
		}
	})
	console.log(org_delete)
	console.log(fullOrganization)

return {value: true}
};
