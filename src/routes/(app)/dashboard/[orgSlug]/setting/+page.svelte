<script lang='ts'>
    import { authClient } from "#lib/auth/authClient.ts";
    import { getOrganizationManager } from '#lib/store/organization/manager.svelte.js';
    import { getUser } from "#lib/store/user.svelte.ts";
    import { checkOrgPermissions } from "#lib/authorization/organization.ts";
    import {goto} from '$app/navigation';
    import { resolve } from "$app/paths";

    import {Input} from "#lib/components/ui/input/index.js"
    import DangerZone from "#lib/components/app/DangerZone.svelte";
    import Button from "#lib/components/ui/button/button.svelte";
    import { toast } from "svelte-sonner";
    import * as Tabs from '#lib/components/ui/tabs/index.js';
    import * as Card from '#lib/components/ui/card/index.js';
    import * as Table from '#lib/components/ui/table/index.js';
    import * as Avatar from '#lib/components/ui/avatar/index.js';

    import type { PageProps } from "./$types";
    type Permissions = {
        org_delete: boolean
        org_update: boolean
        member_delete: boolean
        member_update: boolean
        invitation_create: boolean
    };


    const orgManager = getOrganizationManager();
    const user = getUser();

    let orgName = $state<string>("");
    let originalOrgName = $state<string>("");
    let updatingOrgName = $state(false);
    let deletingOrg = $state<boolean>(false);

    orgName = orgManager.activeOrganization?.name ?? "";
    originalOrgName = orgManager.activeOrganization?.name ?? "";

    async function deleteOrg(){

        if(!orgManager.activeOrganization) return;

        deletingOrg = true;

        await authClient.organization.delete({organizationId: orgManager.activeOrganization.id})
        .then((res) => {
            if(res.error){
                throw (res.error?.message || "Failed to delete organization.")
            }
            toast.success("Organization deleted successfully");

            goto(resolve('/(app)/dashboard'))

        })
        .catch((err) => {
            toast.error(err?.message || "Failed to delete organization.")
        })
        .finally(() => {
            deletingOrg = false
        })

    }

    async function updateOrgName() {
        const name = orgName.trim();

        // Don't submit if empty or unchanged
        if (!name || name === originalOrgName) return;

        if (!orgManager.activeOrganization) return;

        updatingOrgName = true;

        await authClient.organization.update({
            data: { name },
            organizationId: orgManager.activeOrganization.id
        })
        .then((res) => {

            if (res.error) {
                throw new Error(res.error.message || "Failed to update organization name.");
            }
            originalOrgName = res.data.name;

            toast.success("Organization updated successfully");
        })
        .catch((err) => {

            // Revert to previously saved value
            orgName = originalOrgName;

            toast.error(
                err instanceof Error ? err.message : "Failed to update organization name."
            );
        })
        .finally(() => {
            updatingOrgName = false;
        })


    };

    let {data}: PageProps = $props();

    const userMemberInfo = $derived.by<typeof authClient.$Infer.Member>((): typeof authClient.$Infer.Member => {
        return data.fullOrganization.members.filter((member) => member.userId === user.user?.id)[0];
    });

    const orgPermissions = $derived.by<Permissions>(():Permissions => {
        return {
            org_delete : checkOrgPermissions({role: userMemberInfo.role, permissions: {organization: ['delete']}}),
            org_update : checkOrgPermissions({role: userMemberInfo.role, permissions: {organization: ['update']}}),
            member_delete : checkOrgPermissions({role: userMemberInfo.role, permissions: {member: ['delete']}}),
            member_update : checkOrgPermissions({role: userMemberInfo.role, permissions: {member: ['update']}}),
            invitation_create : checkOrgPermissions({role: userMemberInfo.role, permissions: {invitation: ['create']}}),
        }
    })

</script>

<section class='max-w-250 w-full px-4 mx-auto grid gap-4'>
    <h1 class='text-2xl font-bold'>Organization Settings</h1>
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
                        <Input
                            bind:value={orgName}
                            type="text"
                            disabled={updatingOrgName || !orgPermissions.org_update}
                            onkeydown={(e: KeyboardEvent) => {
                                if(!orgPermissions.org_update) return;
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    updateOrgName();
                                }
                            }}
                        />

                        <Avatar.Root class='w-30! h-30! after:rounded-md!'>
                            <Avatar.Image class='rounded-md!' src={orgManager.activeOrganization?.logo} />
                            <Avatar.Fallback class='rounded-md!' >ZS</Avatar.Fallback>
                        </Avatar.Root>
                        
                    </div>
                </Card.Content>
                <!-- <Card.Footer> -->
                <!--     <Button class='ms-auto px-5'>Save</Button> -->
                <!-- </Card.Footer> -->

            </Card.Root>

            <DangerZone bind:deleting={deletingOrg} deletingOrg={deleteOrg} />
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

                    {#each data.fullOrganization?.members as member (member.id)}

                        <Table.Row class=''>
                            <Table.Cell class='flex flex-row items-center gap-2'>
                                <Avatar.Root size="lg">
                                    <Avatar.Image src={member.user.image} />
                                    <Avatar.Fallback>ZS</Avatar.Fallback>
                                </Avatar.Root>
                                <div class='flex flex-col'>
                                    <span class='truncate'>{member.user.name}</span>
                                    <span class='truncate text-muted-foreground'>{member.user.email}</span>
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <div class='flex flex-col text-xs'>
                                    <span>{new Date(member.createdAt).toLocaleDateString()}</span>
                                    <span>{new Date(member.createdAt).toLocaleTimeString()}</span>
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                {member.role}
                            </Table.Cell>
                            <Table.Cell class='text-right'>
                                {#if orgPermissions.member_delete && user.user?.id !== member.userId}
                                    <Button variant='destructive'>Remove</Button>
                                {:else if user.user?.id === member.userId && member.role === "owner"}
                                    <Button disabled variant='destructive'>Leave</Button>
                                {:else}
                                    <Button variant='destructive'>Leave</Button>
                                {/if}
                            </Table.Cell>
                        </Table.Row>

                    {/each}


                </Table.Body>

                <Table.Footer class='bg-background'>
                    <Table.Row class='hover:bg-background'>
                        <Table.Cell colspan={4} >
                            {#if orgPermissions.invitation_create}
                                <Button variant='ghost' class='cursor-pointer w-full py-5!'>+ Invite Member</Button>
                            {/if}
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
