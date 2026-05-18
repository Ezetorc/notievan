import type { ArticlePreviewOut } from 'shared/dtos/out/article-preview-out.dto'
import type { PaginatedResult } from 'shared/models/paginated-result.model'
import { ServerApiService } from '$lib/services/server-api.service'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const search = new URLSearchParams()

	search.set('limit', '3')

	const response = await ServerApiService.get<
		PaginatedResult<ArticlePreviewOut>
	>({
		url: `/articles?${search}`
	})

	return {
		initialArticles: response.data,
		initialCursor: response.nextCursor
	}
}
