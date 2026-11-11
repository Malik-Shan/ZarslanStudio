<script lang='ts'>
    import DashboardLayout from "#lib/layout/app/DashboardLayout.svelte";
    import type {Snippet} from 'svelte';

    let {children} : {children:Snippet} = $props();
</script>

<DashboardLayout>
    {@render children?.()}
</DashboardLayout>