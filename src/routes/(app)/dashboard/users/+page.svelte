
<script lang="ts">
	import {
		Search,
		SlidersHorizontal,
		MoreHorizontal,
		Plus,
		Trash2,
		Shield,
		Users,
		ChevronLeft,
		ChevronRight,
		ArrowUpDown,
		Download,
		Mail,
		ShieldCheck,
		UserRound,
		Pencil,
	} from '@lucide/svelte';

	import * as Avatar from '#lib/components/ui/avatar/index.ts';
	import { Badge } from '#lib/components/ui/badge/index.ts';
	import { Button } from '#lib/components/ui/button/index.ts';
	import { Input } from '#lib/components/ui/input/index.ts';
	import * as DropdownMenu from '#lib/components/ui/dropdown-menu/index.ts';
	import * as Table from '#lib/components/ui/table/index.ts';
	import * as Checkbox from '#lib/components/ui/checkbox/index.ts';
	import { Separator } from '#lib/components/ui/separator/index.ts';

	const users = [
		{
			id: '1',
			name: 'Arslan Akbar',
			email: 'arslan@example.com',
			role: 'admin',
			image: '',
			joined: 'Nov 01, 2026'
		},
		{
			id: '2',
			name: 'Zarmeena Kamal',
			email: 'zarmeena@example.com',
			role: 'user',
			image: '',
			joined: 'Oct 28, 2026'
		},
		{
			id: '3',
			name: 'John Williams',
			email: 'john@example.com',
			role: 'user',
			image: '',
			joined: 'Oct 25, 2026'
		},
		{
			id: '4',
			name: 'Sarah Miller',
			email: 'sarah@example.com',
			role: 'admin',
			image: '',
			joined: 'Oct 20, 2026'
		},
		{
			id: '5',
			name: 'Michael Scott',
			email: 'michael@example.com',
			role: 'user',
			image: '',
			joined: 'Oct 18, 2026'
		}
	];

	const totalUsers = 128;
	const currentPage = 1;
	const totalPages = 13;
</script>

