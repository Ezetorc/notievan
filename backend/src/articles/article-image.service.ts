import sharp from 'sharp'
import type { Article } from '../../../shared/src/models/article.model.js'
import { BadRequestError } from '../errors/bad-request.error.js'
import { CloudinaryService } from '../shared/services/cloudinary/cloudinary.service.js'
import { ErrorCode } from '../../../shared/src/models/error-code.model.js'
import type { CreateArticleDtoType } from '../../../shared/src/dtos/in/create-article.dto.js'
import { ImageService } from '../shared/services/image.service.js'
import Handlebars from 'handlebars'
import fileSystem from 'node:fs/promises'
import path from 'node:path'
import sanitizeHtml from 'sanitize-html'

export class ArticleImageService {
	private static readonly IMAGE_WIDTH = 800
	private static readonly ARTICLES_FOLDER = 'articles'
	private static readonly INSTAGRAM_POSTS_FOLDER = 'instagram/posts'

	static async uploadPostImage({
		title,
		imageUrl
	}: {
		title: string
		imageUrl?: string
	}): Promise<string> {
		const templatePath = path.join(
			path.dirname(new URL(import.meta.url).pathname),
			'article-post.template.hbs'
		)
		const template = await fileSystem.readFile(templatePath, 'utf-8')
		const compiled = Handlebars.compile(template)
		const html = compiled({
			title,
			imageUrl
		})
		const sanitizedHtml = sanitizeHtml(html)

		const buffer = await new ImageService().generate({
			width: 1080,
			height: 1350,
			html: sanitizedHtml
		})

		const postImageUrl = await CloudinaryService.upload({
			buffer,
			folder: ArticleImageService.INSTAGRAM_POSTS_FOLDER,
			fileName: `${Date.now()}-${title}.jpg`
		})

		return postImageUrl.secureUrl
	}

	static optimizeUrl(url: string): string {
		if (!url) {
			return undefined
		}

		return CloudinaryService.optimizeUrl({
			url,
			width: ArticleImageService.IMAGE_WIDTH,
			quality: '75'
		})
	}

	static async updateArticleImage(params: {
		article: Article
		file?: {
			buffer: Buffer
			originalname?: string
		}
		body: Record<string, unknown>
	}): Promise<void> {
		const { article, file, body } = params

		if (!file) {
			return
		}

		const previousPublicId = CloudinaryService.extractPublicId(article.image)

		if (previousPublicId) {
			await CloudinaryService.delete(previousPublicId)
		}

		const image = await CloudinaryService.upload({
			buffer: file.buffer,
			fileName: file.originalname ?? article.title,
			folder: ArticleImageService.ARTICLES_FOLDER,
			transformations: [
				{
					width: 800,
					crop: 'limit'
				},
				{
					quality: 'auto'
				},
				{
					fetch_format: 'auto'
				}
			]
		})

		body.image = image.secureUrl
	}

	static async uploadArticleImage({
		file,
		data
	}: {
		file?: Express.Multer.File
		data: CreateArticleDtoType
	}): Promise<string> {
		let image: string

		if (file) {
			const optimizedBuffer = await sharp(file.buffer)
				.resize(1200)
				.webp({ quality: 75 })
				.toBuffer()

			const uploadResult = await CloudinaryService.upload({
				buffer: optimizedBuffer,
				fileName: file.originalname,
				folder: ArticleImageService.ARTICLES_FOLDER
			})

			image = uploadResult.secureUrl
		} else if (data.image) {
			image = data.image
		} else {
			throw new BadRequestError(ErrorCode.IMAGE_NOT_FOUND)
		}

		return image
	}

	static async deleteArticleImage(article: Article): Promise<void> {
		if (article.image) {
			const publicId = CloudinaryService.extractPublicId(article.image)

			if (publicId) {
				await CloudinaryService.delete(publicId)
			}
		}
	}
}
