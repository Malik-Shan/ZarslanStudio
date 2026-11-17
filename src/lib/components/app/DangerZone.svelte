<script lang='ts'>
	import {Trash} from '@lucide/svelte';
	import * as Card from '#lib/components/ui/card/index.js';
	 import Button from '../ui/button/button.svelte';
    import Spinner from '../ui/spinner/spinner.svelte';
	let {deleting = $bindable(false) ,deletingOrg, ...props} : {deleting: boolean,deletingOrg: () => Promise<void>} = $props();
</script>

<Card.Root {...props}>
	<Card.Header>
		<Card.Title>Danger Zone</Card.Title>
		<Card.Description>Description here for the stuff</Card.Description>
		<Card.Action>
			<Button onclick={() => deletingOrg()} class='cursor-pointer mt-auto' variant="destructive">
				{#if deleting}
					<Spinner />
				{:else}
					<Trash />
				{/if}
				Delete Organization
			</Button>
		</Card.Action>
	</Card.Header>
</Card.Root>

