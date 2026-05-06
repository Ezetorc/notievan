import type { UserOut } from '../../../shared/src/dtos/out/user-out.dto.js'
import type { PaginatedResult } from '../../../shared/src/models/paginated-result.model.js'
import type { UserRole } from '../../../shared/src/models/user-role.model.js'
import type { UpdateUserDtoType } from '../../../shared/src/dtos/in/update-user.dto.js'
import { HttpClient } from '../models/http-client.model'

export class UsersService {
	private static readonly BASE = '/users'

	static getById(id: string): Promise<UserOut> {
		return HttpClient.get<UserOut>(`${UsersService.BASE}/${id}`)
	}

	static updateRole(id: string, role: UserRole): Promise<boolean> {
		return HttpClient.patch<boolean>(`${UsersService.BASE}/${id}/role`, {
			role
		})
	}

	static update(id: string, data: UpdateUserDtoType): Promise<boolean> {
		return HttpClient.patch<boolean>(`${UsersService.BASE}/${id}`, data)
	}

	static async getAll({
		cursor,
		limit = 4
	}: {
		cursor?: string
		limit?: number
	} = {}): Promise<PaginatedResult<UserOut>> {
		const params = new URLSearchParams()

		if (cursor) {
			params.set('cursor', cursor)
		}

		params.set('limit', String(limit))

		return HttpClient.get<PaginatedResult<UserOut>>(
			`${UsersService.BASE}?${params}`
		)
	}
}
