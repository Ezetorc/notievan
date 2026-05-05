import type { CommentOut } from '../../../shared/src/dtos/out/comment-out.dto'
import type { PaginatedResult } from '../../../shared/src/models/paginated-result.model'
import { HttpClient } from '../models/http-client.model'

type CreateCommentData = {
	articleId: string
	content: string
}

type GetAllOfArticleParams = {
	articleId: string
	cursor?: string
	limit?: number
}

export class CommentsService {
	private static readonly API_BASE = '/comments'

	static async create({
		articleId,
		content
	}: CreateCommentData): Promise<CommentOut> {
		const response = await HttpClient.post<CommentOut>(
			CommentsService.API_BASE,
			{
				articleId,
				content
			}
		)

		if (response.error || !response.data) {
			throw new Error(response.error || 'Error al crear comentario')
		}

		return response.data
	}

	static async delete(id: string): Promise<boolean> {
		const response = await HttpClient.delete<{ success: boolean }>(
			`${CommentsService.API_BASE}/${id}`
		)
		return !response.error
	}

	static async getAllOfArticle({
		articleId,
		cursor,
		limit = 4
	}: GetAllOfArticleParams): Promise<PaginatedResult<CommentOut>> {
		const params = new URLSearchParams()

		if (cursor) params.append('cursor', cursor)
		params.append('limit', String(limit))

		const response = await HttpClient.get<PaginatedResult<CommentOut>>(
			`${CommentsService.API_BASE}/article/${articleId}?${params.toString()}`
		)

		if (response.error || !response.data) {
			throw new Error(response.error || 'Error al obtener comentarios')
		}

		return response.data
	}
}
