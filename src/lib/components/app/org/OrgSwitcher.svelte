<script lang="ts">
	import ArrowUpDown from "@lucide/svelte/icons/arrow-up-down";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import Check from "@lucide/svelte/icons/check";

	import * as DropdownMenu from "#lib/components/ui/dropdown-menu/index.js";
	import * as Avatar from "#lib/components/ui/avatar/index.js";
	import Button from "#lib/components/ui/button/button.svelte";

	// import { authClient } from "#lib/auth/authClient.ts";
	import { resolve } from "$app/paths";
	import { getOrganizationManager } from "#lib/store/organization/manager.svelte.js";
    import { getOrgCreationFormStatus } from "#lib/store/org-creation-form.svelte.ts";

	let formstatus = getOrgCreationFormStatus();

	// const organizations = authClient.useListOrganizations();
	// const activeOrg = $derived<Organization | null>(page.data.organization ?? null);
	const org = getOrganizationManager();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			{#if org.activeOrganization}
				{@const organization = org.activeOrganization}
				<Button
					{...props}
					size="lg"
					variant="ghost"
					class="data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex w-50 flex-row cursor-pointer"
				>
					<div class="flex flex-row items-center gap-2">
						<Avatar.Root
							size="sm"
							class="rounded-md! after:rounded-md!"
						>
							<!-- <Avatar.Image -->
							<!-- 	class="rounded-md!" -->
							<!-- 	src={!organization.logo -->
							<!-- 		? "https://api.dicebear.com/10.x/glass/svg?size=200" + -->
							<!-- 			`&seed=${organization.id}` -->
							<!-- 		: organization.logo} -->
							<!-- /> -->
							<Avatar.Image
								class="rounded-md!"
								src={organization.logo}
							/>
							<Avatar.Fallback class="rounded-md!">
								ZS
							</Avatar.Fallback>
						</Avatar.Root>
						<div
							class="grid flex-1 text-start text-sm leading-tight"
						>
							<span class="truncate font-medium">
								{organization.name}
							</span>
						</div>
					</div>

					<ArrowUpDown strokeWidth={3} class="ms-auto size-3.5" />
				</Button>
			{:else}
				<Button {...props} size="lg" variant="ghost"
					>No Org Active</Button
				>
			{/if}
		{/snippet}
	</DropdownMenu.Trigger>

	<DropdownMenu.Content class="min-w-50">
		<DropdownMenu.Label class="text-xs text-muted-foreground">
			Organizations
		</DropdownMenu.Label>

		<div class='max-h-100 overflow-y-auto'>
			{#each org.organizations.values() as organization (organization.id)}
				<DropdownMenu.Item
					// onSelect={() => (activeTeam = team)}
					class="cursor-pointer gap-2 p-1 mb-1.5"
				>
					{#snippet child({ props })}
						<a
							{...props}
							href={resolve("/(app)/dashboard/[orgSlug]", {
								orgSlug: organization.slug,
							})}
						>
							<div
								class="flex size-6 items-center justify-center rounded-md border"
							>
								<Avatar.Root
									size="sm"
									class="rounded-md! after:rounded-md!"
								>
									<!-- <Avatar.Image -->
									<!-- 	class="rounded-md!" -->
									<!-- 	src={"https://api.dicebear.com/10.x/glass/svg?size=200" + -->
									<!-- 		`&seed=${organization.id}`} -->
									<!-- /> -->
									<Avatar.Image
										class="rounded-md!"
										src={organization.logo}
									/>
									<Avatar.Fallback class="rounded-md!">
										ZS
									</Avatar.Fallback>
								</Avatar.Root>
							</div>

							<span class="truncate text-[13px]"
							>{organization.name}</span
							>
							{#if org.activeOrganization?.id === organization.id}
								<Check class="ms-auto" strokeWidth={3} />
							{/if}
						</a>
					{/snippet}
				</DropdownMenu.Item>
			{/each}
		</div>


		<DropdownMenu.Separator />

		<DropdownMenu.Item
			class="cursor-pointer p-2"
			onclick={() => (formstatus.open())}
		>
			<div
				class="flex size-5 items-center justify-center rounded-md border bg-transparent"
			>
				<PlusIcon class="size-3" />
			</div>

			<span class="text-[13px]">Create Org</span>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
