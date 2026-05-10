import type { UploadApiResponse } from 'cloudinary'
import cloudinary from './cloudinary.configuration.js'

export class CloudinaryService {
	static async upload(params: {
		buffer: Buffer
		fileName: string
		folder: string
		transformations?: unknown[]
	}): Promise<{
		secureUrl: string
		publicId: string
	}> {
		const { buffer, fileName, folder, transformations = [] } = params

		const result = await CloudinaryService.uploadStream(buffer, {
			folder,
			public_id: `${Date.now()}-${fileName}`,
			resource_type: 'image',
			transformation: transformations
		})

		return {
			secureUrl: result.secure_url,
			publicId: result.public_id
		}
	}

	static async delete(publicId: string): Promise<void> {
		await CloudinaryService.destroy(publicId)
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

	static optimizeUrl(params: {
		url: string
		width?: number
		quality?: string
	}): string {
		const { url, width = 800, quality = 'auto' } = params

		if (!url.includes('/upload/')) {
			return url
		}

		return url.replace('/upload/', `/upload/f_auto,q_${quality},w_${width}/`)
	}

	private static uploadStream(
		buffer: Buffer,
		options: any
	): Promise<UploadApiResponse> {
		return new Promise<UploadApiResponse>((resolve, reject) => {
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
}
