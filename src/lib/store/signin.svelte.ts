import type { SocialProvider } from "better-auth";

import { authClient } from "#lib/auth/authClient.ts";
import { toast } from "svelte-sonner";
import { createContext } from "svelte";

export class SignIn {

    readonly returnToDefault:string;

    currentProvider = $state<string | undefined>(undefined);
    loading = $state<boolean>(false);
    returnTo = $state<string | undefined>();
    signingIn = $state<boolean>(false);
    success = $state<boolean>(false);
    fail = $state<boolean>(false);

    constructor(setreturnToDefault:string = '/dashboard'){
        this.loading = true;
        this.returnToDefault = setreturnToDefault;
        this.returnTo = setreturnToDefault;
        this.loading = false;
    };

    signIn = async (provider: SocialProvider) => {
        if (this.signingIn || !provider) return;

        // First cleanup the previous attempt just in case.
        this.reset();

        this.currentProvider = provider;
        this.signingIn = true;

        try {
            const { error } = await authClient.signIn.social({
                provider,
                callbackURL: this.returnTo || this.returnToDefault
            });

            if (error) {
                throw error;
                // throw new Error(error.message || "Failed to login.");
            }

            toast.info(`Logging in using ${provider}.`);

        } catch (err) {
            console.log(err);
            this.failedReq();

            // const message = err instanceof Error
            //     ? err.message
            //     : "Failed to login.";

            // toast.error(message);
            toast.error(JSON.stringify(err))

        };
    };

    reset = () => {
        this.loading = false;
        this.signingIn = false;
        this.success = false;
        this.fail = false;
        this.currentProvider = undefined;
    };

    failedReq = () => {
        this.signingIn = false;
        this.fail = true;
        this.success = false;
    };

    successfulReq = () => {
        this.signingIn = false;
        this.fail = false;
        this.success = true;
    };
};

export const [getSignInContext, setSignInContext, hasSignInContext] = createContext<SignIn>();