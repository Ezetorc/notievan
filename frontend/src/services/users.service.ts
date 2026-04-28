import { HttpClient } from '../models/http-client.model'
import type { UserRole } from '../../../shared/src/models/user-role.model.js'
import type { UserOut } from '../../../shared/src/dtos/out/user-out.dto.js'

type GetAllUsersParams = {
	page?: number
	limit?: number
}

type UpdateUserData = {
	name: string
}

export class UsersService {
	private static readonly API_BASE = '/users'

	static async getNameOfUser(id?: string): Promise<string> {
		if (!id) return ''

		const response = await HttpClient.get<string>(
			`${UsersService.API_BASE}/${id}/name`
		)

		if (response.error) {
			throw new Error(response.error || 'Error obteniendo nombre de usuario')
		}

		return response.data || ''
	}

	static async getById(id: string): Promise<UserOut> {
		const response = await HttpClient.get<UserOut>(
			`${UsersService.API_BASE}/${id}`
		)

		if (response.error) {
			throw new Error(response.error || 'Error obteniendo usuario')
		}

		if (!response.data) {
			throw new Error('No se encontró el usuario')
		}

		return response.data
	}

	static async updateRole(id: string, role: UserRole): Promise<void> {
		const response = await HttpClient.patch<{ success: boolean }>(
			`${UsersService.API_BASE}/${id}/role`,
			{ role }
		)

		if (response.error) {
			throw new Error(response.error || 'Error actualizando rol de usuario')
		}
	}

	static async update(id: string, data: UpdateUserData): Promise<void> {
		const response = await HttpClient.patch<{ success: boolean }>(
			`${UsersService.API_BASE}/${id}`,
			data
		)

		if (response.error) {
			throw new Error(response.error || 'Error actualizando usuario')
		}
	}

	static async getAll({
		page = 1,
		limit = 4
	}: GetAllUsersParams = {}): Promise<UserOut[]> {
		const response = await HttpClient.get<UserOut[]>(
			`${UsersService.API_BASE}?page=${page}&limit=${limit}`
		)

		return response.data ?? []
	}
}
