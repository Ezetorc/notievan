import type { ArticleOut } from 'shared/dtos/out/article-out.dto'
import type { ArticlePreviewOut } from 'shared/dtos/out/article-preview-out.dto'
import { ServerApiService } from '$lib/services/server-api.service'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params
	const article = await ServerApiService.get<ArticleOut>({
		url: `/articles/${id}`
	})
	const search = new URLSearchParams()

	search.set('omit', id)
	search.set('limit', '3')

	const asideArticles = await ServerApiService.get<ArticlePreviewOut[]>({
		url: `/articles/random?${search}`
	})

	return {
		article,
		asideArticles
	}
}
