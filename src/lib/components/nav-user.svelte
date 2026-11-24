<script lang="ts">
	import CreditCardIcon from "@lucide/svelte/icons/credit-card";
	import DotsVerticalIcon from "@lucide/svelte/icons/ellipsis-vertical";
	import LogoutIcon from "@lucide/svelte/icons/log-out";
	import NotificationIcon from "@lucide/svelte/icons/bell";
	import UserCircleIcon from "@lucide/svelte/icons/user-circle";
	
	import Spinner from "./ui/spinner/spinner.svelte";
	import Badge from "#lib/components/ui/badge/badge.svelte"
	import * as Avatar from "#lib/components/ui/avatar/index.js";
	import * as DropdownMenu from "#lib/components/ui/dropdown-menu/index.js";
	import * as Sidebar from "#lib/components/ui/sidebar/index.js";

	// import {authClient} from '#lib/auth/authClient.ts';
	import {getLogoutContext} from '#lib/store/logout.svelte.ts';
    import { getUser } from "#lib/store/user.svelte.ts";

	const sidebar = Sidebar.useSidebar();
	// const session = authClient.useSession();
	let user = getUser();
	const logout = getLogoutContext();
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						{...props}
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
					>
						<Avatar.Root class="size-8 rounded-lg">
							<Avatar.Image referrerpolicy='no-referrer' src={user.user?.image} alt={user.user?.name} />
							<Avatar.Fallback class="rounded-lg">CN</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid flex-1 text-start text-sm leading-tight">
							<span class="truncate font-medium">{user.user?.name}</span>
							<span class="truncate text-xs text-muted-foreground">
								{user.user?.email}
							</span>
						</div>
						<DotsVerticalIcon class="ms-auto size-4" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
				side={sidebar.isMobile ? "bottom" : "right"}
				align="end"
				sideOffset={4}
			>
				<DropdownMenu.Label class="p-0 font-normal">
					<div class="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
						<Avatar.Root class="size-8 rounded-lg">
							<Avatar.Image referrerpolicy='no-referrer' src={user.user?.image} alt={user.user?.name} />
							<Avatar.Fallback class="rounded-lg">ZS</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid flex-1 text-start text-sm leading-tight">
							<span class="truncate font-medium">{user.user?.name}</span>
							<span class="truncate text-xs text-muted-foreground">
								{user.user?.email}
							</span>
							<span class='mt-1.5 flex flex-row gap-1'>
								{#each user.user?.role?.split(",") as role (role)}
									<Badge variant='secondary'>{role.toLowerCase()}</Badge>
								{/each}
							</span>
						</div>
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item>
						<UserCircleIcon />
						Account
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<CreditCardIcon />
						Billing
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<NotificationIcon />
						Notifications
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Item variant='destructive' disabled={logout.loggingout} onclick={async () => {await logout.logout()}}>
					{#if logout.loggingout}
						<Spinner />
					{:else}
						<LogoutIcon />
					{/if}
					Log out
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
