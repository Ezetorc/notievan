import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { env } from '$lib/server/configuration/env.configuration'
import { error } from '@sveltejs/kit'
import { ErrorCode } from 'shared/models/error-code.model'
import type { User } from 'users/server/models/user.model'
import { UsersRepository } from 'users/server/repositories/users.repository'

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
			throw error(409, ErrorCode.EMAIL_IN_USE)
		}

		const existingName = await UsersRepository.findByName(name)

		if (existingName) {
			throw error(409, ErrorCode.NAME_IN_USE)
		}

		const hashedPassword = await AuthService.hash(password)
		const user = await UsersRepository.create({
			name,
			email,
			password: hashedPassword
		})

		if (!user) {
			throw error(500, ErrorCode.UNEXPECTED_ERROR)
		}

		const token = await AuthService.getAuthorizationToken(user)

		return { user, token }
	}

	static async signIn(
		email: string,
		password: string
	): Promise<{ user: User; token: string }> {
		const user = await UsersRepository.findByEmail(email)

		if (!user) {
			throw error(401, ErrorCode.WRONG_EMAIL)
		}

		const isPasswordValid = await AuthService.compare(password, user.password)

		if (!isPasswordValid) {
			throw error(401, ErrorCode.WRONG_PASSWORD)
		}

		const token = await AuthService.getAuthorizationToken(user)

		return { user, token }
	}
}
