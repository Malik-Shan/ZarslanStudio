<script lang='ts'>
   import type { LayoutProps } from "./$types";
   import { getOrganizationManager } from "#lib/store/organization/manager.svelte.ts";
   // import { untrack } from "svelte";
   // import { afterNavigate } from "$app/navigation";

   let {children, data}: LayoutProps = $props();
   const orgManager = getOrganizationManager();
   $effect(() => {
      orgManager.setActiveOrganization(data.organization);
      console.log("data org changed so i ran")
   })
</script>

{@render children?.()}
