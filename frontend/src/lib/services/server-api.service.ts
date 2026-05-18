import { env } from '$lib/configuration/env.configuration'

interface RequestOptions {
	url: string
	method: string
	body?: BodyInit | object
	headers?: HeadersInit
	json?: boolean
	token?: string
}

export class ServerApiService {
	static async request<T>({
		url,
		method,
		body,
		headers,
		json = true,
		token
	}: RequestOptions): Promise<T> {
		const finalHeaders = new Headers(headers)
		const isFormData = body instanceof FormData

		if (json && !isFormData) {
			finalHeaders.set('Content-Type', 'application/json')
		}

		if (token) {
			finalHeaders.set('Authorization', `Bearer ${token}`)
		}

		const response = await fetch(`${env.baseUrl}${url}`, {
			method,
			headers: finalHeaders,
			body:
				body == null
					? undefined
					: json && !isFormData
						? JSON.stringify(body)
						: (body as BodyInit)
		})

		const data = await response.json()

		if (!response.ok) {
			throw new Error(data.error ?? 'Request failed')
		}

		return data as T
	}

	static async get<T>({
		url,
		headers,
		token
	}: {
		url: string
		headers?: HeadersInit
		token?: string
	}): Promise<T> {
		return ServerApiService.request<T>({ url, method: 'GET', headers, token })
	}

	static async post<T>({
		url,
		body,
		headers,
		token
	}: {
		url: string
		body?: BodyInit | object
		headers?: HeadersInit
		token?: string
	}): Promise<T> {
		return ServerApiService.request<T>({
			url,
			method: 'POST',
			body,
			headers,
			token
		})
	}

	static async patch<T>({
		url,
		body,
		headers,
		token
	}: {
		url: string
		body?: BodyInit | object
		headers?: HeadersInit
		token?: string
	}): Promise<T> {
		return ServerApiService.request<T>({
			url,
			method: 'PATCH',
			body,
			headers,
			token
		})
	}

	static async delete<T>({
		url,
		headers,
		token
	}: {
		url: string
		headers?: HeadersInit
		token?: string
	}): Promise<T> {
		return ServerApiService.request<T>({
			url,
			method: 'DELETE',
			headers,
			token
		})
	}
}
