<script lang="ts">
	import * as Sidebar from "#lib/components/ui/sidebar/index.js";
    import { resolve } from "$app/paths";
    import type { RouteId } from "$app/types";
	import type { Component } from "svelte";

	let {
		items,
	}: { items: { title: string; url: RouteId; icon: Component }[] }= $props();
</script>

<Sidebar.Menu>
	{#each items as item (item.title)}
		<Sidebar.MenuItem>
			<Sidebar.MenuButton >
				{#snippet child({ props })}
					<a href={resolve(item.url)} {...props}>
						<item.icon />
						<span>{item.title}</span>
					</a>
				{/snippet}
			</Sidebar.MenuButton>
		</Sidebar.MenuItem>
	{/each}
</Sidebar.Menu>
