import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ArticlesService } from '../articles/articles.service.js'
import { CommentsRepository } from './comments.repository.js'
import { commentMock } from './comments.mock.js'
import { CommentsService } from './comments.service.js'
import { userMock } from '../users/users.mock.js'
import { NotFoundError } from '../errors/not-found.error.js'
import { UnauthorizedError } from '../errors/unauthorized.error.js'

describe('CommentsService', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	describe('create', () => {
		it('should create a new comment', async () => {
			const content = "Comment's content"
			const articleId = 'article-id'

			vi.spyOn(ArticlesService, 'exists').mockResolvedValue(true)
			vi.spyOn(CommentsRepository, 'create').mockResolvedValue(commentMock)

			const result = await CommentsService.create(
				content,
				articleId,
				userMock.id
			)

			expect(result).toEqual(commentMock)
			expect(ArticlesService.exists).toHaveBeenCalledWith(articleId)
		})

		it("should throw a NotFound error because comment's article does not exist", async () => {
			const content = "Comment's content"
			const articleId = 'article-id'

			vi.spyOn(ArticlesService, 'exists').mockResolvedValue(false)
			vi.spyOn(CommentsRepository, 'create').mockResolvedValue(commentMock)

			await expect(
				CommentsService.create(content, articleId, userMock.id)
			).rejects.toBeInstanceOf(NotFoundError)
			expect(ArticlesService.exists).toHaveBeenCalledWith(articleId)
		})
	})

	describe('getAllOfArticle', () => {
		it('should return all comments of an article', async () => {
			const articleId = 'article-id'
			const comments = [commentMock]
			const limit = 4

			vi.spyOn(CommentsRepository, 'getAllOfArticle').mockResolvedValue(
				comments
			)

			const result = await CommentsService.getAllOfArticle(articleId, limit)

			expect(result).toHaveProperty('data', comments)
			expect(CommentsRepository.getAllOfArticle).toHaveBeenCalledWith(
				articleId,
				limit,
				undefined
			)
		})
	})

	describe('delete', () => {
		it('should delete a comment', async () => {
			vi.spyOn(CommentsRepository, 'delete').mockResolvedValue(true)
			vi.spyOn(CommentsRepository, 'findById').mockResolvedValue(commentMock)

			await CommentsService.delete(commentMock.id, userMock.id)

			expect(CommentsRepository.delete).toHaveBeenCalledWith(commentMock.id)
		})

		it("should throw a NotFound error if comment doesn't exist", async () => {
			vi.spyOn(CommentsRepository, 'delete').mockResolvedValue(false)
			vi.spyOn(CommentsRepository, 'findById').mockResolvedValue(undefined)

			await expect(
				CommentsService.delete(commentMock.id, userMock.id)
			).rejects.toThrow(NotFoundError)
		})

		it('should throw an Unauthorized error if user is not the author', async () => {
			vi.spyOn(CommentsRepository, 'delete').mockResolvedValue(true)
			vi.spyOn(CommentsRepository, 'findById').mockResolvedValue(commentMock)

			await expect(
				CommentsService.delete(commentMock.id, 'different-user-id')
			).rejects.toThrow(UnauthorizedError)
		})
	})
})
