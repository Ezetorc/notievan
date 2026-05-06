import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AuthService } from './auth.service.js'
import { userMock } from '../users/users.mock.js'
import { AuthController } from './auth.controller.js'
import { UserOut } from '../../../shared/src/dtos/out/user-out.dto.js'
import { UsersService } from '../users/users.service.js'

describe('AuthController', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	describe('signUp', () => {
		it('should create a new user', async () => {
			const expected = { user: userMock, token: 'jwt_token' }

			vi.spyOn(AuthService, 'signUp').mockResolvedValue(expected)

			const request = {
				body: {
					name: 'John Carter',
					email: 'john.carter@example.com',
					password: 'super-password'
				}
			} as any
			const response = {
				status: vi.fn().mockReturnThis(),
				json: vi.fn()
			} as any

			await AuthController.signUp(request, response)

			expect(response.status).toHaveBeenCalledWith(201)
			expect(response.json).toHaveBeenCalledWith({
				...expected,
				user: new UserOut(expected.user)
			})
		})
	})

	describe('signIn', () => {
		it('should return a user and a token', async () => {
			const expected = { user: userMock, token: 'jwt_token' }

			vi.spyOn(AuthService, 'signIn').mockResolvedValue(expected)

			const request = {
				body: { email: 'john.carter@example.com', password: 'super-password' }
			} as any
			const response = { json: vi.fn() } as any

			await AuthController.signIn(request, response)

			expect(response.json).toHaveBeenCalledWith({
				...expected,
				user: new UserOut(expected.user)
			})
		})
	})

	describe('getSelf', () => {
		it('should return the authenticated user', async () => {
			vi.spyOn(UsersService, 'getById').mockResolvedValue(userMock)

			const request = { user: { id: userMock.id } } as any
			const response = { json: vi.fn() } as any

			await AuthController.getSelf(request, response)

			expect(response.json).toHaveBeenCalledWith(new UserOut(userMock))
		})
	})
})
