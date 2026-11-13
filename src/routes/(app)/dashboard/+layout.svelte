<script lang='ts'>
    import DashboardLayout from "#lib/layout/app/DashboardLayout.svelte";
    import {authClient} from '#lib/auth/authClient.js';
    import {OrganizationManager, setOrganizationManager} from "#lib/store/organization/manager.svelte.js";
    import type { LayoutProps } from "../$types";
    import {page} from '$app/state'
    // import MainNav from '#lib/components/nav-main.svelte';

    // import {data} from '#lib/components/data.ts';
    let {children} : LayoutProps = $props();
    let d = page.data.organization ?? null;
    console.log(d);

    const organizationQuery = authClient.useListOrganizations();

    const organizationManager = new OrganizationManager(
        () => page.data.organization ?? null,
        () => $organizationQuery.data ?? null
    );

    setOrganizationManager(organizationManager);

</script>

<DashboardLayout orgSwitcher={true}>
    {@render children?.()}
</DashboardLayout>