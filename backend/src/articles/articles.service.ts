import type { CreateArticleDtoType } from '../../../shared/src/dtos/in/create-article.dto.js'
import type { UpdateArticleDtoType } from '../../../shared/src/dtos/in/update-article.dto.js'
import { Cursor } from '../../../shared/src/models/cursor.model.js'
import { ErrorCode } from '../../../shared/src/models/error-code.model.js'
import type { PaginatedResult } from '../../../shared/src/models/paginated-result.model.js'
import { NotFoundError } from '../errors/not-found.error.js'
import { UnauthorizedError } from '../errors/unauthorized.error.js'
import { InstagramService } from '../instagram/instagram.service.js'
import { env } from '../shared/configuration/env.configuration.js'
import { ArticleImageService } from './article-image.service.js'
import type { ArticlePreviewWithAuthorName } from './article-preview-with-author-name.model.js'
import type { ArticleWithAuthorName } from './article-with-author-name.model.js'
import { ArticlesRepository } from './articles.repository.js'

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

	static async createPost({
		title,
		imageUrl,
		articleId
	}: {
		title: string
		imageUrl?: string
		articleId: string
	}): Promise<void> {
		if (env.nodeEnv !== 'production') {
			return
		}

		const postImageUrl = await ArticleImageService.uploadPostImage({
			title,
			imageUrl
		})

		await InstagramService.createPost({
			imageUrl: postImageUrl,
			caption: `⭐ NUEVO ARTÍCULO

     ${title}

     👉 Leer completo:
     https://notievan.vercel.app/articles/${articleId}

     #NotiEvan #Noticias`
		})
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
		await ArticleImageService.deleteArticleImage(article)

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

		await ArticleImageService.updateArticleImage({
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
		const articleImage = await ArticleImageService.uploadArticleImage({
			file,
			data
		})

		const article = await ArticlesRepository.create({
			...data,
			image: articleImage,
			authorId: userId
		})

		await ArticlesService.createPost({
			title: data.title,
			imageUrl: articleImage,
			articleId: article.id
		})

		return article
	}

	static async getAll(
		limit: number,
		cursor?: Cursor
	): Promise<PaginatedResult<ArticlePreviewWithAuthorName>> {
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
	): Promise<PaginatedResult<ArticlePreviewWithAuthorName>> {
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
