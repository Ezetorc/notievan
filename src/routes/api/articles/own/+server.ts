import { ArticlePreviewOut } from 'articles/models/article-preview-out.model'
import { ArticlesService } from 'articles/server/services/articles.service'
import { Cursor } from 'server/models/cursor.model'
import { PaginationParamsSchema } from 'server/schemas/pagination-params.schema'
import { endpoint } from 'server/utilities/endpoint.utility'
import { requireRole } from 'server/utilities/require-role.utility'

export const GET = endpoint(async ({ locals, url }) => {
	requireRole(locals.user)

	const searchParams = Object.fromEntries(url.searchParams)
	const { limit, cursor } = PaginationParamsSchema.parse(searchParams)
	const decodedCursor = cursor ? Cursor.decode(cursor) : undefined
	const { data, nextCursor } = await ArticlesService.getOwn(
		limit,
		locals.user.id,
		decodedCursor
	)

	return Response.json({
		data: ArticlePreviewOut.fromMany(data),
		nextCursor
	})
})
