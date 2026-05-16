<script lang="ts">
	import Article from '$lib/components/Article.svelte';
	import Articles from '$lib/components/Articles.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import Page from '$lib/components/Page.svelte';
	import { observe } from '$lib/utilities/observe.utility.js';
	import type { PaginatedResult } from 'shared/models/paginated-result.model';
	import type { PageData } from './$types';
	import type { ArticlePreviewOut } from 'shared/dtos/out/article-preview-out.dto';
	import { SvelteURLSearchParams } from 'svelte/reactivity';
	import { ServerApiService } from '$lib/services/server-api.service';

	const { data }: { data: PageData } = $props();

	let articles = $derived(data.initialArticles);
	let cursor = $derived<string | null>(data.initialCursor);
	let loading = $state(false);
	let hasMore = $derived(Boolean(cursor));

	async function loadMore() {
		if (!hasMore || loading) return;

		loading = true;

		const search = new SvelteURLSearchParams();

		if (cursor) {
			search.set('cursor', cursor);
		}

		search.set('limit', '4');

		const response = await ServerApiService.get<PaginatedResult<ArticlePreviewOut>>({
			url: `/articles?${search}`
		});

		articles = [...articles, ...response.data];
		cursor = response.nextCursor;
		hasMore = Boolean(cursor);
		loading = false;
	}
</script>

<Page>
	<Hero title="NotiEvan" description="Descubrí lo que está pasando en el Evan" />

	<main class="grid w-full grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
		{#each articles.slice(0, 3) as article (article.id)}
			<Article {article} />
		{/each}
	</main>

	<Articles articles={articles.slice(3)} />

	{#if hasMore}
		<div class="flex w-full justify-center">
			<LoadingSpinner attach={(element) => observe(element, loadMore)} />
		</div>
	{/if}
</Page>
