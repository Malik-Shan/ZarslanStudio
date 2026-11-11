<script lang="ts">
	import {onMount} from 'svelte'
	import SigninForm from "#lib/components/app/signin-form.svelte";
	import { SignIn, setSignInContext, getSignInContext} from '#lib/store/signin.svelte.js';
    import { untrack } from "svelte";

	import Logo from '#lib/assets/favicon/android-chrome-512x512.png';

	let {data} = $props();

	setSignInContext(new SignIn(untrack(() => data.returnTo)));
	const signIn = getSignInContext();

	onMount(() => {
		const handlePageShow = (event: PageTransitionEvent) => {
			if (event.persisted) {
				signIn.reset();
			}
		};

		window.addEventListener("pageshow", handlePageShow);

		return () => {
			window.removeEventListener("pageshow", handlePageShow);
		};
	});
</script>

<svelte:head>
	<title>
		Sign In
	</title>
</svelte:head>

<div class="flex min-h-svh flex-col items-center justify-center bg-background p-6 md:p-10">
	<div class="w-full max-w-sm md:max-w-3xl">
	<div class='flex flex-col gap-4 items-center mb-6'>
		<img class='w-15 rounded-md' src={Logo} alt='Zarslan Studio' />
		<h2 class='text-2xl'>Sign in to Zarslan Studio</h2>
	</div>
		<SigninForm />
	</div>
</div>
