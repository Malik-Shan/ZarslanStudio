
<script lang="ts">
	import { authClient } from '#lib/auth/authClient.ts';
	import type { UserWithRole } from 'better-auth/plugins';
    type Role = NonNullable<
	Parameters<typeof authClient.admin.setRole>[0]['role']>;

	// Pagination
	let currentPage = $state(1);
	const pageSize = 10;
	let offset = $derived((currentPage - 1) * pageSize);

	// Server data
	let users = $state<Record<string, UserWithRole>>({});
	let totalUsers = $state(0);

	// UI state
	let loading = $state(false);
	let errorMessage = $state('');

	// Editable form state, separate from fetched users
	let roleInputs = $state<Record<string, string>>({});

	// Derived pagination
	let totalPages = $derived(
		Math.ceil(totalUsers / pageSize)
	);

	// Fetch users whenever pagination changes
	$effect(() => {
		const limit = pageSize;
		const skip = offset;

		let cancelled = false;

		async function loadUsers() {
			loading = true;
			errorMessage = '';

			try {
				const { data, error } =
					await authClient.admin.listUsers({
						query: {
							limit,
							offset: skip
						}
					});

				if (cancelled) return;

				if (error) {
					errorMessage = 'Failed to load users.';
					return;
				}

                if(data.users){}

				users = data?.users ?? [];
				totalUsers = data?.total ?? 0;

				// Initialize editable roles without
				// overwriting existing unsaved changes.
				for (const user of users) {
					roleInputs[user.id] ??= user.role ?? 'user';
				}
			} catch (error) {
				if (!cancelled) {
					errorMessage = 'Something went wrong.';
					console.error(error);
				}
			} finally {
				if (!cancelled) {
					loading = false;
				}
			}
		}

		loadUsers();

		return () => {
			cancelled = true;
		};
	});

	// Update a particular user's roles
	async function updateUserRole(userId: string) {
		const roles = roleInputs[userId]
			.split(',')
			.map(role => role.trim())
			.filter(Boolean) as Role;

		const { error } = await authClient.admin.setRole({
			userId,
			role: roles
		});

		if (error) {
			console.error(error);
			return;
		}

		// Update displayed server data after success
		users = users.map(user =>
			user.id === userId
				? { ...user, role: roles.join(',') }
				: user
		);
	}

	function nextPage() {
		if (currentPage < totalPages) {
			currentPage++;
		}
	}

	function previousPage() {
		if (currentPage > 1) {
			currentPage--;
		}
	}
</script>

<h2>Users: {totalUsers}</h2>

{#if loading}
	<p>Loading users...</p>
{:else if errorMessage}
	<p>{errorMessage}</p>
{:else}
	{#each users as user (user.id)}
		<div class="border p-4 mb-3">
			<p>{user.name}</p>
			<p>{user.email}</p>
			<p>Current roles: {user.role}</p>

			<input
				bind:value={roleInputs[user.id]}
				placeholder="admin,user"
			/>

			<button onclick={() => updateUserRole(user.id)}>
				Update roles
			</button>
		</div>
	{/each}
{/if}

<div class="flex gap-4 items-center">
	<button
		onclick={previousPage}
		disabled={currentPage <= 1 || loading}
	>
		Previous
	</button>

	<span>Page {currentPage} of {totalPages}</span>

	<button
		onclick={nextPage}
		disabled={currentPage >= totalPages || loading}
	>
		Next
	</button>
</div>
