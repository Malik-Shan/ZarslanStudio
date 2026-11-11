import { authClient } from "#lib/auth/authClient.ts";
import { createContext } from "svelte";
import { goto } from "$app/navigation";
import { toast } from "svelte-sonner";
import { resolve } from "$app/paths";

export class Logout {

    loggingout = $state<boolean>(false);
    error = $state<boolean>(false);
    success = $state<boolean>(false);

    logout = async () => {
        if(this.loggingout) return;

        this.resetState();

        this.loggingout = true;

        authClient.signOut()
        .then((res) => {
            if(!res.data?.success) throw Error('Failed logout.');

            this.success = true;
            toast.success("Logged out successfully.")

            goto(resolve('/'))
        })
        .catch((err) => {
            this.error = true;
            toast.error("Failed logout")

            throw Error(err?.message || "Failed logout.")
        })
        .finally(() => {
            this.loggingout = false;
        })
    };

    resetState = () => {
        this.loggingout = false;
        this.error = false;
        this.success = false;
    };
};

export const [getLogoutContext, setLogoutContext] = createContext<Logout>()