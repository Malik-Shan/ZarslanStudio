import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { isSafeReturnUrl } from '#lib';

export const load: PageServerLoad = async ({ url, locals }) => {
	const returnTo = url.searchParams.get('returnTo');
	const safeReturnTo = isSafeReturnUrl(returnTo) ? returnTo : "/dashboard";
	
	if(locals.session){
		redirect(302, safeReturnTo);
	}

	return {
		returnTo: safeReturnTo
	};
};

