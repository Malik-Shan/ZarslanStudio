<script lang="ts">
    import type { Snippet } from "svelte";
    import type { RouteId } from "$app/types";

	import * as Sidebar from "#lib/components/ui/sidebar/index.js";

	import AppSidebar from "#lib/components/app/sidebar/app-sidebar.svelte";
	// import SectionCards from "#lib/components/section-cards.svelte";
	import SiteHeader from "#lib/components/site-header.svelte";
    import OrgSwitcher from "#lib/components/app/org/OrgSwitcher.svelte";
    // import DataTable from "#lib/components/data-table.svelte";

    // import data from '#lib/components/tabledata.ts';

    let {children, SidebarNav, headerLogoHref, orgSwitcher} : {children?: Snippet, SidebarNav?: Snippet, headerLogoHref?: RouteId, orgSwitcher?:boolean} = $props();

</script>

<Sidebar.Provider
	style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 16);"
>
	<AppSidebar variant="inset" headerLogoHref={headerLogoHref}>
    {#snippet internalSidebarNavSnippet()}
        {@render SidebarNav?.()}
    {/snippet}
	</AppSidebar>
	<Sidebar.Inset>
		<SiteHeader>
		{#if orgSwitcher}
			<OrgSwitcher />
		{/if}
		</SiteHeader>
		<div class="flex flex-1 flex-col">
			<div class="@container/main flex flex-1 flex-col gap-2">
				<div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6 lg:px-6 px-4">
					<!-- <SectionCards /> -->
					<!-- <DataTable {data} /> -->
                     {@render children?.()}
				</div>
			</div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>