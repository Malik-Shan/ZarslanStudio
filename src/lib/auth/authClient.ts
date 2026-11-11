import { createAuthClient } from 'better-auth/svelte';
import {adminClient, organizationClient, lastLoginMethodClient} from 'better-auth/client/plugins';

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
        organizationClient(),
        lastLoginMethodClient()
    ]
});

export { authClient };