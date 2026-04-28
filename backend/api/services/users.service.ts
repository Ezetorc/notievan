import type { UpdateUserDtoType } from '../../../shared/src/dtos/in/update-user.dto.js'
import { ErrorCode } from '../../../shared/src/models/error-code.model.js'
import type { UserRole } from '../../../shared/src/models/user-role.model.js'
import { ConflictError } from '../models/errors/conflict.error.js'
import { NotFoundError } from '../models/errors/not-found.error.js'
import { UsersRepository } from '../repositories/users.repository.js'

export class UsersService {
	static async getById(id: string) {
		const user = await UsersRepository.findById(id)

		if (!user) throw new NotFoundError(ErrorCode.USER_NOT_FOUND)

		return user
	}

	static async getNameById(id: string) {
		const name = await UsersRepository.findNameById(id)

		if (!name) throw new NotFoundError(ErrorCode.USER_NOT_FOUND)

		return name
	}

	static async updateRole(id: string, role: UserRole) {
		const user = await UsersRepository.updateRole(id, role)

		if (!user) throw new NotFoundError(ErrorCode.USER_NOT_FOUND)

		return user
	}

	static async getAll(limit: number, skip: number) {
		return await UsersRepository.findAll(limit, skip)
	}

	static async update(id: string, data: UpdateUserDtoType) {
		const user = await UsersService.getById(id)

		if (data.name && data.name !== user.name) {
			const existingUser = await UsersRepository.findByName(data.name)

			if (existingUser && existingUser.id !== id) {
				throw new ConflictError(ErrorCode.NAME_IN_USE)
			}
		}

		const updatedUser = await UsersRepository.update(id, data)

		return updatedUser
	}
}
