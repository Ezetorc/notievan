import { ArticlesRepository } from './articles.repository.js'
import { CloudinaryService } from '../shared/services/cloudinary/cloudinary.service.js'
import sharp from 'sharp'
import type { UpdateArticleType } from '../../../shared/src/dtos/in/update-article.dto.js'
import type { CreateArticleDtoType } from '../../../shared/src/dtos/in/create-article.dto.js'
import { ErrorCode } from '../../../shared/src/models/error-code.model.js'
import { NotFoundError } from '../errors/not-found.error.js'
import { BadRequestError } from '../errors/bad-request.error.js'
import { UnauthorizedError } from '../errors/unauthorized.error.js'

export class ArticlesService {
	static async getById(id: string) {
		const article = await ArticlesRepository.findById(id)

		if (!article) throw new NotFoundError(ErrorCode.ARTICLE_NOT_FOUND)

		return {
			...article,
			image: CloudinaryService.optimizeUrl(article.image, 800)
		}
	}

	static async exists(id: string) {
		const article = await ArticlesRepository.findById(id)

		return Boolean(article)
	}

	static async delete(id: string, userId: string) {
		const article = await ArticlesService.getById(id)

		if (article.authorId !== userId)
			throw new UnauthorizedError(ErrorCode.FORBIDDEN)

		await ArticlesRepository.delete(id)

		if (article.image) {
			const publicId = CloudinaryService.extractIdOf(article.image)

			if (publicId) {
				await CloudinaryService.delete(publicId)
			}
		}

		return { value: true }
	}

	static async update(
		id: string,
		data: UpdateArticleType,
		userId: string,
		file?: Express.Multer.File
	) {
		const article = await ArticlesService.getById(id)

		if (userId !== article.authorId) {
			throw new UnauthorizedError(ErrorCode.FORBIDDEN)
		}

		await CloudinaryService.updateImage({
			file,
			body: data,
			article
		})

		const updatedArticle = await ArticlesRepository.update(id, data)

		return Boolean(updatedArticle)
	}

	static async create(
		data: CreateArticleDtoType,
		userId: string,
		file?: Express.Multer.File
	) {
		let image: string

		if (file) {
			const optimizedBuffer = await sharp(file.buffer)
				.resize(1200)
				.webp({ quality: 75 })
				.toBuffer()

			const uploadResult = await CloudinaryService.upload(
				optimizedBuffer,
				file.originalname
			)

			image = uploadResult.secure_url
		} else if (data.image) {
			image = data.image
		} else {
			throw new BadRequestError(ErrorCode.IMAGE_NOT_FOUND)
		}

		const article = await ArticlesRepository.create({
			...data,
			image,
			authorId: userId
		})

		return article
	}

	static async getAll(limit: number, skip: number) {
		const articles = await ArticlesRepository.getAll(limit, skip)

		return articles.map((article) => ({
			...article,
			image: CloudinaryService.optimizeUrl(article.image, 600)
		}))
	}

	static async getOwn(limit: number, skip: number, userId: string) {
		const articles = await ArticlesRepository.getOwn(limit, skip, userId)

		return articles.map((article) => ({
			...article,
			image: CloudinaryService.optimizeUrl(article.image, 600)
		}))
	}

	static async getRandom(limit: number, omitId: string) {
		const allArticleIds = await ArticlesRepository.getRandomIds(limit, omitId)

		const shuffledIds = allArticleIds
			.map((a) => a.id)
			.sort(() => 0.5 - Math.random())
			.slice(0, limit)

		const articles = await ArticlesRepository.getByIds(shuffledIds)

		return articles.map((article) => ({
			...article,
			image: CloudinaryService.optimizeUrl(article.image, 600)
		}))
	}
}
