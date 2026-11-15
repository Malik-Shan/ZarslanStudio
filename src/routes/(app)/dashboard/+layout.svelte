<script lang='ts'>
    import DashboardLayout from "#lib/layout/app/DashboardLayout.svelte";
    import {authClient} from '#lib/auth/authClient.js';
    import {OrganizationManager, setOrganizationManager} from "#lib/store/organization/manager.svelte.js";
	import CreateOrgForm from "#lib/components/app/org/CreateOrgForm.svelte";
    import type { LayoutProps } from "../$types";
    import {page} from '$app/state'
    import { OrgCreationFormStatus, setOrgCreationFormStatus } from "#lib/store/org-creation-form.svelte.ts";
    // import MainNav from '#lib/components/nav-main.svelte';

    // import {data} from '#lib/components/data.ts';
    let {children} : LayoutProps = $props();

    const organizationQuery = authClient.useListOrganizations();

    const organizationManager = new OrganizationManager(
        () => page.data.organization ?? null,
        () => $organizationQuery.data ?? null
    );

    setOrgCreationFormStatus(new OrgCreationFormStatus);
    setOrganizationManager(organizationManager);

</script>

<DashboardLayout>
    {@render children?.()}
    <CreateOrgForm />
</DashboardLayout>
