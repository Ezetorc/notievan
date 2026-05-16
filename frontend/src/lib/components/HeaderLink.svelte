<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href: HTMLAnchorElement['href'];
		target?: HTMLAnchorElement['target'];
		ariaLabel?: HTMLAnchorElement['ariaLabel'];
		class?: string;
		children: Snippet;
	}

	const { href, target, ariaLabel, class: className, children }: Props = $props();
</script>

<a
	class={`cursor-pointer transition-transform hover:-translate-y-0.5 mobile:text-[25px] desktop:text-2xl ${className}`}
	aria-label={ariaLabel}
	{href}
	{target}
>
	{@render children()}
</a>
