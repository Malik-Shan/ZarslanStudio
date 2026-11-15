<script lang="ts">
	import type { Component, Snippet } from "svelte";
	import type { RouteId } from "$app/types";
	type BreadCrumb = {
		href: string,
		name: string | null,
		component: Component | null,
		next: boolean
	}

	import * as Sidebar from "#lib/components/ui/sidebar/index.js";
	import * as Breadcrumb from '#lib/components/ui/breadcrumb/index.js';

	import AppSidebar from "#lib/components/app/sidebar/app-sidebar.svelte";
	// import SectionCards from "#lib/components/section-cards.svelte";
	import SiteHeader from "#lib/components/site-header.svelte";
	import OrgSwitcher from "#lib/components/app/org/OrgSwitcher.svelte";
	import { page } from "$app/state";
	import { getOrganizationManager } from "#lib/store/organization/manager.svelte.ts";
	 // import DataTable from "#lib/components/data-table.svelte";

	 // import data from '#lib/components/tabledata.ts';

	let {children, SidebarNav, headerLogoHref} : 
	{children?: Snippet, SidebarNav?: Snippet, headerLogoHref?: RouteId} = $props();


	 let breadcrumb = $derived.by<Array<BreadCrumb>>(() => {

		let activeOrg = getOrganizationManager().activeOrganization;
		let paths = page.url.pathname.split("/")

		 let data:Array<BreadCrumb> = [];

		 for(let i=2;i<paths.length;i++){

			let isActiveOrg:boolean = activeOrg?.slug === paths[i];
			let jointPaths:string = paths.slice(0, i + 1).join("/");


			 data.push({
				href: jointPaths,
				name: !isActiveOrg ? paths[i] : null,
				component: isActiveOrg ? OrgSwitcher : null,
				next: i + 1 < paths.length
			 })
		 }

		return data;

	 })

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
			<Breadcrumb.Root>
				<Breadcrumb.List>

					{#each breadcrumb as bc (bc.href)}
						<Breadcrumb.Item>
							{#if bc.component}
								<bc.component />
							{:else if bc.name}
								<Breadcrumb.Link href={bc.href} class='capitalize'>
									{bc.name}
								</Breadcrumb.Link>
							{/if}
						</Breadcrumb.Item>

						{#if bc.next}
							<Breadcrumb.Separator />
						{/if}

					{/each}

				</Breadcrumb.List>
			</Breadcrumb.Root>
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
