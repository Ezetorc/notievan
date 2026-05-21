<script lang="ts">
import type { Snippet } from 'svelte'
import type { HTMLTextareaAttributes } from 'svelte/elements'

interface Props extends HTMLTextareaAttributes {
	name: string
	children: Snippet
}

const { name, children, ...rest }: Props = $props()
</script>

<div>
	<label for={name} class="block text-[24px] text-gray-700">
		{@render children()}
	</label>
	<textarea
		{name}
		id={name}
		required
		class="mt-1 h-64 w-full resize-none rounded-md border border-gray-300 bg-white p-4 text-gray-900 shadow-sm placeholder:text-[20px] focus:border-gray-800 focus:ring-gray-800 sm:text-base"
		{...rest}
	></textarea>
</div>
