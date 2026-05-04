import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ArticlesService } from './articles.service.js'
import { ArticlesRepository } from './articles.repository.js'
import { articleMock } from './articles.mock.js'
import { NotFoundError } from '../errors/not-found.error.js'
import { UnauthorizedError } from '../errors/unauthorized.error.js'
import { userMock } from '../users/users.mock.js'
import { CloudinaryService } from '../shared/services/cloudinary/cloudinary.service.js'
import type { CreateArticleDtoType } from '../../../shared/src/dtos/in/create-article.dto.js'
import { BadRequestError } from '../errors/bad-request.error.js'

vi.mock('sharp', () => {
	return {
		default: () => ({
			resize: () => ({
				webp: () => ({
					toBuffer: async () => Buffer.from('optimized')
				})
			})
		})
	}
})
describe('ArticlesService', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	describe('getById', () => {
		it('should return an article by id', async () => {
			vi.spyOn(ArticlesRepository, 'findById').mockResolvedValue(articleMock)
			vi.spyOn(CloudinaryService, 'optimizeUrl').mockReturnValue(
				articleMock.image
			)

			const result = await ArticlesService.getById(articleMock.id)

			expect(result).toEqual(articleMock)
		})

		it('should throw NotFoundError if article is not found', async () => {
			vi.spyOn(ArticlesRepository, 'findById').mockResolvedValue(null)

			await expect(
				ArticlesService.getById(articleMock.id)
			).rejects.toBeInstanceOf(NotFoundError)
		})
	})

	describe('exists', () => {
		it('should return true if article exists', async () => {
			vi.spyOn(ArticlesRepository, 'findById').mockResolvedValue(articleMock)

			const result = await ArticlesService.exists(articleMock.id)

			expect(result).toBe(true)
		})

		it('should return false if article does not exist', async () => {
			vi.spyOn(ArticlesRepository, 'findById').mockResolvedValue(null)

			const result = await ArticlesService.exists(articleMock.id)

			expect(result).toBe(false)
		})
	})

	describe('delete', () => {
		it('should delete an article if user is owner', async () => {
			const mockedArticle = { ...articleMock, authorId: userMock.id }

			vi.spyOn(ArticlesRepository, 'findById').mockResolvedValue(mockedArticle)
			const deleteMock = vi
				.spyOn(ArticlesRepository, 'delete')
				.mockResolvedValue(undefined)

			vi.spyOn(CloudinaryService, 'extractIdOf').mockReturnValue(null)

			const result = await ArticlesService.delete(mockedArticle.id, userMock.id)

			expect(deleteMock).toHaveBeenCalledWith(mockedArticle.id)
			expect(result).toEqual({ value: true })
		})

		it('should throw UnauthorizedError if user is not owner', async () => {
			vi.spyOn(ArticlesRepository, 'findById').mockResolvedValue({
				...articleMock,
				authorId: 'other-user'
			})

			await expect(
				ArticlesService.delete(articleMock.id, userMock.id)
			).rejects.toBeInstanceOf(UnauthorizedError)
		})

		it('should throw NotFoundError if article does not exist', async () => {
			vi.spyOn(ArticlesRepository, 'findById').mockResolvedValue(null)

			await expect(
				ArticlesService.delete(articleMock.id, userMock.id)
			).rejects.toBeInstanceOf(NotFoundError)
		})

		it('should delete image from cloudinary if exists', async () => {
			const mockedArticle = {
				...articleMock,
				authorId: userMock.id,
				image: 'https://cloudinary.com/image.jpg'
			}

			vi.spyOn(ArticlesRepository, 'findById').mockResolvedValue(mockedArticle)
			vi.spyOn(ArticlesRepository, 'delete').mockResolvedValue(undefined)

			vi.spyOn(CloudinaryService, 'extractIdOf').mockReturnValue('public-id')
			const cloudinaryDeleteMock = vi
				.spyOn(CloudinaryService, 'delete')
				.mockResolvedValue(undefined)

			await ArticlesService.delete(mockedArticle.id, userMock.id)

			expect(cloudinaryDeleteMock).toHaveBeenCalledWith('public-id')
		})
	})

	describe('update', () => {
		it('should update article if exists and user is owner', async () => {
			const mockedArticle = { ...articleMock, authorId: userMock.id }

			vi.spyOn(ArticlesRepository, 'findById').mockResolvedValue(mockedArticle)

			const updateMock = vi
				.spyOn(ArticlesRepository, 'update')
				.mockResolvedValue({ ...mockedArticle })

			const cloudinaryMock = vi
				.spyOn(CloudinaryService, 'updateImage')
				.mockResolvedValue(undefined)

			const data = { title: 'Updated title' }

			const result = await ArticlesService.update(
				mockedArticle.id,
				data,
				userMock.id,
				undefined
			)

			expect(cloudinaryMock).toHaveBeenCalled()
			expect(updateMock).toHaveBeenCalledWith(mockedArticle.id, data)
			expect(result).toBe(true)
		})

		it('should throw UnauthorizedError if user is not owner', async () => {
			vi.spyOn(ArticlesRepository, 'findById').mockResolvedValue({
				...articleMock,
				authorId: 'other-user'
			})

			await expect(
				ArticlesService.update(articleMock.id, {}, userMock.id)
			).rejects.toBeInstanceOf(UnauthorizedError)
		})

		it('should throw NotFoundError if article does not exist', async () => {
			vi.spyOn(ArticlesRepository, 'findById').mockResolvedValue(null)

			await expect(
				ArticlesService.update(articleMock.id, {}, userMock.id)
			).rejects.toBeInstanceOf(NotFoundError)
		})
	})

	describe('create', () => {
		it('should create an article using image from data', async () => {
			const data: CreateArticleDtoType = {
				title: 'New article',
				content: 'Content',
				description: 'Description',
				subtitle: 'Subtitle',
				image: 'https://cloudinary.com/image.jpg'
			}

			const createdArticle = {
				...articleMock,
				...data,
				authorId: userMock.id
			}

			const createMock = vi
				.spyOn(ArticlesRepository, 'create')
				.mockResolvedValue(createdArticle)

			const result = await ArticlesService.create(data, userMock.id)

			expect(createMock).toHaveBeenCalledWith({
				...data,
				image: data.image,
				authorId: userMock.id
			})

			expect(result).toEqual(createdArticle)
		})

		it('should upload image if file is provided', async () => {
			const data: CreateArticleDtoType = {
				title: 'New article',
				content: 'Content',
				description: 'Description',
				subtitle: 'Subtitle'
			}

			const file = {
				buffer: Buffer.from('fake'),
				originalname: 'image.png'
			} as any

			const uploadMock = vi
				.spyOn(CloudinaryService, 'upload')
				.mockResolvedValue({
					secure_url: 'https://cloudinary.com/uploaded.jpg'
				})

			const createMock = vi
				.spyOn(ArticlesRepository, 'create')
				.mockResolvedValue({
					...articleMock,
					authorId: userMock.id
				})

			await ArticlesService.create(data, userMock.id, file)

			expect(uploadMock).toHaveBeenCalled()
			expect(createMock).toHaveBeenCalled()
		})

		it('should throw BadRequestError if no image and no file', async () => {
			const data: CreateArticleDtoType = {
				title: 'New article',
				content: 'Content',
				description: 'Description',
				subtitle: 'Subtitle'
			}

			await expect(
				ArticlesService.create(data, userMock.id)
			).rejects.toBeInstanceOf(BadRequestError)
		})
	})
})
