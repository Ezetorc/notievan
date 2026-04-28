import { UUIDParamDto } from '../models/dtos/user-id-param.dto.js'
import type { Request, Response } from 'express'
import { UpdateArticleDto } from '../models/dtos/update-article.dto.js'
import { CreateArticleDto } from '../models/dtos/create-article.dto.js'
import { PaginationParamsDto } from '../models/dtos/pagination-params.dto.js'
import { OmitIdParamDto } from '../models/dtos/omit-id-param.dto.js'
import { ArticlesService } from '../services/articles.service.js'

export class ArticlesController {
	static async findById(request: Request, response: Response) {
		const { id } = UUIDParamDto.parse(request.params)
		const article = await ArticlesService.getById(id)

		return response.json(article)
	}

	static async delete(request: Request, response: Response) {
		const { id } = UUIDParamDto.parse(request.params)
		const success = await ArticlesService.delete(id)

		return response.json(success)
	}

	static async update(request: Request, response: Response) {
		const { id } = UUIDParamDto.parse(request.params)
		const data = UpdateArticleDto.parse(request.body)
		const success = await ArticlesService.update(id, data, request)

		return response.json(success)
	}

	static async create(request: Request, response: Response) {
		const data = CreateArticleDto.parse(request.body)
		const newArticle = await ArticlesService.create(data, request)

		return response.status(201).json(newArticle)
	}

	static async getAll(request: Request, response: Response) {
		const { limit, page } = PaginationParamsDto.parse(request.query)
		const skip = (page - 1) * limit
		const articles = await ArticlesService.getAll(limit, skip)

		return response.json(articles)
	}

	static async getOwn(request: Request, response: Response) {
		const { limit, page } = PaginationParamsDto.parse(request.query)
		const skip = (page - 1) * limit
		const articles = await ArticlesService.getOwn(limit, skip, request.user.id)

		return response.json(articles)
	}

	static async getRandom(request: Request, response: Response) {
		const { omit } = OmitIdParamDto.parse(request.query)
		const { limit } = PaginationParamsDto.parse(request.query)
		const articles = await ArticlesService.getRandom(limit, omit)

		return response.json(articles)
	}
}
