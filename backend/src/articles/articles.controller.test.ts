import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ArticlesService } from './articles.service.js'
import { articleMock } from './articles.mock.js'
import { ArticlesController } from './articles.controller.js'
import type { UpdateArticleType } from '../../../shared/src/dtos/in/update-article.dto.js'
import type { CreateArticleDtoType } from '../../../shared/src/dtos/in/create-article.dto.js'
import { ArticleOut } from '../../../shared/src/dtos/out/article-out.dto.js'
import { ArticlePreviewOut } from '../../../shared/src/dtos/out/article-preview-out.dto.js'

describe('ArticlesController', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	describe('findById', () => {
		it('should return an article by id', async () => {
			const mockRequest = { params: { id: articleMock.id } } as any
			const mockResponse = { json: vi.fn() } as any

			vi.spyOn(ArticlesService, 'getById').mockResolvedValue(articleMock)

			await ArticlesController.findById(mockRequest, mockResponse)

			expect(ArticlesService.getById).toHaveBeenCalledWith(articleMock.id)
			expect(mockResponse.json).toHaveBeenCalledWith(
				new ArticleOut(articleMock, articleMock.authorName)
			)
		})
	})

	describe('delete', () => {
		it('should delete an article by id', async () => {
			const mockRequest = {
				params: { id: articleMock.id },
				user: { id: articleMock.authorId }
			} as any
			const mockResponse = { json: vi.fn() } as any

			vi.spyOn(ArticlesService, 'delete').mockResolvedValue(true)

			await ArticlesController.delete(mockRequest, mockResponse)

			expect(ArticlesService.delete).toHaveBeenCalledWith(
				articleMock.id,
				articleMock.authorId
			)
			expect(mockResponse.json).toHaveBeenCalledWith(true)
		})

		it('should throw UnauthorizedError if user is not owner of article', async () => {
			const userId = '1231231231231312'
			const mockRequest = {
				params: { id: articleMock.id },
				user: { id: userId }
			} as any
			const mockResponse = { json: vi.fn() } as any

			vi.spyOn(ArticlesService, 'delete').mockResolvedValue(false)

			await ArticlesController.delete(mockRequest, mockResponse)

			expect(ArticlesService.delete).toHaveBeenCalledWith(
				articleMock.id,
				userId
			)
			expect(mockResponse.json).toHaveBeenCalledWith(false)
		})
	})

	describe('update', () => {
		it('should update the article by id', async () => {
			const updateArticleDto: UpdateArticleType = { title: 'Updated new title' }
			const mockRequest = {
				params: { id: articleMock.id },
				user: { id: articleMock.authorId },
				body: updateArticleDto
			} as any
			const mockResponse = { json: vi.fn() } as any

			vi.spyOn(ArticlesService, 'update').mockResolvedValue(true)

			await ArticlesController.update(mockRequest, mockResponse)

			expect(ArticlesService.update).toHaveBeenCalledWith(
				articleMock.id,
				updateArticleDto,
				articleMock.authorId,
				undefined
			)
			expect(mockResponse.json).toHaveBeenCalledWith(true)
		})
	})

	describe('create', () => {
		it('should create a new article', async () => {
			const createArticleDto: CreateArticleDtoType = { ...articleMock }
			const mockRequest = {
				body: createArticleDto,
				user: { id: articleMock.authorId }
			} as any
			const mockResponse = {
				json: vi.fn(),
				status: vi.fn().mockReturnThis()
			} as any

			vi.spyOn(ArticlesService, 'create').mockResolvedValue(articleMock)

			await ArticlesController.create(mockRequest, mockResponse)

			expect(mockResponse.json).toHaveBeenCalledWith(
				new ArticleOut(articleMock, articleMock.authorName)
			)
		})
	})

	describe('getAll', () => {
		it('should return paginated articles', async () => {
			const page = 1
			const limit = 4
			const mockRequest = {
				query: { page: page.toString(), limit: limit.toString() }
			} as any
			const mockResponse = { json: vi.fn() } as any

			vi.spyOn(ArticlesService, 'getAll').mockResolvedValue([articleMock])

			await ArticlesController.getAll(mockRequest, mockResponse)

			const skip = (page - 1) * limit

			expect(ArticlesService.getAll).toHaveBeenCalledWith(limit, skip)
			expect(mockResponse.json).toHaveBeenCalledWith([
				new ArticlePreviewOut(articleMock, articleMock.authorName)
			])
		})
	})

	describe('getOwn', () => {
		it('should return user-owned paginated articles', async () => {
			const page = 1
			const limit = 4
			const mockRequest = {
				user: { id: articleMock.authorId },
				query: { page: page.toString(), limit: limit.toString() }
			} as any
			const mockResponse = { json: vi.fn() } as any

			vi.spyOn(ArticlesService, 'getOwn').mockResolvedValue([articleMock])

			await ArticlesController.getOwn(mockRequest, mockResponse)

			const skip = (page - 1) * limit

			expect(ArticlesService.getOwn).toHaveBeenCalledWith(
				limit,
				skip,
				mockRequest.user.id
			)
			expect(mockResponse.json).toHaveBeenCalledWith([
				new ArticlePreviewOut(articleMock, articleMock.authorName)
			])
		})
	})

	describe('getRandom', () => {
		it('should return random paginated articles', async () => {
			const omit = articleMock.id
			const limit = 4
			const mockRequest = { query: { limit: limit.toString(), omit } } as any
			const mockResponse = { json: vi.fn() } as any

			vi.spyOn(ArticlesService, 'getRandom').mockResolvedValue([])

			await ArticlesController.getRandom(mockRequest, mockResponse)

			expect(ArticlesService.getRandom).toHaveBeenCalledWith(limit, omit)
			expect(mockResponse.json).toHaveBeenCalledWith([])
		})
	})
})
