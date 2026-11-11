<script lang='ts'>
    import {page} from '$app/state'
</script>

<h1>Organization Not Found</h1>
<h2>{page.error?.message}</h2>
<h2>{page.error}</h2>