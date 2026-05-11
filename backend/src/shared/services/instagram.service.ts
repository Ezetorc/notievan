import { env } from '../configuration/env.configuration.js'

export class InstagramService {
	private static readonly BASE_URL =
		`https://graph.facebook.com/v25.0/${env.instagram.businessAccountId}`

	private static async request<T>({
		endpoint,
		method = 'POST',
		body,
		query
	}: {
		endpoint: string
		method?: 'GET' | 'POST'
		body?: Record<string, unknown>
		query?: Record<string, unknown>
	}): Promise<T> {
		const url = new URL(`${InstagramService.BASE_URL}${endpoint}`)

		url.searchParams.set('access_token', env.instagram.accessToken)

		if (query) {
			for (const [key, value] of Object.entries(query)) {
				url.searchParams.set(key, String(value))
			}
		}

		console.log('[Instagram] Request:', {
			method,
			url: url.toString(),
			body
		})

		const response = await fetch(url.toString(), {
			method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: method === 'POST' ? JSON.stringify(body ?? {}) : undefined
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
		return await InstagramService.request<{ id: string }>({
			endpoint: '/media',
			method: 'POST',
			body: {
				image_url: params.imageUrl,
				caption: params.caption
			}
		})
	}

	private static async publishMedia(creationId: string): Promise<{
		id: string
	}> {
		return await InstagramService.request<{
			id: string
		}>({
			endpoint: '/media_publish',
			method: 'POST',
			body: {
				creation_id: creationId
			}
		})
	}

	private static async waitUntilMediaReady(creationId: string): Promise<void> {
		const maxAttempts = 10
		const delayMs = 3000

		for (let attempt = 0; attempt < maxAttempts; attempt++) {
			const response = await InstagramService.request<{
				status_code: string
			}>({
				endpoint: `/${creationId}`,
				method: 'GET',
				query: {
					fields: 'status_code'
				}
			})

			console.log('[Instagram] Media status:', response.status_code)

			if (response.status_code === 'FINISHED') {
				return
			}

			if (
				response.status_code === 'ERROR' ||
				response.status_code === 'EXPIRED'
			) {
				throw new Error(
					`Instagram media processing failed: ${response.status_code}`
				)
			}

			await new Promise((resolve) => setTimeout(resolve, delayMs))
		}

		throw new Error('Instagram media processing timeout')
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

		await InstagramService.waitUntilMediaReady(media.id)

		return await InstagramService.publishMedia(media.id)
	}
}
