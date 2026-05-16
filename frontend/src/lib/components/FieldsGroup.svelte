<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		name: string;
	}

	const { name, children }: Props = $props();
</script>

<section>
	<h2 class="mb-4 block text-3xl font-bold">{name}</h2>

	<ul class="flex flex-col gap-y-6 pl-4">
		{@render children()}
	</ul>
</section>
