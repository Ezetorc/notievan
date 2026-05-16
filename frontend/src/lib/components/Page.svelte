<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<main class="mx-auto w-full max-w-317.5 min-w-[320px] mobile:px-4 tablet:px-10 desktop:px-0">
	{@render children()}
</main>
