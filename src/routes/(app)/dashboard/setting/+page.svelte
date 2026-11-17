<script lang='ts'>
	import * as Tabs from '#lib/components/ui/tabs/index.js';
	import * as Card from '#lib/components/ui/card/index.js';
	import * as Avatar from '#lib/components/ui/avatar/index.js';
	import * as Table from '#lib/components/ui/table/index.js';
	import Input from '#lib/components/ui/input/input.svelte';
	import Button from '#lib/components/ui/button/button.svelte';
</script>
<section class='max-w-250 w-full px-4 mx-auto grid gap-4'>
    <h1 class='text-2xl font-bold'>Organization Setting</h1>
    <Tabs.Root value='organization'>
        <Tabs.List variant="line" class='mb-5'>
            <Tabs.Trigger value='organization' class='cursor-pointer'>Organization</Tabs.Trigger>
            <Tabs.Trigger value='members' class='cursor-pointer'>Memebers</Tabs.Trigger>
            <Tabs.Trigger value='invitations' class='cursor-pointer'>Invitations</Tabs.Trigger>
        </Tabs.List>

		<!-- Organization Info Tab Here -->
		<Tabs.Content value='organization' class='grid lg:gap-8 md:gap-6 gap-4'>

			<Card.Root>
				<Card.Header>
					<Card.Title>Organization Info</Card.Title>
					<Card.Description>Change information about your organization.</Card.Description>
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

			<!-- <DangerZone bind:deleting={deletingOrg} deletingOrg={deleteOrg} /> -->
		</Tabs.Content>

		<!-- All members of the organization -->
		<Tabs.Content value='members'>

			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>User</Table.Head>
						<Table.Head>Joined at</Table.Head>
						<Table.Head>Role</Table.Head>
						<Table.Head class='text-right'>Action</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>


				</Table.Body>

				<Table.Footer class='bg-background'>
					<Table.Row class='hover:bg-background'>
						<Table.Cell colspan={4} >
							<Button variant='ghost' class='cursor-pointer w-full py-5!'>+ Invite Member</Button>
						</Table.Cell>
					</Table.Row>
				</Table.Footer>
			</Table.Root>

		</Tabs.Content>

		<!-- All invitations made within organization -->
        <Tabs.Content value='invitations'>

        </Tabs.Content>
    </Tabs.Root>

</section>
