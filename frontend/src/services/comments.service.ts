import type { CreateCommentDtoType } from '../../../shared/src/dtos/in/create-comment.dto'
import type { CommentOut } from '../../../shared/src/dtos/out/comment-out.dto'
import type { PaginatedResult } from '../../../shared/src/models/paginated-result.model'
import { HttpClient } from '../models/http-client.model'

export class CommentsService {
	private static readonly BASE = '/comments'

	static create(data: CreateCommentDtoType): Promise<CommentOut> {
		return HttpClient.post<CommentOut>(CommentsService.BASE, data)
	}

	static delete(id: string): Promise<boolean> {
		return HttpClient.delete<boolean>(`${CommentsService.BASE}/${id}`)
	}

	static getAllOfArticle({
		articleId,
		cursor,
		limit = 4
	}: {
		articleId: string
		cursor?: string
		limit?: number
	}): Promise<PaginatedResult<CommentOut>> {
		const params = new URLSearchParams()

		if (cursor) {
			params.set('cursor', cursor)
		}

		params.set('limit', String(limit))

		return HttpClient.get<PaginatedResult<CommentOut>>(
			`${CommentsService.BASE}/article/${articleId}?${params}`
		)
	}
}
