import type { CommentOut } from '../../../shared/src/dtos/out/comment-out.dto'
import { HttpClient } from '../models/http-client.model'

type CreateCommentData = {
	articleId: string
	content: string
}

type GetAllOfArticleParams = {
	page?: number
	limit?: number
	articleId: string
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
		page = 1,
		limit = 4,
		articleId
	}: GetAllOfArticleParams): Promise<CommentOut[]> {
		const response = await HttpClient.get<CommentOut[]>(
			`${CommentsService.API_BASE}/article/${articleId}?page=${page}&limit=${limit}`
		)

		return response.data ?? []
	}
}
