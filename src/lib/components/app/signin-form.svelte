<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn } from "#lib/utils.js";
	import { getSignInContext } from "#lib/store/signin.svelte.js";
	import SigninCover from '#lib/assets/brand/signin-cover.jpg';

	import * as Card from "#lib/components/ui/card/index.js";
	import {
		FieldGroup,
		Field,
		FieldDescription,
	} from "#lib/components/ui/field/index.js";
    import SigninButton from "../global/SigninButton.svelte";
	
	let { class: className, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();

	let signIn = getSignInContext();

</script>

<div class={cn("flex flex-col gap-6", className)} {...restProps}>
	<Card.Root class="overflow-hidden p-0">
		<Card.Content class="grid p-0 md:grid-cols-2">
			<form class={['p-8 md:p-10', (signIn.loading || signIn.signingIn) && 'cursor-not-allowed pointer-events-none opacity-50']} >
				<FieldGroup>

					<div class="flex flex-col items-center gap-2 text-center">
						<h1 class="font-serif text-2xl font-bold">Your Creative Partner</h1>
						<p class="text-balance text-muted-foreground">Get your social media to the next level</p>
					</div>

					<Field class="flex flex-col gap-4">
						<SigninButton variant='outline' type='button' provider='google'/>
						<SigninButton variant='outline' badge={true} badgeVariant="info" disabled type='button' provider='facebook'>
							Soon
						</SigninButton>
						<SigninButton variant='outline' badge={true} badgeVariant="info" disabled type='button' provider='apple'>
							Soon
						</SigninButton>
					</Field>

					<!-- <FieldSeparator class="*:data-[slot=field-separator-content]:bg-card">
						Or continue with
					</FieldSeparator>

					<FieldGroup aria-disabled='true' class='pointer-events-none cursor-not-allowed opacity-35'>
						<Field>
							<FieldLabel for="email-{id}">Email</FieldLabel>
							<Input disabled id="email-{id}" type="email" placeholder="m@example.com" required />
						</Field>
						<Field>
							<div class="flex items-center">
								<FieldLabel for="password-{id}">Password</FieldLabel>
								<a href="##" class="ms-auto text-sm underline-offset-2 pointer-events-none cursor-not-allowed opacity-50 hover:underline">
									Forgot your password?
								</a>
							</div>
							<Input id="password-{id}" disabled type="password" required />
						</Field>
						<Field>
							<Button type="submit">Login</Button>
						</Field>

						<FieldDescription class="text-center">
							Don't have an account? <a href="##">Sign up</a>
						</FieldDescription>
					</FieldGroup>	 -->

				</FieldGroup>
			</form>
			<div class="relative isolate hidden bg-muted md:block">
				<img
					src={SigninCover}
					alt="Brand login cover."
					class="absolute inset-0 h-full w-full object-cover"
				/>
			</div>
		</Card.Content>
	</Card.Root>
	<FieldDescription class="px-6 text-center">
		By clicking continue, you agree to our <a href="##">Terms of Service</a> and
		<a href="##">Privacy Policy</a>.
	</FieldDescription>
</div>
