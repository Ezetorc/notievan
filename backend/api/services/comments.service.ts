import { ErrorCode } from '../../../shared/src/models/error-code.model.js'
import { NotFoundError } from '../models/errors/not-found.error.js'
import { UnauthorizedError } from '../models/errors/unauthorized.error.js'
import { CommentsRepository } from '../repositories/comments.repository.js'
import { ArticlesService } from './articles.service.js'

export class CommentsService {
	static async create(content: string, articleId: string, authorId: string) {
		const articleExists = await ArticlesService.exists(articleId)

		if (!articleExists) throw new NotFoundError(ErrorCode.ARTICLE_NOT_FOUND)

		const comment = await CommentsRepository.create({
			content,
			articleId,
			authorId
		})

		return comment
	}

	static async getAllOfArticle(articleId: string, limit: number, skip: number) {
		const comments = await CommentsRepository.getAllOfArticle(
			articleId,
			limit,
			skip
		)

		return comments
	}

	static async delete(id: string, authorId: string) {
		const comment = await CommentsRepository.findById(id)

		if (!comment) throw new NotFoundError(ErrorCode.COMMENT_NOT_FOUND)

		if (authorId !== comment.authorId)
			throw new UnauthorizedError(ErrorCode.FORBIDDEN)

		return await CommentsRepository.delete(id)
	}
}
