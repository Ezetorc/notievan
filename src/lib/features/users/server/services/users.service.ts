import { error } from '@sveltejs/kit'
import { UsersRepository } from '../repositories/users.repository'
import type { JWTUser } from '../models/jwt-user.model'
import { Cursor } from 'server/models/cursor.model'
import { ErrorCode } from 'shared/models/error-code.model'
import type { PaginatedResult } from 'shared/models/paginated-result.model'
import type { UserRole } from 'users/models/user-role.model'
import type { User } from '../models/user.model'
import type { UpdateUserSchema } from 'users/schemas/update-user.schema'

export class UsersService {
	static async getById(id: string): Promise<User> {
		const user = await UsersRepository.findById(id)

		if (!user) {
			throw error(404, ErrorCode.USER_NOT_FOUND)
		}

		return user
	}

	static async getJwtUserById(id: string): Promise<JWTUser> {
		const user = await UsersRepository.findAuthUserById(id)

		if (!user) {
			throw error(404, ErrorCode.USER_NOT_FOUND)
		}

		return user
	}

	static async getAll({
		limit,
		cursor
	}: {
		limit: number
		cursor?: string | null
	}): Promise<PaginatedResult<User>> {
		const decodedCursor = cursor ? Cursor.decode(cursor) : undefined
		const users = await UsersRepository.findAll(limit, decodedCursor)
		const lastUser = users.at(-1)
		const nextCursor = Cursor.encodedFrom(lastUser)

		return {
			data: users,
			nextCursor
		}
	}

	static async update(
		id: string,
		data: UpdateUserSchema,
		role: UserRole
	): Promise<User> {
		const user = await UsersService.getById(id)
		const nameWannaBeUpdated = data.name && data.name !== user.name

		if (nameWannaBeUpdated) {
			const existingUser = await UsersRepository.findByName(data.name!)
			const nameAlreadyExists = existingUser && existingUser.id !== id

			if (nameAlreadyExists) {
				throw error(409, ErrorCode.NAME_IN_USE)
			}
		}

		const roleWannaBeUpdated = data.role && data.role !== user.role

		if (roleWannaBeUpdated) {
			if (role !== 'ADMIN') {
				throw error(403, ErrorCode.FORBIDDEN)
			}
		}

		const updatedUser = await UsersRepository.update(id, data)

		if (!updatedUser) {
			throw error(500, ErrorCode.UNEXPECTED_ERROR)
		}

		return updatedUser
	}
}
