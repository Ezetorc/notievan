<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLButtonAttributes, 'onclick'> {
		children: Snippet;
		class?: string;
		variant?: 'default' | 'danger' | 'unselected';
		onclick?: (event: MouseEvent) => void | Promise<void>;
	}

	const {
		children,
		class: extraClass = '',
		variant = 'default',
		onclick,
		disabled,
		type,
		...rest
	}: Props = $props();

	let loading = $state(false);

	const variants = {
		default: 'bg-brand-orange text-white hover:bg-gray-800',
		danger: 'bg-brand-red text-white hover:bg-red-900',
		unselected:
			'bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-800 border border-gray-300'
	};

	async function handleClick(event: MouseEvent) {
		if (!onclick || loading) {
			return;
		}

		const result = onclick(event);

		if (result instanceof Promise) {
			loading = true;

			try {
				await result;
			} finally {
				loading = false;
			}
		}
	}
</script>

<button
	{...rest}
	type={type ?? 'button'}
	disabled={disabled || loading}
	onclick={handleClick}
	class={`w-fit cursor-pointer rounded-sm px-3 py-3 text-3xl transition-all
		hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-60
		${variants[variant]} ${extraClass}`}
>
	{#if loading}
		Cargando...
	{:else}
		{@render children()}
	{/if}
</button>
