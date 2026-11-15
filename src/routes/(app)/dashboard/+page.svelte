<svelte:head>
	<title>Dashboard</title>
</svelte:head>
<script lang='ts'>
	import BuildingComplexPlusIcon from '@lucide/svelte/icons/building-complex-plus'
	import Button from '#lib/components/ui/button/button.svelte';
	import { getOrgCreationFormStatus } from '#lib/store/org-creation-form.svelte.ts';

	let formstatus = getOrgCreationFormStatus();
</script>

<div class='w-full h-full flex justify-center items-center'>
	<Button onclick={() => {
		formstatus.open();
		console.log("click")
	}} variant="ghost" >
		<BuildingComplexPlusIcon />	
	</Button>
</div>
