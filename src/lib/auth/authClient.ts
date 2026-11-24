import { createAuthClient } from 'better-auth/svelte';
import {adminClient, organizationClient, lastLoginMethodClient} from 'better-auth/client/plugins';
import { roles, ac } from './permissions';

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
			roles
        }),
        lastLoginMethodClient()
    ]
});

export { authClient };
