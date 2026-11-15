
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
    import { goto } from "$app/navigation";
    import { resolve } from "$app/paths";
    import { getOrgCreationFormStatus } from "#lib/store/org-creation-form.svelte.ts";

    type OrganizationData = Omit<Parameters<typeof authClient.organization.create>[0], "fetchOptions">

    let formstatus = getOrgCreationFormStatus();

    let organizationData = $state<OrganizationData>({
        name: "",
        slug: "",
        logo: null,
        metadata: {fakedata: "hello", fakenumber: 0},
        keepCurrentActiveOrganization: false
    })

    function resetForm(){
        organizationData = {
            name: "",
            slug: "",
            logo: null,
            metadata: {},
            keepCurrentActiveOrganization: false
        };
        formstatus.close();
        isLoading = false;
    }

    let isLoading = $state<boolean>(false);

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
        if(organizationData.name.trim().length === 0 || slugify(organizationData.slug.trim()).length === 0) return;

        isLoading = true;

        await authClient.organization.checkSlug({slug: organizationData.slug})
        .then(async (slugRes) => {
            if(slugRes.error){
                throw new Error(slugRes.error?.message || "Failed to verify the slug");
            };
            console.log(organizationData);

            await authClient.organization.create(organizationData)
            .then((createRes) => {
                if(createRes.error) {
                    throw new Error(createRes.error?.message || "Failed to create the organization")
                };

                goto(resolve('/(app)/dashboard/[orgSlug]',{
                    orgSlug: createRes.data.slug
                }))

                toast.success("Organization created successfully.")
                resetForm();
            })
            .catch((createErr) => {
                throw new Error(createErr?.message || "Something went wrong while creating the organization.")
            })

        })
        .catch((slugErr) => {
            console.log(slugErr)
            toast.error(slugErr?.message || "Organization creation failed while verifying slug.")
        })
        .finally(() => {
            isLoading = false;
        })

	}
</script>

<Dialog.Root bind:open={formstatus.formOpen}>
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
