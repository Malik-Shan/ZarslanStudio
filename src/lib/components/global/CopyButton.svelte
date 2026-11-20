<script lang='ts'>
    import { toast } from "svelte-sonner";
    import Button from "../ui/button/button.svelte";
    import Copy from "@lucide/svelte/icons/copy";
    import Check from "@lucide/svelte/icons/check";
    import type { Snippet } from "svelte";
    import type { ButtonProps } from "../ui/button/button.svelte";

    let copied = $state<boolean>(false);

    let {value = $bindable(), children,class: className,variant = 'ghost',...restProps} : {value: string, children?: Snippet} & ButtonProps = $props();

    async function copyText() {
       try{
          copied = true;
          await navigator.clipboard.writeText(value)
          setTimeout(() => (copied = false), 2000)
       } catch(err) {
          toast.error('Failed to copy to the clipboard.')
          console.error("Failed to copy: ", err);
       }
    }
</script>

<Button {variant} 
   {...restProps} 
   class='w-max cursor-pointer {className}' 
   onclick={copyText}>
   {#if copied}
      Copied
      <Check class='text-green-500' />
   {:else}
      {@render children?.()}
      <Copy />
   {/if}
</Button>
