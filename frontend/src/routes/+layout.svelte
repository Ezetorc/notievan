<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.webp';
	import Header from '$lib/components/Header.svelte';
	import { Modals } from 'svelte-modals';
	import { userStore } from '$lib/stores/user.store';

	let { children, data } = $props();

	$effect(() => {
		userStore.set(data.user);
	});
</script>

<svelte:head>
	<title>NotiEvan | Descubrí que está pasando en el Evan</title>
	<link rel="icon" href={favicon} />
	<meta name="description" content="Descubrí lo que está pasando en el Evan" />
	<meta property="og:url" content="https://notievan.vercel.app/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="NotiEvan" />
	<meta property="og:description" content="Descubrí lo que está pasando en el Evan" />
	<meta
		property="og:image"
		content="https://opengraph.b-cdn.net/production/images/f73db4e5-d79c-4c62-8aa6-fe2ef7f53d8b.png?token=2K9PcwuP2qhJzvfOrdJjQR5l8EAbmhRNBqQf6BAhVHo&height=630&width=1200&expires=33297683017"
	/>
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="notievan.vercel.app" />
	<meta property="twitter:url" content="https://notievan.vercel.app/" />
	<meta name="twitter:title" content="NotiEvan" />
	<meta name="twitter:description" content="Descubrí lo que está pasando en el Evan" />
	<meta
		name="twitter:image"
		content="https://opengraph.b-cdn.net/production/images/f73db4e5-d79c-4c62-8aa6-fe2ef7f53d8b.png?token=2K9PcwuP2qhJzvfOrdJjQR5l8EAbmhRNBqQf6BAhVHo&height=630&width=1200&expires=33297683017"
	/>
</svelte:head>

<div class="pointer-events-none fixed inset-0 z-30 grid place-items-center">
	<Modals>
		{#snippet backdrop()}
			<div class="absolute inset-0 bg-black/70"></div>
		{/snippet}
	</Modals>
</div>

<Header user={$userStore ?? data.user} />
{@render children()}
