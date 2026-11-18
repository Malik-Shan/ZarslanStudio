<script lang='ts'>
	// import * as Tabs from '#lib/components/ui/tabs/index.js';
	import * as Card from '#lib/components/ui/card/index.js';
	import * as Avatar from '#lib/components/ui/avatar/index.js';
	// import * as Table from '#lib/components/ui/table/index.js';
	import Input from '#lib/components/ui/input/input.svelte';
	import Button from '#lib/components/ui/button/button.svelte';
	import { getOrganizationManager } from '#lib/store/organization/manager.svelte.ts';
	import { authClient } from '#lib/auth/authClient.ts';
    import { toast } from 'svelte-sonner';
    import { Trash } from '@lucide/svelte';

	const orgManager = getOrganizationManager()

	// function canDeleteOrg(){
	// 	return authClient.organization.hasPermission({
	// 		permissions: {
	// 			organization: ['delete']
	// 		},
	// 		organizationId: 
	// 	})
	// }
</script>
<section class='max-w-250 w-full px-4 mx-auto grid gap-4'>
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
		<!-- <Card.Footer> -->
		<!--     <Button class='ms-auto px-5'>Save</Button> -->
		<!-- </Card.Footer> -->

	</Card.Root>

	<div class='flex flex-col gap-1.5'>
		{#each orgManager.organizations as org (org.id)}
			<div class='flex w-full justify-between items-center hover:bg-muted/50 px-1.5 py-1 rounded-md'>
				<div class='flex w-0 flex-1 flex-nowrap items-center gap-2'>
					<Avatar.Root size='sm' >
						<Avatar.Image src={org.logo}/>
						<Avatar.Fallback>ZS</Avatar.Fallback>
					</Avatar.Root>
					<h4 class='text-sm truncate'>{org.name}</h4>
				</div>
				<Button variant='outline' size='sm' class='mr-2 cursor-pointer'>Manage</Button>
				{#await authClient.organization.hasPermission({
					organizationId: org.id,
					permissions: {
						organization: ['delete']
					}
				})}
					<Button size='sm' variant='secondary'>Loading</Button>
					{:then res}
					{@const canDelete = res.data?.success || false}
					{#if canDelete }
						<Button size='sm' class='cursor-pointer shrink-0' variant='destructive' onclick={async() => {
							await authClient.organization.delete({organizationId: org.id})
							.then((res) => {
								if(res.error) throw new Error(res.error?.message || "Something went wrong while deleting the orgazniation.")
								toast.success(`${res.data.name} organization delete successfully.`);
							})
							.catch((err) => {
								toast.error(err.message || "Couldn't delete the organization.")
							})
						}}>
							<Trash />
							Delete	
						</Button>
					{:else if !canDelete}
						<Button size='sm' class='cursor-pointer' variant='destructive' onclick={async() => {
							await authClient.organization.leave({organizationId: org.id})
							.then((res) => {
								if(res.error) throw new Error(res.error?.message || "Something went wrong while leaving the orgazniation.")
								toast.success("Left organization success. ");
							})
							.catch((err) => {
								toast.error(err.message || "Couldn't leave the organization.")
							})
						}}>Leave</Button>
					{/if}
					{:catch}
					<p>Error</p>
				{/await}
			</div>
		{/each}
	</div>

</section>
