import jwt from 'jsonwebtoken'
import { env } from '../configuration/env.configuration.js'
import bcrypt from 'bcrypt'
import { UsersRepository } from '../users/users.repository.js'
import type { User } from '../../../shared/src/models/user.model.js'
import { ErrorCode } from '../../../shared/src/models/error-code.model.js'
import { UnauthorizedError } from '../errors/unauthorized.error.js'
import { ConflictError } from '../errors/conflict.error.js'

export class AuthService {
	static async getAuthorizationToken(user: User) {
		return jwt.sign(
			{
				sub: user.id,
				email: user.email,
				role: user.role
			},
			env.jwt.secret,
			{ expiresIn: env.jwt.expiresIn as any }
		)
	}

	static async signUp(name: string, email: string, password: string) {
		const existingEmail = await UsersRepository.findByEmail(email)
		if (existingEmail) throw new ConflictError(ErrorCode.EMAIL_IN_USE)

		const existingName = await UsersRepository.findByName(name)
		if (existingName) throw new ConflictError(ErrorCode.NAME_IN_USE)

		const hashedPassword = await bcrypt.hash(password, 10)
		const user = await UsersRepository.create({
			name,
			email,
			password: hashedPassword
		})
		const token = await AuthService.getAuthorizationToken(user)

		return { user, token }
	}

	static async signIn(email: string, password: string) {
		const user = await UsersRepository.findByEmail(email)

		if (!user) throw new UnauthorizedError(ErrorCode.WRONG_EMAIL)

		const isPasswordValid = await bcrypt.compare(password, user.password)

		if (!isPasswordValid) throw new UnauthorizedError(ErrorCode.WRONG_PASSWORD)

		const token = await AuthService.getAuthorizationToken(user)

		return { user, token }
	}
}
