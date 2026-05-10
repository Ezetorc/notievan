import { env } from '../configuration/env.configuration.js'

export class InstagramService {
	private static readonly BASE_URL =
		`https://graph.facebook.com/v25.0/${env.instagram.businessAccountId}`

	private static async request<T>(
		endpoint: string,
		body: Record<string, unknown>
	): Promise<T> {
		const payload = {
			...body,
			access_token: env.instagram.accessToken
		}

		console.log('[Instagram] Request:', {
			endpoint,
			body: {
				...body,
				access_token: '[HIDDEN]'
			}
		})

		const response = await fetch(`${InstagramService.BASE_URL}${endpoint}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		})

		const text = await response.text()

		console.log('[Instagram] Raw response:', text)

		let data: any

		try {
			data = JSON.parse(text)
		} catch {
			throw new Error(`Invalid JSON response: ${text}`)
		}

		if (!response.ok) {
			console.error('[Instagram] Error:', {
				status: response.status,
				statusText: response.statusText,
				data
			})

			throw new Error(JSON.stringify(data, null, 2))
		}

		console.log('[Instagram] Success:', data)

		return data as T
	}

	private static async createMedia(params: {
		imageUrl: string
		caption: string
	}): Promise<{
		id: string
	}> {
		return await InstagramService.request<{ id: string }>('/media', {
			image_url: params.imageUrl,
			caption: params.caption
		})
	}

	private static async publishMedia(creationId: string): Promise<{
		id: string
	}> {
		return await InstagramService.request<{
			id: string
		}>('/media_publish', {
			creation_id: creationId
		})
	}

	static async createPost({
		imageUrl,
		caption
	}: {
		imageUrl: string
		caption: string
	}) {
		const media = await InstagramService.createMedia({
			imageUrl,

			caption
		})

		return await InstagramService.publishMedia(media.id)
	}
}
