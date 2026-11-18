<script lang='ts'>
    import {page} from '$app/state'
</script>

<h1>{page.error?.status}</h1>
<h2>{page.error?.message}</h2>
<h2>{JSON.stringify(page.error)}</h2>
