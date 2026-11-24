import { roles } from '#lib/auth/permissions.ts';
import { authClient } from '#lib/auth/authClient.ts';

export type OrganizationRole = keyof typeof roles
export type OrganizationPermissions = Parameters<typeof authClient.organization.checkRolePermission>[0]['permissions']

export function isRole(role: string): role is OrganizationRole {
   return role in roles;
};
export function parseRoles(role: string): OrganizationRole[] {
   return role.split(',').map((r) => r.trim()).filter(isRole);
};
export function checkOrgPermissions({role, permissions}:{role:string, permissions:OrganizationPermissions}):boolean{
   const memberRoles = parseRoles(role);
   let permission:boolean = false;
   memberRoles.forEach((r) => {
      const perm = authClient.organization.checkRolePermission({
         permissions,
         role: r
      })
      if(perm) permission = perm;
   })
   return permission;
};
