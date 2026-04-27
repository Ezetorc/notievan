import type { Role } from '../database/types.js'
import type { UpdateUserDtoType } from '../models/dtos/update-user.dto.js'
import { ConflictError } from '../models/errors/conflict.error.js'
import { NotFoundError } from '../models/errors/not-found.error.js'
import { UsersRepository } from '../repositories/users.repository.js'

export class UsersService {
	static async getById(id: string) {
		const user = await UsersRepository.findById(id)

		if (!user) throw new NotFoundError('Usuario no encontrado')

		return user
	}

	static async getNameById(id: string) {
		const name = await UsersRepository.findNameById(id)

		if (!name) throw new NotFoundError('Usuario no encontrado')

		return name
	}

	static async updateRole(id: string, role: Role) {
		const user = await UsersRepository.updateRole(id, role)

		if (!user) throw new NotFoundError('Usuario no encontrado')

		return user
	}

	static async getAll(limit: number, skip: number) {
		return await UsersRepository.findAll(limit, skip)
	}

	static async update(id: string, data: UpdateUserDtoType) {
		const user = await UsersRepository.findById(id)
		if (!user) throw new NotFoundError('Usuario no encontrado')

		if (data.name && data.name !== user.name) {
			const existingUser = await UsersRepository.findByName(data.name)

			if (existingUser && existingUser.id !== id) {
				throw new ConflictError('El nombre de usuario ya está en uso')
			}
		}

		const updatedUser = await UsersRepository.update(id, data)

		return updatedUser
	}
}
