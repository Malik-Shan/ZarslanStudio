import type { LayoutServerLoad } from "./$types";

export const load:LayoutServerLoad = async ({request}) => {
   const referer = request.headers.get('referer');
   return {returnTo: referer ? (new URL(referer)).pathname : null};
}
