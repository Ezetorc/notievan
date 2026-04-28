import jwt, { type JwtPayload } from 'jsonwebtoken'
import { env } from '../configuration/env.configuration.js'
import type { Request, Response, NextFunction } from 'express'
import { UsersRepository } from '../repositories/users.repository.js'
import type { UserRole } from '../../../shared/src/models/user-role.model.js'
import { UnauthorizedError } from '../models/errors/unauthorized.error.js'
import { NotFoundError } from '../models/errors/not-found.error.js'
import { ForbiddenError } from '../models/errors/forbidden.error.js'

export function authMiddleware(...requiredRoles: UserRole[]) {
	return async (request: Request, response: Response, next: NextFunction) => {
		const authHeader =
			request.headers.authorization || request.headers.Authorization

		if (typeof authHeader !== 'string' || !authHeader.startsWith('Bearer '))
			throw new UnauthorizedError("Token not found")


		const tokenParts = authHeader.split(' ')
		if (tokenParts.length !== 2)
			throw new UnauthorizedError("Invalid token format")


		const token = tokenParts[1]

		if (!token)
			throw new UnauthorizedError("Token not found")


		let payload: JwtPayload
		
		try {
			payload = jwt.verify(token, env.jwt.secret, {
				algorithms: ['HS256']
			}) as JwtPayload
		} catch (error) {
			if (!(error instanceof Error)) return

			if (error.name === 'TokenExpiredError') {
				throw new UnauthorizedError("Expired token")
			}

			throw new UnauthorizedError("Invalid token")
		}

		if (!payload.sub) {
			throw new UnauthorizedError("Invalid token")
		}

		const user = await UsersRepository.findAuthUserById(payload.sub)

		if (!user) {
			throw new NotFoundError("User not found")
		}

		const hasRequiredRole =
			requiredRoles.length === 0 ||
			requiredRoles.includes(user.role) ||
			user.role === 'ADMIN'

		if (!hasRequiredRole) {
			throw new ForbiddenError("Access denied")
		}

		request.user = { id: user.id, role: user.role }
		next()
	}
}
