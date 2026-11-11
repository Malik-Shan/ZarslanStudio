<script lang="ts">
    import type { RouteId } from "$app/types";
	import type { ComponentProps, Snippet } from "svelte";

	import * as Sidebar from "#lib/components/ui/sidebar/index.js";
	import * as Avatar from '#lib/components/ui/avatar/index.js';

	import NavDocuments from "../../nav-documents.svelte";
	import NavMain from "../../nav-main.svelte";
	import NavSecondary from "../../nav-secondary.svelte";
	import NavUser from "../../nav-user.svelte";

    import { asset } from "$app/paths";
	import {data} from '../../data.ts';
	
	let { internalSidebarNavSnippet, headerLogoHref, ...restProps }: ComponentProps<typeof Sidebar.Root> & {internalSidebarNavSnippet?: Snippet, headerLogoHref?: RouteId} = $props();

	let sidebarState = Sidebar.useSidebar();
</script>

<Sidebar.Root collapsible="icon" {...restProps}>
	<Sidebar.Header>
		<svelte:element this={headerLogoHref ? 'a' : 'div'} href={headerLogoHref} class={['flex flex-row items-center flex-nowrap overflow-hidden py-1',
		 !sidebarState.open ? 'justify-center gap-0' : 'justify-start gap-2.5']} >
			<Avatar.Root size='default'>
				<Avatar.Image src={asset('1.png')} alt='Zarslan Studio Logo' />
				<Avatar.Fallback>ZS</Avatar.Fallback>
			</Avatar.Root>
			<span class={["text-xl font-medium text-nowrap", !sidebarState.open && 'hidden']}>Zarslan Studio</span>
		</svelte:element>
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
		<NavDocuments items={data.documents} />
		{@render internalSidebarNavSnippet?.()}
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavSecondary items={data.navSecondary} />
		<NavUser />
	</Sidebar.Footer>
</Sidebar.Root>
