<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		name: string;
		close: () => void;
		class?: string;
	}

	const { children, name, close, class: extraClass = '' }: Props = $props();
</script>

<div
	role="dialog"
	class={`pointer-events-auto fixed z-50 overflow-hidden rounded-sm bg-brand-blue-soft ${extraClass}`}
>
	<header class="flex justify-between bg-brand-blue p-4 text-white">
		<h2 class="text-3xl">{name}</h2>
		<button class="cursor-pointer text-3xl" onclick={close}>X</button>
	</header>

	<main class="p-5">
		{@render children()}
	</main>
</div>
