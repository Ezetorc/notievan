import { error } from '@sveltejs/kit'
import { CommentsRepository } from '../repositories/comments.repository'
import { ArticlesService } from 'articles/server/services/articles.service'
import { Cursor } from 'server/models/cursor.model'
import { ErrorCode } from 'shared/models/error-code.model'
import type { PaginatedResult } from 'shared/models/paginated-result.model'
import type { CommentWithAuthorName } from '../models/comment-with-author-name.model'

export class CommentsService {
	static async create(
		content: string,
		articleId: string,
		authorId: string
	): Promise<CommentWithAuthorName> {
		const articleExists = await ArticlesService.exists(articleId)

		if (!articleExists) {
			throw error(404, ErrorCode.ARTICLE_NOT_FOUND)
		}

		const comment = await CommentsRepository.create({
			content,
			articleId,
			authorId
		})

		if (!comment) {
			throw error(500, ErrorCode.UNEXPECTED_ERROR)
		}

		return comment
	}

	static async getAllOfArticle(
		articleId: string,
		limit: number,
		cursor?: string | null
	): Promise<PaginatedResult<CommentWithAuthorName>> {
		const comments = await CommentsRepository.getAllOfArticle(
			articleId,
			limit,
			cursor
		)
		const hasMore = comments.length > limit

		const sliced = hasMore ? comments.slice(0, limit) : comments

		const lastComment = sliced[sliced.length - 1]

		return {
			data: sliced,
			nextCursor: hasMore ? Cursor.encodedFrom(lastComment) : null
		}
	}

	static async delete(id: string, userId: string): Promise<boolean> {
		const comment = await CommentsRepository.findById(id)

		if (!comment) {
			throw error(404, ErrorCode.COMMENT_NOT_FOUND)
		}

		if (userId !== comment.authorId) {
			throw error(403, ErrorCode.FORBIDDEN)
		}

		return await CommentsRepository.delete(id)
	}
}