<div class="space-y-6">

	<!-- Heading -->
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div class="space-y-1">
			<h1 class="text-2xl font-semibold tracking-tight">Users</h1>
			<p class="text-sm text-muted-foreground">
				Manage users, roles and account access.
			</p>
		</div>

		<Button>
			<Plus class="mr-2 size-4" />
			Add user
		</Button>
	</div>

	<!-- Stats -->
	<div class="grid gap-4 sm:grid-cols-3">
		<div class="rounded-xl border p-4 space-y-2">
			<div class="flex items-center justify-between">
				<p class="text-sm text-muted-foreground">Total users</p>
				<Users class="size-4 text-muted-foreground" />
			</div>
			<p class="text-2xl font-semibold">{totalUsers}</p>
			<p class="text-xs text-muted-foreground">Registered accounts</p>
		</div>

		<div class="rounded-xl border p-4 space-y-2">
			<div class="flex items-center justify-between">
				<p class="text-sm text-muted-foreground">Administrators</p>
				<ShieldCheck class="size-4 text-muted-foreground" />
			</div>
			<p class="text-2xl font-semibold">4</p>
			<p class="text-xs text-muted-foreground">Users with admin access</p>
		</div>

		<div class="rounded-xl border p-4 space-y-2">
			<div class="flex items-center justify-between">
				<p class="text-sm text-muted-foreground">Regular users</p>
				<UserRound class="size-4 text-muted-foreground" />
			</div>
			<p class="text-2xl font-semibold">124</p>
			<p class="text-xs text-muted-foreground">Standard accounts</p>
		</div>
	</div>

	<!-- User table container -->
	<div class="rounded-xl border">

		<!-- Table heading -->
		<div class="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h2 class="font-semibold">All users</h2>
				<p class="text-sm text-muted-foreground">
					View and manage all registered accounts.
				</p>
			</div>
		</div>

		<Separator />

		<!-- Search and filters -->
		<div class="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
			<div class="relative flex-1 sm:max-w-sm">
				<Search class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					placeholder="Search by name or email..."
					class="pl-9"
				/>
			</div>

			<div class="flex gap-2">
				<Button variant="outline" size="sm">
					<SlidersHorizontal class="mr-2 size-4" />
					Filters
				</Button>

				<Button variant="outline" size="sm">
					<Download class="mr-2 size-4" />
					Export
				</Button>
			</div>
		</div>

		<!-- Bulk actions placeholder -->
		<div class="mx-4 mb-3 flex items-center justify-between rounded-lg border bg-muted/40 p-3">
			<div class="flex items-center gap-2 text-sm">
				<Checkbox.Root />
				<span class="font-medium">Select all users</span>
			</div>

			<Button variant="destructive" size="sm">
				<Trash2 class="mr-2 size-4" />
				Delete selected
			</Button>
		</div>

		<!-- Users table -->
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-10">
						<Checkbox.Root />
					</Table.Head>
					<Table.Head>
						<button class="flex items-center gap-2 font-medium">
							User
							<ArrowUpDown class="size-3.5" />
						</button>
					</Table.Head>
					<Table.Head>Roles</Table.Head>
					<Table.Head class="hidden md:table-cell">Joined</Table.Head>
					<Table.Head class="w-12 text-right"> </Table.Head>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{#each users as user (user.id)}
					<Table.Row>
						<Table.Cell>
							<Checkbox.Root />
						</Table.Cell>

						<Table.Cell>
							<div class="flex items-center gap-3">
								<Avatar.Root class="size-9">
									<Avatar.Fallback>
										{user.name.split(' ').map(n => n[0]).join('')}
									</Avatar.Fallback>
								</Avatar.Root>

								<div class="min-w-0 space-y-0.5">
									<p class="truncate font-medium">{user.name}</p>
									<p class="flex items-center gap-1 text-xs text-muted-foreground">
										<Mail class="size-3" />
										{user.email}
									</p>
								</div>
							</div>
						</Table.Cell>

						<Table.Cell>
							<div class="flex flex-wrap items-center gap-1.5">
								{#each user.role.split(',') as role (role)}
									<Badge variant={role === 'admin' ? 'default' : 'secondary'}>
										{role}
									</Badge>
								{/each}

								<!-- Role editor trigger -->
								<Button variant="ghost" size="icon" class="size-7">
									<Plus class="size-3.5" />
								</Button>
							</div>
						</Table.Cell>

						<Table.Cell class="hidden text-muted-foreground md:table-cell">
							{user.joined}
						</Table.Cell>

						<Table.Cell class="text-right">
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									<Button variant="ghost" size="icon">
										<MoreHorizontal class="size-4" />
									</Button>
								</DropdownMenu.Trigger>

								<DropdownMenu.Content align="end" class='w-48'>
									<DropdownMenu.Item>
										<Pencil class="mr-2 size-4" />
										Edit user
									</DropdownMenu.Item>

									<DropdownMenu.Item>
										<Shield class="mr-2 size-4" />
										Manage roles
									</DropdownMenu.Item>

									<DropdownMenu.Separator />

									<DropdownMenu.Item class="text-destructive focus:text-destructive">
										<Trash2 class="mr-2 size-4" />
										Delete user
									</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>

		<Separator />

		<!-- Pagination -->
		<div class="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
			<p class="text-sm text-muted-foreground">
				Showing <span class="font-medium text-foreground">1–10</span>
				of <span class="font-medium text-foreground">{totalUsers}</span> users
			</p>

			<div class="flex items-center gap-2">
				<Button variant="outline" size="sm" disabled>
					<ChevronLeft class="mr-1 size-4" />
					Previous
				</Button>

				<span class="text-sm text-muted-foreground">
					Page {currentPage} of {totalPages}
				</span>

				<Button variant="outline" size="sm">
					Next
					<ChevronRight class="ml-1 size-4" />
				</Button>
			</div>
		</div>
	</div>
</div>
