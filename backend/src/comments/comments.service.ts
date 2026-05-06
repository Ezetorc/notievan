import type { Comment } from '../../../shared/src/models/comment.model.js'
import { Cursor } from '../../../shared/src/models/cursor.model.js'
import { ErrorCode } from '../../../shared/src/models/error-code.model.js'
import type { PaginatedResult } from '../../../shared/src/models/paginated-result.model.js'
import { ArticlesService } from '../articles/articles.service.js'
import { NotFoundError } from '../errors/not-found.error.js'
import { UnauthorizedError } from '../errors/unauthorized.error.js'
import type { CommentWithAuthorName } from './comment-with-author-name.model.js'
import { CommentsRepository } from './comments.repository.js'

export class CommentsService {
	static async create(
		content: string,
		articleId: string,
		authorId: string
	): Promise<CommentWithAuthorName> {
		const articleExists = await ArticlesService.exists(articleId)

		if (!articleExists) {
			throw new NotFoundError(ErrorCode.ARTICLE_NOT_FOUND)
		}

		const comment = await CommentsRepository.create({
			content,
			articleId,
			authorId
		})

		return comment
	}

	static async getAllOfArticle(
		articleId: string,
		limit: number,
		cursor?: Cursor
	): Promise<PaginatedResult<Comment & { authorName: string }>> {
		const comments = await CommentsRepository.getAllOfArticle(
			articleId,
			limit,
			cursor
		)
		const lastComment = comments[comments.length - 1]

		return {
			data: comments,
			nextCursor: Cursor.encodedFrom(lastComment)
		}
	}

	static async delete(id: string, userId: string): Promise<boolean> {
		const comment = await CommentsRepository.findById(id)

		if (!comment) {
			throw new NotFoundError(ErrorCode.COMMENT_NOT_FOUND)
		}

		if (userId !== comment.authorId) {
			throw new UnauthorizedError(ErrorCode.FORBIDDEN)
		}

		return await CommentsRepository.delete(id)
	}
}
