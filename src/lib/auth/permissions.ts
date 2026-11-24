import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, ownerAc, adminAc, memberAc } from "better-auth/plugins/organization/access";

const statement = {
	...defaultStatements,
	script: ['create', 'update', 'delete','share']
} as const;

export const ac = createAccessControl(statement);

export const owner = ac.newRole({
	...ownerAc.statements
})

export const admin = ac.newRole({
	...adminAc.statements
})

export const member = ac.newRole({
	...memberAc.statements
})

export const scripter = ac.newRole({
	script: ['create', 'update', 'delete', 'share']
})

export const roles = {
	owner,
	admin,
	member,
	scripter
} as const;
