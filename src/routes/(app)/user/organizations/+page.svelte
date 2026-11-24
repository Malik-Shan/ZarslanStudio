<script lang='ts'>
	import type {PageProps} from './$types';

	import * as Card from '#lib/components/ui/card/index.js';
	import * as Avatar from '#lib/components/ui/avatar/index.js';
	import Input from '#lib/components/ui/input/input.svelte';
	import Button from '#lib/components/ui/button/button.svelte';
	import Spinner from '#lib/components/ui/spinner/spinner.svelte';
	import { Trash } from '@lucide/svelte';

	import { toast } from 'svelte-sonner';
	import { authClient } from '#lib/auth/authClient.ts';
	import { checkOrgPermissions } from '#lib/authorization/organization.ts';
	import { untrack } from 'svelte';

	const {data}: PageProps = $props();

	let userOrganizations = $state(untrack(() => data.userOrganizations));
	let spinnerState = $state<{
		organizationId: string | null,
		state: boolean
	}>({
		organizationId: null,
		state: false
	})

	function resetSpinnerState(){
		spinnerState.organizationId = null;
		spinnerState.state = false;
	};

	function removeOrg(id: string){
		if(!userOrganizations) return;
		userOrganizations = userOrganizations.filter((org) => org.organizationId !== id);
	};
</script>

<svelte:head>
   <title>User - Organizations</title>
</svelte:head>

<section class=' grid gap-4'>
	<h1 class='text-2xl font-bold'>Organization Setting</h1>

	<Card.Root>
		<Card.Header>
			<Card.Title>Organization Info</Card.Title>
			<Card.Description class='truncate'>Change information about your organization.</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class='flex flex-row gap-8'>
				<Input type="text" />

				<Avatar.Root class='w-30! h-30! after:rounded-md!'>
					<Avatar.Image class='rounded-md!' src="" />
					<Avatar.Fallback class='rounded-md!' >ZS</Avatar.Fallback>
				</Avatar.Root>

			</div>
		</Card.Content>

	</Card.Root>

	<div class='flex flex-col gap-1.5'>
		{#each userOrganizations as userOrg (userOrg.organizationId)}
			<div class='flex w-full justify-between items-center hover:bg-muted/50 px-1.5 py-1 rounded-md'>
				<div class='flex w-0 flex-1 flex-nowrap items-center gap-2'>
					<Avatar.Root size='sm' >
						<Avatar.Image src={userOrg.organization.logo}/>
						<Avatar.Fallback>ZS</Avatar.Fallback>
					</Avatar.Root>
					<h4 class='text-sm truncate'>{userOrg.organization.name}</h4>
				</div>
				<Button variant='outline' size='sm' class='mr-2 cursor-pointer'>Manage</Button>
					{const canDelete = checkOrgPermissions({role: userOrg.role, permissions: {organization: ['delete']}})}
					{#if canDelete }
						<Button size='sm' class='cursor-pointer shrink-0' variant='destructive' onclick={async() => {

							spinnerState.organizationId = userOrg.organizationId;
							spinnerState.state = true;

							await authClient.organization.delete({organizationId: userOrg.organization.id})
							.then((res) => {
								if(res.error) throw new Error(res.error?.message || "Something went wrong while deleting the orgazniation.")
								removeOrg(userOrg.organizationId)
								toast.success(`${res.data.name} organization delete successfully.`);
							})
							.catch((err) => {
								toast.error(err.message || "Couldn't delete the organization.")
							})
							.finally(() => resetSpinnerState())
						}}>
						{#if spinnerState.organizationId === userOrg.organizationId && spinnerState.state}
							<Spinner />
						{:else}
							<Trash />
						{/if}
							Delete	
						</Button>
					{:else if !canDelete}
						<Button size='sm' class='cursor-pointer' variant='destructive' onclick={async() => {

							spinnerState.organizationId = userOrg.organizationId;
							spinnerState.state = true;

							await authClient.organization.leave({organizationId: userOrg.organization.id})
							.then((res) => {
								if(res.error) throw new Error(res.error?.message || "Something went wrong while leaving the orgazniation.")
								removeOrg(userOrg.organizationId);
								toast.success("Left organization success. ");
							})
							.catch((err) => {
								toast.error(err.message || "Couldn't leave the organization.")
							})
							.finally(() => resetSpinnerState())
						}}>
						{#if spinnerState.organizationId === userOrg.organizationId && spinnerState.state}
							<Spinner />
						{/if}
							Leave
						</Button>
					{/if}
			</div>
		{/each}
	</div>

</section>
