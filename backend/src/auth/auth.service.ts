import jwt from 'jsonwebtoken'
import { env } from '../shared/configuration/env.configuration.js'
import bcrypt from 'bcrypt'
import { UsersRepository } from '../users/users.repository.js'
import type { User } from '../../../shared/src/models/user.model.js'
import { ErrorCode } from '../../../shared/src/models/error-code.model.js'
import { UnauthorizedError } from '../errors/unauthorized.error.js'
import { ConflictError } from '../errors/conflict.error.js'

export class AuthService {
	static async getAuthorizationToken(user: User): Promise<string> {
		const payload = {
			sub: user.id,
			email: user.email,
			role: user.role
		}

		return jwt.sign(payload, env.jwt.secret, {
			expiresIn: env.jwt.expiresIn as any
		})
	}

	static async hash(input: string): Promise<string> {
		return await bcrypt.hash(input, 10)
	}

	static async compare(
		first_input: string,
		second_input: string
	): Promise<boolean> {
		return bcrypt.compare(first_input, second_input)
	}

	static async signUp(
		name: string,
		email: string,
		password: string
	): Promise<{ user: User; token: string }> {
		const existingEmail = await UsersRepository.findByEmail(email)

		if (existingEmail) {
			throw new ConflictError(ErrorCode.EMAIL_IN_USE)
		}

		const existingName = await UsersRepository.findByName(name)

		if (existingName) {
			throw new ConflictError(ErrorCode.NAME_IN_USE)
		}

		const hashedPassword = await AuthService.hash(password)
		const user = await UsersRepository.create({
			name,
			email,
			password: hashedPassword
		})
		const token = await AuthService.getAuthorizationToken(user)

		return { user, token }
	}

	static async signIn(
		email: string,
		password: string
	): Promise<{ user: User; token: string }> {
		const user = await UsersRepository.findByEmail(email)

		if (!user) {
			throw new UnauthorizedError(ErrorCode.WRONG_EMAIL)
		}

		const isPasswordValid = await AuthService.compare(password, user.password)

		if (!isPasswordValid) {
			throw new UnauthorizedError(ErrorCode.WRONG_PASSWORD)
		}

		const token = await AuthService.getAuthorizationToken(user)

		return { user, token }
	}
}
