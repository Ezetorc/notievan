import type { Request, Response } from 'express'
import { ArticlesService } from './articles.service.js'
import { CUIDParamDto } from '../../../shared/src/dtos/in/cuid-param.dto.js'
import { CreateArticleDto } from '../../../shared/src/dtos/in/create-article.dto.js'
import { OmitIdParamDto } from '../../../shared/src/dtos/in/omit-id-param.dto.js'
import { PaginationParamsDto } from '../../../shared/src/dtos/in/pagination-params.dto.js'
import { UpdateArticleDto } from '../../../shared/src/dtos/in/update-article.dto.js'
import { ArticleOut } from '../../../shared/src/dtos/out/article-out.dto.js'
import { ArticlePreviewOut } from '../../../shared/src/dtos/out/article-preview-out.dto.js'
import { Cursor } from '../../../shared/src/models/cursor.model.js'

export class ArticlesController {
	static async findById(request: Request, response: Response) {
		const { id } = CUIDParamDto.parse(request.params)
		const article = await ArticlesService.getById(id)
		const articleOut = new ArticleOut(article, article.authorName)

		return response.json(articleOut)
	}

	static async delete(request: Request, response: Response) {
		const { id } = CUIDParamDto.parse(request.params)
		const success = await ArticlesService.delete(id, request.user.id)

		return response.json(success)
	}

	static async update(request: Request, response: Response) {
		const { id } = CUIDParamDto.parse(request.params)
		const data = UpdateArticleDto.parse(request.body)
		const success = await ArticlesService.update(
			id,
			data,
			request.user.id,
			request.file
		)

		return response.json(success)
	}

	static async create(request: Request, response: Response) {
		const data = CreateArticleDto.parse(request.body)
		const article = await ArticlesService.create(
			data,
			request.user.id,
			request.file
		)
		const articleOut = new ArticleOut(article, article.authorName)

		return response.status(201).json(articleOut)
	}

	static async getAll(request: Request, response: Response) {
		const { limit, cursor } = PaginationParamsDto.parse(request.query)
		const decodedCursor = cursor ? Cursor.decode(cursor) : undefined
		const { data, nextCursor } = await ArticlesService.getAll(
			limit,
			decodedCursor
		)

		return response.json({
			data: data.map(
				(article) => new ArticlePreviewOut(article, article.authorName)
			),
			nextCursor
		})
	}

	static async getOwn(request: Request, response: Response) {
		const { limit, cursor } = PaginationParamsDto.parse(request.query)
		const decodedCursor = cursor ? Cursor.decode(cursor) : undefined
		const { data, nextCursor } = await ArticlesService.getOwn(
			limit,
			request.user.id,
			decodedCursor
		)

		return response.json({
			data: data.map(
				(article) => new ArticlePreviewOut(article, article.authorName)
			),
			nextCursor
		})
	}

	static async getRandom(request: Request, response: Response) {
		const { omit } = OmitIdParamDto.parse(request.query)
		const { limit } = PaginationParamsDto.parse(request.query)
		const articles = await ArticlesService.getRandom(limit, omit)

		return response.json(
			articles.map(
				(article) => new ArticlePreviewOut(article, article.authorName)
			)
		)
	}
}
