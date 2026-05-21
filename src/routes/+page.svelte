<script lang="ts">
import { SvelteURLSearchParams } from 'svelte/reactivity'

import type { PageData } from './$types'
import Article from 'articles/client/components/Article.svelte'
import Articles from 'articles/client/components/Articles.svelte'
import type { ArticlePreviewOut } from 'articles/models/article-preview-out.model'
import Hero from 'client/components/Hero.svelte'
import LoadingSpinner from 'client/components/LoadingSpinner.svelte'
import { HttpService } from 'client/services/http.service'
import { observe } from 'client/utilities/observe.utility'
import type { PaginatedResult } from 'shared/models/paginated-result.model'
import Page from 'client/components/Page.svelte'

const { data }: { data: PageData } = $props()

let articles = $derived<ArticlePreviewOut[]>(data.initialArticles)
let cursor = $derived<string | null>(data.initialCursor)
let loading = $state(false)
let hasMore = $derived(Boolean(cursor))

async function loadMore() {
	if (!hasMore || loading) return

	loading = true

	const search = new SvelteURLSearchParams()

	if (cursor) {
		search.set('cursor', cursor)
	}

	search.set('limit', '4')

	const response = await HttpService.get<PaginatedResult<ArticlePreviewOut>>({
		url: `/api/articles?${search}`
	})

	articles = [...articles, ...response.data]
	cursor = response.nextCursor
	hasMore = Boolean(cursor)
	loading = false
}
</script>

<Page>
    <Hero
        title="NotiEvan"
        description="Descubrí lo que está pasando en el Evan"
    />

    <main
        class="grid w-full grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4"
    >
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
