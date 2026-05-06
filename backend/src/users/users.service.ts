import type { UpdateUserDtoType } from '../../../shared/src/dtos/in/update-user.dto.js'
import { Cursor } from '../../../shared/src/models/cursor.model.js'
import { ErrorCode } from '../../../shared/src/models/error-code.model.js'
import type { UserRole } from '../../../shared/src/models/user-role.model.js'
import { ConflictError } from '../errors/conflict.error.js'
import { NotFoundError } from '../errors/not-found.error.js'
import { UsersRepository } from './users.repository.js'

export class UsersService {
	static async getById(id: string) {
		const user = await UsersRepository.findById(id)

		if (!user) throw new NotFoundError(ErrorCode.USER_NOT_FOUND)

		return user
	}

	static async getJwtUserById(id: string) {
		const user = await UsersRepository.findAuthUserById(id)

		if (!user) {
			throw new NotFoundError(ErrorCode.USER_NOT_FOUND)
		}

		return user
	}

	static async updateRole(id: string, role: UserRole) {
		const user = await UsersRepository.updateRole(id, role)

		if (!user) throw new NotFoundError(ErrorCode.USER_NOT_FOUND)

		return user
	}

	static async getAll({ limit, cursor }: { limit: number; cursor?: string }) {
		const decodedCursor = cursor ? Cursor.decode(cursor) : undefined

		const users = await UsersRepository.findAll(limit, decodedCursor)

		const lastUser = users.at(-1)

		const nextCursor = lastUser
			? new Cursor(lastUser.createdAt, lastUser.id).encode()
			: null

		return {
			data: users,
			nextCursor
		}
	}

	static async update(id: string, data: UpdateUserDtoType) {
		const user = await UsersService.getById(id)
		const nameWannaBeUpdated = data.name && data.name !== user.name

		if (nameWannaBeUpdated) {
			const existingUser = await UsersRepository.findByName(data.name)
			const nameAlreadyExists = existingUser && existingUser.id !== id

			if (nameAlreadyExists) {
				throw new ConflictError(ErrorCode.NAME_IN_USE)
			}
		}

		const updatedUser = await UsersRepository.update(id, data)

		return updatedUser
	}
}
