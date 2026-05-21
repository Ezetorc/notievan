<script lang="ts">
import type { Snippet } from 'svelte'
import type { HTMLButtonAttributes } from 'svelte/elements'

interface Props extends Omit<HTMLButtonAttributes, 'onclick'> {
	children: Snippet
	class?: string
	variant?: 'default' | 'danger' | 'unselected'
	loading?: boolean
	onclick?: (event: MouseEvent) => void | Promise<void>
}

const {
	children,
	class: extraClass = '',
	variant = 'default',
	onclick,
	disabled,
	type,
	loading = false,
	...rest
}: Props = $props()

let isLoading = $derived(loading)

const variants = {
	default: 'bg-brand-orange text-white hover:bg-gray-800',
	danger: 'bg-brand-red text-white hover:bg-red-900',
	unselected:
		'bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-800 border border-gray-300'
}

async function handleClick(event: MouseEvent) {
	if (!onclick || isLoading) {
		return
	}

	const result = onclick(event)

	if (result instanceof Promise) {
		isLoading = true

		try {
			await result
		} finally {
			isLoading = false
		}
	}
}
</script>

<button
	{...rest}
	type={type ?? 'button'}
	disabled={disabled || isLoading}
	onclick={handleClick}
	class={`w-fit cursor-pointer rounded-sm px-3 py-3 text-3xl transition-all
		hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-60
		${variants[variant]} ${extraClass}`}
>
	{#if isLoading}
		Cargando...
	{:else}
		{@render children()}
	{/if}
</button>
