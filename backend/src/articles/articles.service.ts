import { ArticlesRepository } from './articles.repository.js'
import type { CreateArticleDtoType } from '../../../shared/src/dtos/in/create-article.dto.js'
import { ErrorCode } from '../../../shared/src/models/error-code.model.js'
import { NotFoundError } from '../errors/not-found.error.js'
import { UnauthorizedError } from '../errors/unauthorized.error.js'
import type { PaginatedResult } from '../../../shared/src/models/paginated-result.model.js'
import { Cursor } from '../../../shared/src/models/cursor.model.js'
import type { ArticlePreview } from '../../../shared/src/models/article-preview.model.js'
import type { ArticleWithAuthorName } from './article-with-author-name.model.js'
import type { ArticlePreviewWithAuthorName } from './article-preview-with-author-name.model.js'
import type { UpdateArticleDtoType } from '../../../shared/src/dtos/in/update-article.dto.js'
import { ArticleImageService } from './article-image.service.js'

export class ArticlesService {
	static async getById(id: string): Promise<ArticleWithAuthorName> {
		const article = await ArticlesRepository.findById(id)

		if (!article) {
			throw new NotFoundError(ErrorCode.ARTICLE_NOT_FOUND)
		}
		return {
			...article,
			image: ArticleImageService.optimizeUrl(article.image)
		}
	}

	static async exists(id: string): Promise<boolean> {
		const article = await ArticlesRepository.findById(id)

		return Boolean(article)
	}

	static async delete(id: string, userId: string): Promise<boolean> {
		const article = await ArticlesService.getById(id)

		if (article.authorId !== userId) {
			throw new UnauthorizedError(ErrorCode.FORBIDDEN)
		}

		await ArticlesRepository.delete(id)
		await ArticleImageService.deletePreviousImage(article)

		return true
	}

	static async update(
		id: string,
		data: UpdateArticleDtoType,
		userId: string,
		file?: Express.Multer.File
	): Promise<boolean> {
		const article = await ArticlesService.getById(id)

		if (userId !== article.authorId) {
			throw new UnauthorizedError(ErrorCode.FORBIDDEN)
		}

		await ArticleImageService.updateImage({
			article,
			file,
			body: data
		})

		return await ArticlesRepository.update(id, data)
	}

	static async create(
		data: CreateArticleDtoType,
		userId: string,
		file?: Express.Multer.File
	): Promise<ArticleWithAuthorName> {
		const articleImage = await ArticleImageService.uploadImage({
			file,
			data
		})

		const article = await ArticlesRepository.create({
			...data,
			image: articleImage,
			authorId: userId
		})

		await ArticleImageService.createPost({
			title: data.title,
			imageUrl: articleImage,
			articleId: article.id
		})

		return article
	}

	static async getAll(
		limit: number,
		cursor?: Cursor
	): Promise<PaginatedResult<ArticlePreview & { authorName: string }>> {
		const articles = await ArticlesRepository.getAll(limit, cursor)

		const mapped = articles.map((article) => ({
			...article,
			image: ArticleImageService.optimizeUrl(article.image)
		}))

		const lastArticle = articles[articles.length - 1]

		return {
			data: mapped,
			nextCursor: Cursor.encodedFrom(lastArticle)
		}
	}

	static async getOwn(
		limit: number,
		userId: string,
		cursor?: Cursor
	): Promise<PaginatedResult<ArticlePreview & { authorName: string }>> {
		const articles = await ArticlesRepository.getOwn(limit, userId, cursor)

		const mapped = articles.map((article) => ({
			...article,
			image: ArticleImageService.optimizeUrl(article.image)
		}))

		const lastArticle = articles[articles.length - 1]

		return {
			data: mapped,
			nextCursor: Cursor.encodedFrom(lastArticle)
		}
	}

	static async getRandom(
		limit: number,
		omitId: string
	): Promise<ArticlePreviewWithAuthorName[]> {
		const articleIds = await ArticlesRepository.getRandomIds(limit, omitId)

		const shuffledIds = articleIds
			.sort(() => 0.5 - Math.random())
			.slice(0, limit)

		const articles = await ArticlesRepository.getByIds(shuffledIds)

		return articles.map((article) => ({
			...article,
			image: ArticleImageService.optimizeUrl(article.image)
		}))
	}
}
