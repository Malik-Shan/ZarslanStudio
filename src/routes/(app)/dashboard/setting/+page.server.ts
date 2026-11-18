import { auth } from "#lib/auth/authServer.ts";
import type { PageServerLoad } from "./$types";

export const load:PageServerLoad = async ({request,locals}) => {
	if(!locals.session || !locals.user) return;
}
