import { HttpClient } from '../models/http-client.model'
import type { ArticleOut } from '../../../shared/src/dtos/out/article-out.dto'
import type { ArticlePreviewOut } from '../../../shared/src/dtos/out/article-preview-out.dto'
import type { PaginatedResult } from '../../../shared/src/models/paginated-result.model'

export class ArticlesService {
	private static readonly API_BASE = '/articles'

	static async create(data: FormData): Promise<ArticleOut> {
		const response = await HttpClient.post<ArticleOut>(
			ArticlesService.API_BASE,
			data,
			{
				headers: { 'Content-Type': 'multipart/form-data' }
			}
		)

		if (response.error || !response.data) {
			const error = new Error(response.error) as Error & {
				status?: number
				payload?: unknown
			}
			error.status = response.status
			error.payload = response.data
			throw error
		}

		return response.data
	}

	static async update(data: FormData, id: string): Promise<boolean> {
		const response = await HttpClient.patch<{ success: boolean }>(
			`${ArticlesService.API_BASE}/${id}`,
			data,
			{ headers: { 'Content-Type': 'multipart/form-data' } }
		)
		if (response.error) throw new Error(response.error)
		return response.data?.success ?? false
	}

	static async delete(id: string): Promise<boolean> {
		const response = await HttpClient.delete<{ success: boolean }>(
			`${ArticlesService.API_BASE}/${id}`
		)
		return !response.error
	}

	static async getById(id: string): Promise<ArticleOut | undefined> {
		const response = await HttpClient.get<ArticleOut>(
			`${ArticlesService.API_BASE}/${id}`
		)
		return response.data
	}

	static async getAll({
		cursor,
		limit = 4
	}: {
		cursor?: string
		limit?: number
	} = {}): Promise<PaginatedResult<ArticlePreviewOut>> {
		const params = new URLSearchParams()

		if (cursor) params.append('cursor', cursor)
		params.append('limit', String(limit))

		const response = await HttpClient.get<PaginatedResult<ArticlePreviewOut>>(
			`${ArticlesService.API_BASE}?${params.toString()}`
		)

		if (response.error || !response.data) {
			const error = new Error(response.error) as Error & {
				status?: number
				payload?: unknown
			}
			error.status = response.status
			error.payload = response.data
			throw error
		}

		return response.data
	}

	static async getOwn({
		cursor,
		limit = 4
	}: {
		cursor?: string
		limit?: number
	} = {}): Promise<PaginatedResult<ArticlePreviewOut>> {
		const params = new URLSearchParams()

		if (cursor) params.append('cursor', cursor)
		params.append('limit', String(limit))

		const response = await HttpClient.get<PaginatedResult<ArticlePreviewOut>>(
			`${ArticlesService.API_BASE}/own?${params.toString()}`
		)

		if (response.error || !response.data) {
			const error = new Error(response.error) as Error & {
				status?: number
				payload?: unknown
			}
			error.status = response.status
			error.payload = response.data
			throw error
		}

		return response.data
	}
	static async getRandom({
		omitId,
		limit = 4
	}: {
		omitId: string
		limit?: number
	}): Promise<ArticlePreviewOut[]> {
		const response = await HttpClient.get<ArticlePreviewOut[]>(
			`${ArticlesService.API_BASE}/random?omit=${omitId}&limit=${limit}`
		)
		return response.data ?? []
	}
}
