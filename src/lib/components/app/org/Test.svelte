<script lang='ts'>
    import { authClient } from "#lib/auth/authClient.ts";

    let org = authClient.useListOrganizations();
</script>

{#if $org.isPending}
    <p>Loading data</p>
{:else if $org.data}
    {@const organizations = $org.data}
    {#each organizations as org (org.id)}
        <p>{org.name}</p>
    {/each}
{:else if $org.error}
    <p>Something went wrong</p>
{/if}
