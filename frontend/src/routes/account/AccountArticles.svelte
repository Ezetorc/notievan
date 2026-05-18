<script lang="ts">
import type { ArticlePreviewOut } from 'shared/dtos/out/article-preview-out.dto'
import type { PaginatedResult } from 'shared/models/paginated-result.model'
import { SvelteURLSearchParams } from 'svelte/reactivity'
import Articles from '$lib/components/Articles.svelte'
import FieldsGroup from '$lib/components/FieldsGroup.svelte'
import LoadingSpinner from '$lib/components/LoadingSpinner.svelte'
import { ClientApiService } from '$lib/services/client-api.service'
import { observe } from '$lib/utilities/observe.utility'
import type { PageData } from './$types'

const { data }: { data: PageData } = $props()

let articles = $derived(data.initialArticles)
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

	const response = await ClientApiService.get<
		PaginatedResult<ArticlePreviewOut>
	>({
		url: `/articles/own?${search}`
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
