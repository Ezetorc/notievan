import { env } from '../configuration/env.configuration'
import { SessionService } from '../services/session.service'
import { ApiError } from './api-error.model'

export class HttpClient {
	private static async request<T>(
		url: string,
		options: RequestInit & {
			body?: unknown
		} = {}
	): Promise<T> {
		const headers = new Headers(options.headers)
		const isFormData = options.body instanceof FormData
		const token = SessionService.token
		const finalUrl = url.startsWith('/')
			? `${env.baseUrl}${url}`
			: `${env.baseUrl}/${url}`

		if (!isFormData) {
			headers.set('Content-Type', 'application/json')
		}

		if (token) {
			headers.set('Authorization', `Bearer ${token}`)
		}

		const response = await fetch(finalUrl, {
			...options,
			headers,
			body: isFormData
				? (options.body as FormData)
				: options.body
					? JSON.stringify(options.body)
					: undefined
		})

		const data = await response.json().catch(() => null)

		if (!response.ok) {
			throw new ApiError(
				data?.message ?? 'Request failed',
				response.status,
				data
			)
		}

		return data
	}

	static get<T>(url: string) {
		return HttpClient.request<T>(url)
	}

	static post<T>(url: string, body?: any) {
		return HttpClient.request<T>(url, {
			method: 'POST',
			body
		})
	}

	static patch<T>(url: string, body?: any) {
		return HttpClient.request<T>(url, {
			method: 'PATCH',
			body
		})
	}

	static delete<T>(url: string) {
		return HttpClient.request<T>(url, {
			method: 'DELETE'
		})
	}
}
