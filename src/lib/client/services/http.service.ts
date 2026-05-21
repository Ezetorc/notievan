interface RequestOptions {
	url: string
	method: string
	body?: BodyInit | object
	headers?: HeadersInit
	json?: boolean
	fetch?: typeof fetch
}

export class HttpService {
	static async request<T>({
		url,
		method,
		body,
		headers,
		json = true,
		fetch
	}: RequestOptions): Promise<T> {
		const finalHeaders = new Headers(headers)

		const isFormData = body instanceof FormData

		if (json && !isFormData) {
			finalHeaders.set('Content-Type', 'application/json')
		}

		const response = await (fetch ?? globalThis.fetch)(url, {
			method,
			credentials: 'include',
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
		fetch
	}: {
		url: string
		headers?: HeadersInit
		fetch?: typeof globalThis.fetch
	}): Promise<T> {
		return HttpService.request<T>({ url, method: 'GET', headers, fetch })
	}

	static async post<T>({
		url,
		body,
		headers
	}: {
		url: string
		body?: BodyInit | object
		headers?: HeadersInit
	}): Promise<T> {
		return HttpService.request<T>({ url, method: 'POST', body, headers })
	}

	static async patch<T>({
		url,
		body,
		headers
	}: {
		url: string
		body?: BodyInit | object
		headers?: HeadersInit
	}): Promise<T> {
		return HttpService.request<T>({ url, method: 'PATCH', body, headers })
	}

	static async delete<T>({
		url,
		headers
	}: {
		url: string
		headers?: HeadersInit
	}): Promise<T> {
		return HttpService.request<T>({ url, method: 'DELETE', headers })
	}
}
