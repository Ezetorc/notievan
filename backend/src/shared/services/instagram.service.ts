import { env } from '../configuration/env.configuration.js'

type InstagramApiResponse<T> = T & {
	error?: {
		message: string
	}
}

export class InstagramService {
	private static readonly BASE_URL =
		`https://graph.facebook.com/v25.0/${env.instagram.businessAccountId}`

	private static async request<T>(
		endpoint: string,
		body: Record<string, unknown>
	): Promise<T> {
		const response = await fetch(`${InstagramService.BASE_URL}${endpoint}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				...body,
				access_token: env.instagram.accessToken
			})
		})

		const data = (await response.json()) as InstagramApiResponse<T>

		if (!response.ok) {
			throw new Error(data.error?.message ?? 'Instagram API error')
		}

		return data
	}

	private static async createMedia(params: {
		imageUrl: string
		caption: string
	}): Promise<{
		id: string
	}> {
		return await InstagramService.request('/media', {
			image_url: params.imageUrl,
			caption: params.caption
		})
	}

	private static async publishMedia(creationId: string): Promise<{
		id: string
	}> {
		return await InstagramService.request('/media_publish', {
			creation_id: creationId
		})
	}

	static async createPost(params: { imageUrl: string; caption: string }) {
		const media = await InstagramService.createMedia({
			imageUrl: params.imageUrl,
			caption: params.caption
		})

		return await InstagramService.publishMedia(media.id)
	}
}
