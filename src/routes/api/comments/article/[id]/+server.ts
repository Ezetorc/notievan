import { CommentOut } from 'comments/models/comment-out.dto'
import { CommentsService } from 'comments/server/services/comments.service'
import { CUIDParamSchema } from 'server/schemas/cuid-param.schema'
import { PaginationParamsSchema } from 'server/schemas/pagination-params.schema'
import { endpoint } from 'server/utilities/endpoint.utility'

export const GET = endpoint(async ({ params, url }) => {
	const { id } = CUIDParamSchema.parse(params)
	const { limit, cursor } = PaginationParamsSchema.parse(
		Object.fromEntries(url.searchParams)
	)
	const { data, nextCursor } = await CommentsService.getAllOfArticle(
		id,
		limit,
		cursor
	)

	return Response.json({
		data: data.map((comment) => CommentOut.from(comment)),
		nextCursor
	})
})
