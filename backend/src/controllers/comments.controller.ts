import type { Request, Response } from 'express'
import { CommentsService } from '../services/comments.service.js'
import { CreateCommentDto } from '../../../shared/src/dtos/in/create-comment.dto.js'
import { CUIDParamDto } from '../../../shared/src/dtos/in/cuuid-param.dto.js'
import { PaginationParamsDto } from '../../../shared/src/dtos/in/pagination-params.dto.js'

export class CommentsController {
	static async create(request: Request, response: Response) {
		const { content, articleId } = CreateCommentDto.parse(request.body)

		const newComment = await CommentsService.create(
			content,
			articleId,
			request.user.id
		)

		return response.status(201).json(newComment)
	}

	static async getAll(request: Request, response: Response) {
		const { id } = CUIDParamDto.parse(request.params)
		const { limit, page } = PaginationParamsDto.parse(request.query)
		const skip = (page - 1) * limit
		const comments = await CommentsService.getAllOfArticle(id, limit, skip)

		return response.json(comments)
	}

	static async delete(request: Request, response: Response) {
		const userId = request.user.id
		const { id } = CUIDParamDto.parse(request.params)
		const success = await CommentsService.delete(id, userId)

		return response.json(success)
	}
}
