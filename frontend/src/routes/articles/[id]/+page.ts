import type { CommentOut } from 'shared/dtos/out/comment-out.dto'
import type { PaginatedResult } from 'shared/models/paginated-result.model'
import { ServerApiService } from '$lib/services/server-api.service'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ data, params }) => {
	const { id } = params
	const search = new URLSearchParams()

	search.set('limit', '3')

	const comments = await ServerApiService.get<PaginatedResult<CommentOut>>({
		url: `/comments/article/${id}?${search}`
	})

	return {
		...data,
		initialComments: comments.data,
		initialCommentsCursor: comments.nextCursor
	}
}
