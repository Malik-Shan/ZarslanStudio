<script lang='ts'>
    import type { PageProps } from "../$types";
    import {page} from '$app/state'
    import { resolve } from "$app/paths";

    let {data} : PageProps = $props();
    console.log(data);
</script>

<h1>Org: {page.params.orgSlug}</h1>
<a href={resolve('/(app)/dashboard/[orgSlug]/setting', {
    orgSlug: page.params.orgSlug!
})}>Settings</a>
<a href={resolve('/(app)/dashboard/[orgSlug]/setting', {
    orgSlug: "fakeorghere"
})}>Fake Settings page</a>
<h1>Hello bois</h1>