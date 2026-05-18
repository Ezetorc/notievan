<script lang="ts">
import type { Snippet } from 'svelte'
import type { HTMLInputAttributes } from 'svelte/elements'

interface Props extends HTMLInputAttributes {
	name: string
	children: Snippet
	class?: string
}

const { name, children, class: extraClass = '', ...rest }: Props = $props()
</script>

<div>
	<label for={name} class="block text-[20px] text-gray-700">
		{@render children()}
	</label>
	<input
		{name}
		id={name}
		required
		class={`mt-1 w-full rounded-md border border-gray-300 bg-white p-4 text-[20px] text-gray-900 shadow-sm focus:border-gray-800 focus:ring-gray-800 ${extraClass}`}
		{...rest}
	/>
</div>
