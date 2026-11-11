
<script lang="ts">
	import * as Dialog from "#lib/components/ui/dialog/index.js";
	import * as Field from "#lib/components/ui/field/index.js";

	import { Button } from "#lib/components/ui/button/index.js";
	import { buttonVariants } from "#lib/components/ui/button/index.js";
	import { Input } from "#lib/components/ui/input/index.js";
    import {authClient} from '#lib/auth/authClient.js';
    import { slugify } from "#lib";
    import { toast } from "svelte-sonner";
    import Spinner from "#lib/components/ui/spinner/spinner.svelte";

    type OrganizationData = Omit<Parameters<typeof authClient.organization.create>[0], "fetchOptions">

    let organizationData = $state<OrganizationData>({
        name: "",
        slug: "",
        logo: null,
        metadata: {},
        keepCurrentActiveOrganization: false
    })

	let {
		open = $bindable(false)
	}: {
		open: boolean;
	} = $props();

    function resetForm(){
        organizationData = {
            name: "",
            slug: "",
            logo: null,
            metadata: {},
            keepCurrentActiveOrganization: false
        };
        open = false;
        isLoading = false;
    }

    let isLoading = $state<boolean>(false);

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
        if(organizationData.name.trim().length === 0 || slugify(organizationData.slug.trim()).length === 0) return;

        isLoading = true;

        const { error: slugError} = await authClient.organization.checkSlug({slug: organizationData.slug});

        if(slugError) {
            isLoading = false;
            toast.error(slugError.message || "Failed to verify the slug");
            return;
        };

        let {error: orgError} = await authClient.organization.create(organizationData);
        if(orgError) {
            isLoading = false;
            toast.error(orgError.message || "Failed to create the organization")
            return;
        };

        toast.success("Organization created successfully.")
        resetForm();
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="sm:max-w-sm">
		<form onsubmit={handleSubmit}>
			<Dialog.Header class='mb-2'>
				<Dialog.Title>Create Organization</Dialog.Title>
				<Dialog.Description>
					Create a new organization for your workspace.
				</Dialog.Description>
			</Dialog.Header>

            <Field.Field class='mb-4'>
                <Input
                    id="org-name"
                    name="name"
                    bind:value={organizationData.name}
                    oninput={() => organizationData.slug = slugify(organizationData.name)}
                    placeholder="Organization Name"
                    required
                />
                <Field.Description class='text-xs'>Slug: {organizationData.slug}</Field.Description>
            </Field.Field>


			<Dialog.Footer>
				<Dialog.Close
					type="button"
					class={buttonVariants({ variant: "outline" })}
                    onclick={resetForm}
				>
					Cancel
				</Dialog.Close>

				<Button type="submit" disabled={organizationData.name.trim().length === 0 || isLoading}>
                    {#if isLoading}
                        <Spinner />	
                    {/if}
                    Create Organization
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
