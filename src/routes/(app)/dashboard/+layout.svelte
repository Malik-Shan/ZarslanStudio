<script lang='ts'>
    import DashboardLayout from "#lib/layout/app/DashboardLayout.svelte";
    import type { LayoutProps } from "../$types";
    // import MainNav from '#lib/components/nav-main.svelte';

    // import {data} from '#lib/components/data.ts';
    let {children} : LayoutProps = $props();

</script>

<DashboardLayout orgSwitcher={true}>
    {@render children?.()}
</DashboardLayout>