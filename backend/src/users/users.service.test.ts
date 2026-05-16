import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { UsersRepository } from './users.repository.js'
import { userMock } from './users.mock.js'
import { UsersService } from './users.service.js'
import { NotFoundError } from '../errors/not-found.error.js'

describe('UsersService', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	describe('getById', () => {
		it('should return an user by id', async () => {
			vi.spyOn(UsersRepository, 'findById').mockResolvedValue(userMock)

			const result = await UsersService.getById(userMock.id)

			expect(result).toEqual(userMock)
		})

		it('should throw NotFoundError if user is not found', async () => {
			vi.spyOn(UsersRepository, 'findById').mockResolvedValue(null)

			await expect(UsersService.getById(userMock.id)).rejects.toBeInstanceOf(
				NotFoundError
			)
		})
	})

	describe('getAll', () => {
		it('should return all users', async () => {
			vi.spyOn(UsersRepository, 'findAll').mockResolvedValue([userMock])

			const result = await UsersService.getAll({ limit: 4 })

			expect(result).toHaveProperty('data', [userMock])
		})
	})

	describe('update', () => {
		it('should update an user', async () => {
			vi.spyOn(UsersRepository, 'update').mockResolvedValue(userMock)
			vi.spyOn(UsersService, 'getById').mockResolvedValue(userMock)

			const result = await UsersService.update(userMock.id, {
				name: 'John Carter'
			}, "ADMIN")

			expect(result).toEqual(userMock)
		})

		it('should throw a NotFound error', async () => {
			vi.spyOn(UsersRepository, 'findById').mockResolvedValue(null)

			await expect(
				UsersService.update(userMock.id, { name: 'John Carter' }, "ADMIN")
			).rejects.toBeInstanceOf(NotFoundError)
		})
	})
})
