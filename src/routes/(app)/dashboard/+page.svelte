<svelte:head>
	<title>Dashboard</title>
</svelte:head>
<script lang='ts'>
	import BuildingComplexPlusIcon from '@lucide/svelte/icons/building-complex-plus'
	import Button from '#lib/components/ui/button/button.svelte';
	import { getOrgCreationFormStatus } from '#lib/store/org-creation-form.svelte.ts'

	let formstatus = getOrgCreationFormStatus();
</script>

<div class='w-full h-full flex justify-center items-center'>
	<Button class='cursor-pointer outline-dashed p-15 w-auto h-auto text-xl gap-3 text-muted-foreground [&_svg]:h-7! [&_svg]:w-7!' 
		onclick={() => {
			formstatus.open();
		}} variant="outline"
	>
		<BuildingComplexPlusIcon/>	
		<span>Create Org</span>
	</Button>
</div>
