import jwt from 'jsonwebtoken'
import { env } from '../configuration/env.configuration.js'
import bcrypt from 'bcrypt'
import { UsersRepository } from '../repositories/users.repository.js'
import { UnauthorizedError } from '../models/errors/unauthorized.error.js'
import { ConflictError } from '../models/errors/conflict.error.js'
import type { User } from '@prisma/client'

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

	static async register(name: string, email: string, password: string) {
		const existingEmail = await UsersRepository.findByEmail(email)
		if (existingEmail) throw new ConflictError('Email en uso')

		const existingName = await UsersRepository.findByName(name)
		if (existingName) throw new ConflictError('Nombre en uso')

		const hashedPassword = await bcrypt.hash(password, 10)
		const user = await UsersRepository.create({
			name,
			email,
			password: hashedPassword
		})
		const token = await AuthService.getAuthorizationToken(user)

		return { user, token }
	}

	static async login(email: string, password: string) {
		const user = await UsersRepository.findByEmail(email)

		if (!user) throw new UnauthorizedError('Email incorrecto')

		const isPasswordValid = await bcrypt.compare(password, user.password)

		if (!isPasswordValid) throw new UnauthorizedError('Contraseña incorrecta')

		const token = await AuthService.getAuthorizationToken(user)

		return { user, token }
	}
}
