import type { Article } from '../../../../../shared/src/models/article.model.js'
import cloudinary from './cloudinary.configuration.js'

export class CloudinaryService {
	private static readonly WIDTH = 800

	static async upload(
		buffer: Buffer,
		fileName: string,
		folder = 'articles'
	): Promise<{
		secureUrl: string
		publicId: string
	}> {
		const result = await CloudinaryService.uploadStream(buffer, {
			folder,
			public_id: `${Date.now()}-${fileName}`,
			resource_type: 'image',
			transformation: CloudinaryService.buildTransformations()
		})

		return {
			secureUrl: result.secure_url,
			publicId: result.public_id
		}
	}

	static async delete(publicId: string): Promise<void> {
		await CloudinaryService.destroy(publicId)
	}

	static async updateImage(params: {
		article: Article
		file?: {
			buffer: Buffer
			originalname?: string
		}
		body: Record<string, unknown>
	}) {
		const { file, article, body } = params

		if (!file) {
			return
		}

		await CloudinaryService.deletePrevious(article.image)

		const image = await CloudinaryService.upload(
			file.buffer,
			file.originalname ?? article.title
		)

		body.image = image.secureUrl
	}

	private static uploadStream(buffer: Buffer, options: any) {
		return new Promise<any>((resolve, reject) => {
			const stream = cloudinary.uploader.upload_stream(options, (err, res) =>
				err || !res ? reject(err) : resolve(res)
			)

			stream.end(buffer)
		})
	}

	private static destroy(publicId: string) {
		return new Promise<void>((resolve, reject) => {
			cloudinary.uploader.destroy(publicId, (err) =>
				err ? reject(err) : resolve()
			)
		})
	}

	private static async deletePrevious(url?: string | null) {
		const id = CloudinaryService.extractPublicId(url)
		if (!id) {
			return
		}

		await CloudinaryService.delete(id)
	}

	static extractPublicId(url?: string | null): string | null {
		if (!url) {
			return null
		}

		const match = url.match(
			/\/upload\/(?:v\d+\/)?(.+)\.(jpg|jpeg|png|gif|webp)$/
		)

		return match?.[1] ? decodeURIComponent(match[1]) : null
	}

	private static buildTransformations() {
		return [
			{ width: CloudinaryService.WIDTH, crop: 'limit' },
			{ quality: 'auto' },
			{ fetch_format: 'auto' }
		]
	}

	static optimizeUrl(url: string): string {
		if (!url.includes('/upload/')) {
			return url
		}

		return url.replace(
			'/upload/',
			`/upload/f_auto,q_auto,w_${CloudinaryService.WIDTH}/`
		)
	}
}
