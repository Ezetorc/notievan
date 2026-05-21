import { ArticleOut } from 'articles/models/article-out.model'
import { ArticlePreviewOut } from 'articles/models/article-preview-out.model'
import { CreateArticleSchema } from 'articles/schemas/create-article.schema'
import { ArticlesService } from 'articles/server/services/articles.service'
import { Cursor } from 'server/models/cursor.model'
import { PaginationParamsSchema } from 'server/schemas/pagination-params.schema'
import { endpoint } from 'server/utilities/endpoint.utility'
import { requireRole } from 'server/utilities/require-role.utility'
import { ARTICLE_WRITER_ROLES } from 'shared/configuration/article-writer-roles.configuration'

export const GET = endpoint(async ({ url }) => {
	const searchParams = Object.fromEntries(url.searchParams)
	const { limit, cursor } = PaginationParamsSchema.parse(searchParams)

	const decodedCursor = cursor ? Cursor.decode(cursor) : undefined
	const { data, nextCursor } = await ArticlesService.getAll(
		limit,
		decodedCursor
	)

	return Response.json({
		data: ArticlePreviewOut.fromMany(data),
		nextCursor
	})
})

export const POST = endpoint(async ({ request, locals }) => {
	requireRole(locals.user, ARTICLE_WRITER_ROLES)

	const formData = await request.formData()
	const data = CreateArticleSchema.parse(Object.entries(formData))
	const article = await ArticlesService.create(data, locals.user.id)
	const articleOut = ArticleOut.from(article)

	return Response.json(articleOut, { status: 201 })
})
