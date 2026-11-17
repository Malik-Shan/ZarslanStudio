import { createAuthClient } from 'better-auth/svelte';
import {adminClient, organizationClient, lastLoginMethodClient} from 'better-auth/client/plugins';
import {ac, admin, owner, member, scripter} from './permissions.js';

const authClient = createAuthClient({
    sessionOptions:{
        refetchInterval:0,
        refetchOnWindowFocus:false,
        refetchWhenOffline:false
    },
    advanced: {
        cookieOptions: {
            sameSite: "none",
            secure: true,
        }
    },
    plugins: [
        adminClient(),
        organizationClient({
			ac,
			roles: {
				owner,
				admin,
				member,
				scripter
			}
        }),
        lastLoginMethodClient()
    ]
});

export { authClient };
