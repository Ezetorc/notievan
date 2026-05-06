import { beforeEach, describe, expect, it, vi } from 'vitest'
import { commentMock } from './comments.mock.js'
import { CommentsService } from './comments.service.js'
import { CommentsController } from './comments.controller.js'
import { CommentOut } from '../../../shared/src/dtos/out/comment-out.dto.js'

describe('CommentsController', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	describe('create', () => {
		it('should create a new comment', async () => {
			const request = {
				user: { id: commentMock.authorId },
				body: { content: commentMock.content, articleId: commentMock.articleId }
			} as any
			const response = {
				json: vi.fn(),
				status: vi.fn().mockReturnThis()
			} as any

			vi.spyOn(CommentsService, 'create').mockResolvedValue(commentMock)

			await CommentsController.create(request, response)

			expect(response.status).toHaveBeenCalledWith(201)
			expect(response.json).toHaveBeenCalledWith(
				new CommentOut(commentMock, commentMock.authorName)
			)
		})
	})

	describe('getAllOfArticle', () => {
		it("should return a list of article's comments", async () => {
			const request = {
				params: { id: commentMock.articleId },
				query: { limit: '4' }
			} as any
			const response = { json: vi.fn() } as any

			vi.spyOn(CommentsService, 'getAllOfArticle').mockResolvedValue({
				data: [commentMock],
				nextCursor: null
			})

			await CommentsController.getAllOfArticle(request, response)

			expect(response.json).toHaveBeenCalledWith({
				data: [new CommentOut(commentMock, commentMock.authorName)],
				nextCursor: null
			})
		})
	})

	describe('delete', () => {
		it('should delete a comment', async () => {
			const request = {
				params: { id: commentMock.id },
				user: { id: commentMock.authorId }
			} as any
			const response = { json: vi.fn() } as any

			vi.spyOn(CommentsService, 'delete').mockResolvedValue(true)

			await CommentsController.delete(request, response)

			expect(response.json).toHaveBeenCalledWith(true)
		})
	})
})
