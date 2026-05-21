import { HttpService } from 'client/services/http.service'
import type { CommentOut } from 'comments/models/comment-out.dto'
import type { PaginatedResult } from 'shared/models/paginated-result.model'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params, fetch, data }) => {
	const { id } = params
	const { data: commentsData, nextCursor } = await HttpService.get<
		PaginatedResult<CommentOut>
	>({
		url: `/api/comments/article/${id}?limit=4`,
		fetch
	})

	return {
		...data,
		initialComments: commentsData,
		initialCommentsCursor: nextCursor
	}
}
