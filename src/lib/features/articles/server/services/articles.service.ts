import { error } from '@sveltejs/kit'
import { Cursor } from 'server/models/cursor.model'
import { ImageService } from 'server/services/image.service'
import { InstagramService } from 'server/services/instagram.service'
import { ErrorCode } from 'shared/models/error-code.model'
import type { PaginatedResult } from 'shared/models/paginated-result.model'
import { ArticlesRepository } from '../articles.repository'
import type { ArticlePreviewWithAuthorName } from '../models/article-preview-with-author-name.model'
import type { ArticleWithAuthorName } from '../models/article-with-author-name.model'
import { ArticleImageService } from './article-image.service'
import type { UpdateArticleSchema } from 'articles/schemas/update-article.schema'
import type { CreateArticleSchema } from 'articles/schemas/create-article.schema'
import { env } from 'server/configuration/env.configuration'

export class ArticlesService {
	static async getById(id: string): Promise<ArticleWithAuthorName> {
		const article = await ArticlesRepository.findById(id)

		if (!article) {
			throw error(404, ErrorCode.ARTICLE_NOT_FOUND)
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
		imageUrl: string
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
			throw error(403, ErrorCode.FORBIDDEN)
		}

		await ArticlesRepository.delete(id)
		await ArticleImageService.deleteArticleImage(article)

		return true
	}

	static async update(
		id: string,
		data: UpdateArticleSchema,
		userId: string
	): Promise<boolean> {
		const article = await ArticlesService.getById(id)

		if (userId !== article.authorId) {
			throw error(403, ErrorCode.FORBIDDEN)
		}

		let newImageUrl: string | undefined

		if (data.image instanceof File) {
			ImageService.validateImage(data.image)

			newImageUrl = await ArticleImageService.updateArticleImage({
				article,
				file: data.image
			})
		} else {
			newImageUrl = data.image
		}

		const updateData = {
			...data,
			image: newImageUrl
		}

		return await ArticlesRepository.update(id, updateData)
	}

	static async create(
		data: CreateArticleSchema,
		userId: string
	): Promise<ArticleWithAuthorName> {
		if (data.image instanceof File) {
			ImageService.validateImage(data.image)

			const articleImage = await ArticleImageService.uploadArticleImage(
				data.image
			)

			const article = await ArticlesRepository.create({
				...data,
				image: articleImage,
				authorId: userId
			})

			if (!article) {
				throw error(500, ErrorCode.UNEXPECTED_ERROR)
			}

			await ArticlesService.createPost({
				title: data.title,
				imageUrl: articleImage,
				articleId: article.id
			})

			return article
		}

		const article = await ArticlesRepository.create({
			...data,
			image: data.image,
			authorId: userId
		})

		if (!article) {
			throw error(500, ErrorCode.UNEXPECTED_ERROR)
		}

		await ArticlesService.createPost({
			title: data.title,
			imageUrl: data.image,
			articleId: article.id
		})

		return article
	}

	static async getAll(
		limit: number,
		cursor?: Cursor
	): Promise<PaginatedResult<ArticlePreviewWithAuthorName>> {
		const articles = await ArticlesRepository.getAll(limit, cursor)
		const hasMore = articles.length > limit
		const sliced = hasMore ? articles.slice(0, limit) : articles
		const mapped = sliced.map((article) => ({
			...article,
			image: ArticleImageService.optimizeUrl(article.image)
		}))
		const lastArticle = sliced[sliced.length - 1]

		return {
			data: mapped,
			nextCursor: hasMore ? Cursor.encodedFrom(lastArticle) : null
		}
	}

	static async getOwn(
		limit: number,
		userId: string,
		cursor?: Cursor
	): Promise<PaginatedResult<ArticlePreviewWithAuthorName>> {
		const articles = await ArticlesRepository.getOwn(limit, userId, cursor)
		const hasMore = articles.length > limit
		const sliced = hasMore ? articles.slice(0, limit) : articles
		const mapped = sliced.map((article) => ({
			...article,
			image: ArticleImageService.optimizeUrl(article.image)
		}))
		const lastArticle = sliced[sliced.length - 1]

		return {
			data: mapped,
			nextCursor: hasMore ? Cursor.encodedFrom(lastArticle) : null
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
