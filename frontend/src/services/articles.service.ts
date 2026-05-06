import type { ArticleOut } from '../../../shared/src/dtos/out/article-out.dto'
import type { ArticlePreviewOut } from '../../../shared/src/dtos/out/article-preview-out.dto'
import type { PaginatedResult } from '../../../shared/src/models/paginated-result.model'
import { HttpClient } from '../models/http-client.model'

export class ArticlesService {
	private static readonly BASE = '/articles'

	static async create(data: {
		title: string
		subtitle: string
		description: string
		content: string
		image: File | string
	}): Promise<ArticleOut> {
		const formData = new FormData()

		formData.append('title', data.title)
		formData.append('subtitle', data.subtitle)
		formData.append('description', data.description)
		formData.append('content', data.content)

		if (data.image instanceof File) {
			formData.append('image', data.image)
		} else {
			formData.append('image', data.image)
		}

		return HttpClient.post<ArticleOut>(ArticlesService.BASE, formData)
	}
	static delete(id: string): Promise<boolean> {
		return HttpClient.delete<boolean>(`${ArticlesService.BASE}/${id}`)
	}

	static async update(
		data: {
			title?: string
			subtitle?: string
			description?: string
			content?: string
			image?: string | File
		},
		id: string
	): Promise<boolean> {
		const formData = new FormData()

		Object.entries(data).forEach(([key, value]) => {
			if (value != null) {
				formData.append(key, value)
			}
		})

		const response = await HttpClient.patch<{
			success: boolean
		}>(`${ArticlesService.BASE}/${id}`, formData)

		return response.success
	}

	static getById(id: string): Promise<ArticleOut> {
		return HttpClient.get<ArticleOut>(`${ArticlesService.BASE}/${id}`)
	}

	static getAll(params?: {
		cursor?: string
		limit?: number
	}): Promise<PaginatedResult<ArticlePreviewOut>> {
		const search = new URLSearchParams()

		if (params?.cursor) {
			search.set('cursor', params.cursor)
		}

		search.set('limit', String(params?.limit ?? 4))

		return HttpClient.get<PaginatedResult<ArticlePreviewOut>>(
			`${ArticlesService.BASE}?${search}`
		)
	}

	static getOwn(params?: {
		cursor?: string
		limit?: number
	}): Promise<PaginatedResult<ArticlePreviewOut>> {
		const search = new URLSearchParams()

		if (params?.cursor) {
			search.set('cursor', params.cursor)
		}

		search.set('limit', String(params?.limit ?? 4))

		return HttpClient.get<PaginatedResult<ArticlePreviewOut>>(
			`${ArticlesService.BASE}/own?${search}`
		)
	}

	static getRandom(params: {
		excludeId: string
		limit?: number
	}): Promise<ArticlePreviewOut[]> {
		const search = new URLSearchParams()

		search.set('omit', params.excludeId)

		search.set('limit', String(params?.limit ?? 4))

		return HttpClient.get<ArticlePreviewOut[]>(
			`${ArticlesService.BASE}/random?${search}`
		)
	}
}
