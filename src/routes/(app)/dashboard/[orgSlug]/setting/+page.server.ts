import { auth } from "#lib/auth/authServer.ts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({locals, params, request}) => {
	if(!locals.session) return;

	const fullOrganization = await auth.api.getFullOrganization({
		query: {
			organizationSlug: params.orgSlug,
		},
		headers: request.headers
	})

	const org_update = await auth.api.hasPermission({
		headers: request.headers,
		body: {
			permissions: {
				organization: ['update'],
			}
		}
	})

	const org_delete = await auth.api.hasPermission({
		headers: request.headers,
		body: {
			permissions: {
				organization: ['delete'],
			}
		}
	})

	const member_create = await auth.api.hasPermission({
		headers: request.headers,
		body: {
			permissions: {
				member: ['create'],
			}
		}
	})
	const member_delete = await auth.api.hasPermission({
		headers: request.headers,
		body: {
			permissions: {
				member: ['delete'],
			}
		}
	})
	const member_update = await auth.api.hasPermission({
		headers: request.headers,
		body: {
			permissions: {
				member: ['update'],
			}
		}
	})
	const invitation_create = await auth.api.hasPermission({
		headers: request.headers,
		body: {
			permissions: {
				invitation: ['create'],
			}
		}
	})
	const invitation_cancel = await auth.api.hasPermission({
		headers: request.headers,
		body: {
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
