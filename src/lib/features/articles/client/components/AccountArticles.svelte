<script lang="ts">
import type { ArticlePreviewOut } from 'articles/models/article-preview-out.model'
import FieldsGroup from 'client/components/FieldsGroup.svelte'
import LoadingSpinner from 'client/components/LoadingSpinner.svelte'
import { HttpService } from 'client/services/http.service'
import { observe } from 'client/utilities/observe.utility'
import type { PaginatedResult } from 'shared/models/paginated-result.model'
import { SvelteURLSearchParams } from 'svelte/reactivity'
import Articles from './Articles.svelte'

const {
	initialArticles,
	initialCursor
}: { initialArticles: ArticlePreviewOut[]; initialCursor: string | null } =
	$props()

let articles = $derived(initialArticles)
let cursor = $derived<string | null>(initialCursor)
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
		url: `/api/articles/own?${search}`
	})

	articles = [...articles, ...response.data]
	cursor = response.nextCursor
	hasMore = Boolean(cursor)
	loading = false
}
</script>

<FieldsGroup name="Tus artículos">
    <Articles {articles} />

    {#if hasMore}
        <div class="flex w-full justify-center">
            <LoadingSpinner attach={(element) => observe(element, loadMore)} />
        </div>
    {/if}
</FieldsGroup>
