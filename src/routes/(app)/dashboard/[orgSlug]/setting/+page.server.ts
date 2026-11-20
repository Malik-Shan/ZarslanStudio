import { auth } from "#lib/auth/authServer.ts";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({locals,params,request}) => {
	if(!locals.session) redirect(301, "/(app)/signin");

	const fullOrganization = await auth.api.getFullOrganization({
		query: {
			organizationSlug: params.orgSlug,
		},
		headers: request.headers
	})

	if(!fullOrganization) error(404, "Organization not found.");

	const org_update = await auth.api.hasPermission({
		headers: request.headers,
		body: {
			organizationId: fullOrganization.id,
			permissions: {
				organization: ['update'],
			}
		}
	})

	const org_delete = await auth.api.hasPermission({
		headers: request.headers,
		body: {
			organizationId: fullOrganization.id,
			permissions: {
				organization: ['delete'],
			}
		}
	})

	const member_create = await auth.api.hasPermission({
		headers: request.headers,
		body: {
			organizationId: fullOrganization.id,
			permissions: {
				member: ['create'],
			}
		}
	})
	const member_delete = await auth.api.hasPermission({
		headers: request.headers,
		body: {
			organizationId: fullOrganization.id,
			permissions: {
				member: ['delete'],
			}
		}
	})
	const member_update = await auth.api.hasPermission({
		headers: request.headers,
		body: {
			organizationId: fullOrganization.id,
			permissions: {
				member: ['update'],
			}
		}
	})
	const invitation_create = await auth.api.hasPermission({
		headers: request.headers,
		body: {
			organizationId: fullOrganization.id,
			permissions: {
				invitation: ['create'],
			}
		}
	})
	const invitation_cancel = await auth.api.hasPermission({
		headers: request.headers,
		body: {
			organizationId: fullOrganization.id,
			permissions: {
				invitation: ['cancel'],
			}
		}
	})

	return {fullOrganization, orgPermissions: {
		org_update, org_delete,
		member_create, member_update, member_delete,
		invitation_create, invitation_cancel
	}};
};
