import { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import axios from 'axios'
import { env } from '../configuration/env.configuration'
import { SessionService } from '../services/session.service'
import type { ApiResponse } from './api-response.model'

export class HttpClient {
	static async request<T = any>(
		config: AxiosRequestConfig
	): Promise<ApiResponse<T>> {
		try {
			const token = SessionService.token
			const response: AxiosResponse<T> = await axios({
				...config,
				url: `${env.baseUrl}${config.url}`,
				headers: {
					'Content-Type': 'application/json',
					...config.headers,
					...(token ? { Authorization: `Bearer ${token}` } : {})
				}
			})

			return { data: response.data, status: response.status }
		} catch (error) {
			if (error instanceof AxiosError) {
				const errorMessage =
					error.response?.data?.error ||
					error.response?.data?.message ||
					error.message ||
					'Ocurrió un error inesperado'

				console.error('API Error:', {
					url: config.url,
					method: config.method,
					status: error.response?.status,
					error: errorMessage,
					response: error.response?.data
				})

				return {
					error: errorMessage,
					status: error.response?.status,
					data: error.response?.data
				}
			}

			console.error('Unexpected error:', error)
			return { error: 'Ocurrió un error inesperado' }
		}
	}

	static async get<T>(url: string, config?: AxiosRequestConfig) {
		return await HttpClient.request<T>({ ...config, method: 'GET', url })
	}

	static async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
		return await HttpClient.request<T>({ ...config, method: 'POST', url, data })
	}

	static async patch<T>(url: string, data?: any, config?: AxiosRequestConfig) {
		return await HttpClient.request<T>({
			...config,
			method: 'PATCH',
			url,
			data
		})
	}

	static async delete<T>(url: string, config?: AxiosRequestConfig) {
		return await HttpClient.request<T>({ ...config, method: 'DELETE', url })
	}
}
