import { ArticlePreviewOut } from 'articles/models/article-preview-out.model'
import { ArticlesService } from 'articles/server/services/articles.service'
import { OmitIdParamSchema } from 'server/schemas/omit-id-param.schema'
import { PaginationParamsSchema } from 'server/schemas/pagination-params.schema'
import { endpoint } from 'server/utilities/endpoint.utility'

export const GET = endpoint(async ({ params, url }) => {
	const { omit } = OmitIdParamSchema.parse(params)
	const { limit } = PaginationParamsSchema.parse(
		Object.fromEntries(url.searchParams)
	)
	const articles = await ArticlesService.getRandom(limit, omit)

	return Response.json(ArticlePreviewOut.fromMany(articles))
})
