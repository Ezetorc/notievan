import sharp from 'sharp'
import type { Article } from '../../../shared/src/models/article.model.js'
import { BadRequestError } from '../errors/bad-request.error.js'
import { CloudinaryService } from '../shared/services/cloudinary/cloudinary.service.js'
import { ErrorCode } from '../../../shared/src/models/error-code.model.js'
import type { CreateArticleDtoType } from '../../../shared/src/dtos/in/create-article.dto.js'
import { InstagramService } from '../shared/services/instagram.service.js'
import { env } from '../shared/configuration/env.configuration.js'
import { TemplatedService } from '../shared/services/templated.service.js'

export class ArticleImageService {
	private static readonly IMAGE_WIDTH = 800
	private static readonly TEMPLATED_TEMPLATE_ID =
		'11759b87-a51b-4127-a4b7-18c2bedec2c5'

	static async generate({
		title,
		imageUrl
	}: {
		title: string
		imageUrl?: string
	}): Promise<string> {
		const result = await TemplatedService.upload({
			templateId: ArticleImageService.TEMPLATED_TEMPLATE_ID,
			layers: {
				title: {
					text: title
				},
				image: {
					image_url: imageUrl
				}
			},
			format: 'jpg'
		})

		return result.render_url
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

	static async updateImage(params: {
		article: Article
		file?: {
			buffer: Buffer
			originalname?: string
		}
		body: Record<string, unknown>
	}) {
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
			folder: 'articles',
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

	static async uploadImage({
		file,
		data
	}: {
		file?: Express.Multer.File
		data: CreateArticleDtoType
	}) {
		let image: string

		if (file) {
			const optimizedBuffer = await sharp(file.buffer)
				.resize(1200)
				.webp({ quality: 75 })
				.toBuffer()

			const uploadResult = await CloudinaryService.upload({
				buffer: optimizedBuffer,
				fileName: file.originalname,
				folder: 'articles'
			})

			image = uploadResult.secureUrl
		} else if (data.image) {
			image = data.image
		} else {
			throw new BadRequestError(ErrorCode.IMAGE_NOT_FOUND)
		}

		return image
	}

	static async deletePreviousImage(article: Article) {
		if (article.image) {
			const publicId = CloudinaryService.extractPublicId(article.image)

			if (publicId) {
				await CloudinaryService.delete(publicId)
			}
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

		const postImage = await ArticleImageService.generate({
			title,
			imageUrl
		})

		await InstagramService.createPost({
			imageUrl: postImage,
			caption: `⭐ NUEVO ARTÍCULO

    ${title}

    👉 Leer completo:
    https://notievan.vercel.app/articulos/${articleId}

    #NotiEvan #Noticias`
		})
	}
}
