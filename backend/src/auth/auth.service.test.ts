import { beforeEach, vi, describe, expect, it } from "vitest"
import { AuthService } from "./auth.service.js"
import { userMock } from "../users/users.mock.js"
import { UsersRepository } from "../users/users.repository.js"
import bcrypt from 'bcrypt'

vi.mock('bcrypt')

describe('ArticlesService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getAuthorizationToken', () => {
    it('should use jsonwebtoken', async () => {
      const token = await AuthService.getAuthorizationToken(userMock)

      expect(token).toBeDefined()
      expect(token).toMatch(/^[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+$/)
    })
  })

  describe('signUp', () => {
    it('should sign up a user', async () => {
      vi.spyOn(UsersRepository, 'findByEmail').mockResolvedValue(null)
      vi.spyOn(UsersRepository, 'findByName').mockResolvedValue(null)
      vi.spyOn(UsersRepository, 'create').mockResolvedValue(userMock)

      const { user, token } = await AuthService.signUp(userMock.name, userMock.email, userMock.password)

      expect(user).toBeDefined()
      expect(token).toBeDefined()
      expect(token).toMatch(/^[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+$/)
    })


  })

  describe('signIn', () => {
    it('should sign in a user', async () => {
      const compareSpy = vi.spyOn(bcrypt, 'compare') as unknown as {
        mockResolvedValue: (value: boolean) => any
      }

      compareSpy.mockResolvedValue(true)
      vi.spyOn(UsersRepository, 'findByEmail').mockResolvedValue(userMock)

      const { user, token } = await AuthService.signIn(
        userMock.email,
        userMock.password
      )

      expect(user).toBeDefined()
      expect(token).toBeDefined()
    })
  })
})
