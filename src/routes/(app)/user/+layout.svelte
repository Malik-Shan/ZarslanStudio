<script lang='ts'>
   import type { Snippet } from "svelte";

   import {page} from "$app/state";
   import { resolve } from "$app/paths";

   import { Logout } from "#lib/store/logout.svelte.ts";

   import { ArrowLeft, LogOutIcon } from "@lucide/svelte";
   import CopyButton from '#lib/components/global/CopyButton.svelte';
   import ThemeSwitcher from "#lib/components/global/ThemeSwitcher.svelte";

   import * as Avatar from "#lib/components/ui/avatar/index.js";
   import Badge from "#lib/components/ui/badge/badge.svelte";
   import Button from "#lib/components/ui/button/button.svelte";
   import Spinner from "#lib/components/ui/spinner/spinner.svelte";
    import { getUser } from "#lib/store/user.svelte.ts";

   let {children} : {children: Snippet} = $props();

   let data:Array<{name: string, path: string}> = [
      {name: 'setting', path: '/user/setting'},
      {name: 'organizations', path: '/user/organizations'},
      {name: 'invitations', path: '/user/invitations'},
      {name: 'plan', path: '/user/plan'},
   ]

   const user = getUser();
   let logout = new Logout;

</script>

<main class='px-8 py-8 max-w-300 mx-auto overflow-y-auto'>
   <div class='flex flex-col'>
      <header class='mb-8 flex flex-row items-center justify-between'>
         <Button href={resolve('/(app)/dashboard')} variant='ghost'>
            <ArrowLeft />
            Dashboard
         </Button>
         <div class='flex flex-row gap-2'>
            <Button class='gap-3 cursor-pointer' variant='ghost' size='sm'
            onclick={() => logout.logout()}>
               {#if logout.loggingout}
                  <Spinner />
               {:else}
                  <LogOutIcon />
               {/if}
               Logout
            </Button>
            <ThemeSwitcher variant='ghost' />
         </div>
      </header>
      <div class='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-12'>
         <aside class='flex flex-col gap-8'>

            <div class='flex flex-col'>
               <Avatar.Root class='w-30! h-30! mx-auto mb-4'>
                  <Avatar.Fallback>ZS</Avatar.Fallback>
                  <Avatar.Image src={user.user?.image} />
               </Avatar.Root>
               <h3 class='text-center font-bold text-lg'>{user.user?.name}</h3>
               <h3 class='text-center text-muted-foreground text-sm truncate'>{user.user?.email}</h3>
               <CopyButton variant='ghost' class='mx-auto mt-3' bind:value={user.user!.id}>Copy UserId</CopyButton>
            </div>

            <div>
               <Badge variant='outline' class='block mx-auto'>free plan</Badge>
            </div>

         </aside>
         <section>
            <nav class='mb-4'>
               <ul class='flex flex-row gap-2 dark:bg-input/70 bg-input/60 p-2 py-1.5 rounded-md'>
                  {#each data as d (d)}
                     <li>
                        <Button class='py-0 rounded-sm! {page.url.pathname === d.path && "bg-background hover:bg-background"}' size='sm' variant='secondary' href={d.path}>{d.name}</Button>
                     </li>
                  {/each}
               </ul>
            </nav>
            {@render children?.()}
         </section>
      </div>
   </div>
</main>
