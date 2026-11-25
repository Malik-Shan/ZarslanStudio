import type {PageServerLoad} from './$types';

export const load:PageServerLoad = async({locals}) => {
   if(!locals.user || !locals.session) return;

   const {user} = locals;

   const userOrganizations = await locals.db.query.member.findMany({
      where: (member, {eq}) => {
         return eq(member.userId, user.id);
      },
      with: {
         organization: true
      }
   })


   return {userOrganizations};
}
