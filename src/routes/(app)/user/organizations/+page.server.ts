import type {PageServerLoad} from './$types';

export const load:PageServerLoad = async({locals}) => {
   if(!locals.user || !locals.session) return;

   const {user} = locals;

   const userOrganizations = await locals.db.query.member.findMany({
      where: {
         userId: user.id,
      },
      with: {
         organization: true
      }
   })

   return {userOrganizations};
};
