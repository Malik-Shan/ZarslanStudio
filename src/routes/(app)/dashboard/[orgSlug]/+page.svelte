<script lang='ts'>
    import {page} from '$app/state'
    import { resolve } from "$app/paths";
    import Test from '#lib/components/app/org/Test.svelte';
</script>

<h1>Org: {page.params.orgSlug}</h1>
<a href={resolve('/(app)/dashboard/[orgSlug]/setting', {
    orgSlug: page.params.orgSlug!
})}>Settings</a>
<a href={resolve('/(app)/dashboard/[orgSlug]/setting', {
    orgSlug: "fakeorghere"
})}>Fake Settings page</a>
<h1>Hello bois</h1>
<Test />