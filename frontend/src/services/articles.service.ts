import type { Article } from '../../../shared/models/article.model'
import { HttpClient } from '../models/http-client.model'

export class ArticlesService {
	private static readonly API_BASE = '/articles'

	static async create(data: FormData): Promise<Article> {
		const response = await HttpClient.post<Article>(
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

	static async getById(id: string): Promise<Article | undefined> {
		const response = await HttpClient.get<Article>(
			`${ArticlesService.API_BASE}/${id}`
		)
		return response.data
	}

	static async getAll({
		page = 1,
		limit = 4
	}: {
		page?: number
		limit?: number
	} = {}): Promise<Article[]> {
		const response = await HttpClient.get<Article[]>(
			`${ArticlesService.API_BASE}?page=${page}&limit=${limit}`
		)
		return response.data ?? []
	}

	static async getOwn({
		page = 1,
		limit = 4
	}: {
		page?: number
		limit?: number
	} = {}): Promise<Article[]> {
		const response = await HttpClient.get<Article[]>(
			`${ArticlesService.API_BASE}/own?page=${page}&limit=${limit}`
		)
		return response.data ?? []
	}

	static async getRandom({
		omitId,
		limit = 4
	}: {
		omitId: string
		limit?: number
	}): Promise<Article[]> {
		const response = await HttpClient.get<Article[]>(
			`${ArticlesService.API_BASE}/random?omit=${omitId}&limit=${limit}`
		)
		return response.data ?? []
	}
}
