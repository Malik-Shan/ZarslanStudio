<script lang="ts">
    import {setLogoutContext, Logout} from "#lib/store/logout.svelte.js";

    let { children } = $props();

    setLogoutContext(new Logout);
</script>
{@render children()}