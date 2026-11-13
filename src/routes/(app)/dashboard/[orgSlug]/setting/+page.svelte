<script lang='ts'>
    import { authClient } from "#lib/auth/authClient.ts";
    import Button from "#lib/components/ui/button/button.svelte";
    import {Input} from "#lib/components/ui/input/index.js"
    import Spinner from "#lib/components/ui/spinner/spinner.svelte";
    import { getOrganizationManager } from '#lib/store/organization/manager.svelte.js';
    import { resolve } from "$app/paths";
    import {goto} from '$app/navigation';
    import { toast } from "svelte-sonner";

    const activeOrg = getOrganizationManager();

    let deletingOrg = $state<boolean>(false);
    let orgName = $state<string>("");
    let originalOrgName = $state<string>("");
    let updatingOrgName = $state(false);


    const name = activeOrg.activeOrganization?.name ?? "";

    orgName = name;
    originalOrgName = name;

    async function deleteOrg(){

        if(!activeOrg.activeOrganization) return;

        deletingOrg = true;

        await authClient.organization.delete({organizationId: activeOrg.activeOrganization.id})
        .then((res) => {
            if(res.error){
                throw (res.error?.message || "Failed to delete organization.")
            }
            toast.success("Organization deleted successfully" + JSON.stringify(res.data));

            goto(resolve('/(app)/dashboard'))

        })
        .catch((err) => {
            toast.error(err?.message || "Failed to delete organization.")
        })
        .finally(() => {deletingOrg = false})

    }

    async function updateOrgName() {
        const name = orgName.trim();

        // Don't submit if empty or unchanged
        if (!name || name === originalOrgName) return;

        if (!activeOrg.activeOrganization) return;

        updatingOrgName = true;

        await authClient.organization.update({
            data: { name },
            organizationId: activeOrg.activeOrganization.id
        })
        .then((res) => {

            if (res.error) {
                throw new Error(res.error.message || "Failed to update organization name.");
            }
            originalOrgName = res.data.name;

            toast.success("Organization updated successfully");
        })
        .catch((err) => {

            // Revert to previously saved value
            orgName = originalOrgName;

            toast.error(
                err instanceof Error ? err.message : "Failed to update organization name."
            );
        })
        .finally(() => {
            updatingOrgName = false;
        })


    }

</script>
<h1>Settings page</h1>

<Input
    bind:value={orgName}
    type="text"
    disabled={updatingOrgName}
    onkeydown={(e: KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            updateOrgName();
        }
    }}
/>

<Button class='cursor-pointer' variant="destructive" onclick={deleteOrg}>
    {#if deletingOrg}
        <Spinner /> 
    {/if}
    Delete Organization
</Button>