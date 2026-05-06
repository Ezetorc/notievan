import { beforeEach, describe, expect, it, vi } from 'vitest'
import { userMock } from './users.mock.js'
import { UsersService } from './users.service.js'
import { UsersController } from './users.controller.js'
import { UserOut } from '../../../shared/src/dtos/out/user-out.dto.js'
import { UnauthorizedError } from '../errors/unauthorized.error.js'
import { userRoles } from '../../../shared/src/models/user-role.model.js'

describe('UsersController', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	describe('getById', () => {
		it('should return a user by id', async () => {
			const mockRequest = {
				params: { id: userMock.id },
				user: { id: userMock.id }
			} as any
			const mockResponse = { json: vi.fn() } as any

			vi.spyOn(UsersService, 'getById').mockResolvedValue(userMock)

			await UsersController.getById(mockRequest, mockResponse)

			expect(UsersService.getById).toHaveBeenCalledWith(userMock.id)
			expect(mockResponse.json).toHaveBeenCalledWith(new UserOut(userMock))
		})

		it('should return UnauthorizedError if user tries to get another user', async () => {
			const mockRequest = {
				params: { id: userMock.id },
				user: { id: 'another-user-id' }
			} as any
			const mockResponse = { json: vi.fn() } as any

			vi.spyOn(UsersService, 'getById').mockResolvedValue(userMock)

			await expect(
				UsersController.getById(mockRequest, mockResponse)
			).rejects.toBeInstanceOf(UnauthorizedError)
		})
	})

	describe('update', () => {
		it('should update a user', async () => {
			const mockRequest = {
				params: { id: userMock.id },
				user: { id: userMock.id },
				body: { name: 'New Name' }
			} as any
			const mockResponse = { json: vi.fn() } as any

			vi.spyOn(UsersService, 'update').mockResolvedValue(userMock)

			await UsersController.update(mockRequest, mockResponse)

			expect(UsersService.update).toHaveBeenCalledWith(
				userMock.id,
				mockRequest.body
			)
			expect(mockResponse.json).toHaveBeenCalledWith(new UserOut(userMock))
		})

		it('should throw UnauthorizedError if user tries to update another user', async () => {
			const mockRequest = {
				params: { id: userMock.id },
				user: { id: 'another-user-id' },
				body: { name: 'New Name' }
			} as any
			const mockResponse = { json: vi.fn() } as any

			vi.spyOn(UsersService, 'update').mockResolvedValue(userMock)

			await expect(
				UsersController.update(mockRequest, mockResponse)
			).rejects.toBeInstanceOf(UnauthorizedError)
		})
	})

	describe('updateRole', () => {
		it('should update a user role', async () => {
			const mockRequest = {
				params: { id: userMock.id },
				user: { id: userMock.id },
				body: { role: userRoles[1] }
			} as any
			const mockResponse = { json: vi.fn() } as any

			vi.spyOn(UsersService, 'updateRole').mockResolvedValue(userMock)

			await UsersController.updateRole(mockRequest, mockResponse)

			expect(UsersService.updateRole).toHaveBeenCalledWith(
				userMock.id,
				mockRequest.body.role
			)
			expect(mockResponse.json).toHaveBeenCalledWith(new UserOut(userMock))
		})
	})

	describe('getAll', () => {
		it('should return all users', async () => {
			const mockRequest = {
				user: { id: userMock.id },
				query: { limit: '4' }
			} as any
			const mockResponse = { json: vi.fn() } as any

			vi.spyOn(UsersService, 'getAll').mockResolvedValue({
				data: [userMock],
				nextCursor: null
			})

			await UsersController.getAll(mockRequest, mockResponse)

			expect(UsersService.getAll).toHaveBeenCalled()
		})
	})
})
