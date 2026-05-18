import type { Request, Response } from 'express'
import { CreateCommentDto } from '../../../shared/src/dtos/in/create-comment.dto.js'
import { CUIDParamDto } from '../../../shared/src/dtos/in/cuid-param.dto.js'
import { PaginationParamsDto } from '../../../shared/src/dtos/in/pagination-params.dto.js'
import { CommentOut } from '../../../shared/src/dtos/out/comment-out.dto.js'
import { Cursor } from '../../../shared/src/models/cursor.model.js'
import { CommentsService } from './comments.service.js'

export class CommentsController {
	static async create(request: Request, response: Response): Promise<Response> {
		const { content, articleId } = CreateCommentDto.parse(request.body)
		const comment = await CommentsService.create(
			content,
			articleId,
			request.user.id
		)
		const commentOut = new CommentOut(comment, comment.authorName)

		return response.status(201).json(commentOut)
	}

	static async getAllOfArticle(
		request: Request,
		response: Response
	): Promise<Response> {
		const { id } = CUIDParamDto.parse(request.params)
		const { limit, cursor } = PaginationParamsDto.parse(request.query)
		const decodedCursor = cursor ? Cursor.decode(cursor) : undefined
		const { data, nextCursor } = await CommentsService.getAllOfArticle(
			id,
			limit,
			decodedCursor
		)

		return response.json({
			data: data.map((comment) => new CommentOut(comment, comment.authorName)),
			nextCursor
		})
	}

	static async delete(request: Request, response: Response): Promise<Response> {
		const userId = request.user.id
		const { id } = CUIDParamDto.parse(request.params)
		const success = await CommentsService.delete(id, userId)

		return response.json(success)
	}
}
