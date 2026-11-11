
<script lang="ts">
	import ArrowUpDown from "@lucide/svelte/icons/arrow-up-down";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import { untrack, type Component } from "svelte";

	import * as DropdownMenu from "#lib/components/ui/dropdown-menu/index.js";
	import * as Avatar from "#lib/components/ui/avatar/index.js";
	import Button from "#lib/components/ui/button/button.svelte";

	import { authClient } from "#lib/auth/authClient.ts";
	import UserCreateOrg from "#lib/components/app/org/UserCreateOrg.svelte";

	let {
		teams
	}: {
		teams: {
			name: string;
			logo: Component;
			plan: string;
		}[];
	} = $props();

	let activeTeam = $state(untrack(() =>teams[0]));

	let createOrgOpen = $state(false);

	const organizations = authClient.useListOrganizations();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button
				{...props}
				size="lg"
				variant="ghost"
				class="data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex w-50 flex-row cursor-pointer"
			>
				<div class="flex flex-row items-center gap-2">
					<Avatar.Root class="rounded-md! after:rounded-md!">
						<Avatar.Image
							class="rounded-md!"
							src="https://imgplaceholdr.com/100x100/6366f1/ffffff/png?text=JD"
						/>
						<Avatar.Fallback class="rounded-md!">
							ZS
						</Avatar.Fallback>
					</Avatar.Root>

					<div class="grid flex-1 text-start text-sm leading-tight">
						<span class="truncate font-medium">
							{activeTeam?.name ?? "Select a team"}
						</span>
					</div>
				</div>

				<ArrowUpDown strokeWidth={3} class="ms-auto size-3.5" />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>

	<DropdownMenu.Content class="min-w-50">
		<DropdownMenu.Label class="text-xs text-muted-foreground">
			Organizations
		</DropdownMenu.Label>

		{#each $organizations.data as organization (organization.id)}
			<DropdownMenu.Item
				// onSelect={() => (activeTeam = team)}
				class="cursor-pointer gap-2 p-2"
			>
				<div class="flex size-6 items-center justify-center rounded-md border">
					<Avatar.Root size="sm" class="rounded-md! after:rounded-md!">
						<Avatar.Image
							class="rounded-md!"
							src="https://imgplaceholdr.com/100x100/6366f1/ffffff/png?text=JD"
						/>
						<Avatar.Fallback class="rounded-md!">
							ZS
						</Avatar.Fallback>
					</Avatar.Root>
				</div>

				{organization.name}

				<!-- <DropdownMenu.Shortcut>
					⌘{index + 1}
				</DropdownMenu.Shortcut> -->
			</DropdownMenu.Item>
		{/each}

		<DropdownMenu.Separator />

		<DropdownMenu.Item
			class="cursor-pointer gap-2 p-2"
			onSelect={() => (createOrgOpen = true)}
		>
			<div class="flex size-6 items-center justify-center rounded-md border bg-transparent">
				<PlusIcon class="size-4" />
			</div>

			<span class="font-medium">Create Org</span>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<UserCreateOrg bind:open={createOrgOpen} />
