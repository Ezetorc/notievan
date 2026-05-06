import jwt, { type JwtPayload } from 'jsonwebtoken'
import { env } from '../shared/configuration/env.configuration.js'
import type { Request, Response, NextFunction } from 'express'
import type { UserRole } from '../../../shared/src/models/user-role.model.js'
import { UnauthorizedError } from '../errors/unauthorized.error.js'
import { NotFoundError } from '../errors/not-found.error.js'
import { ForbiddenError } from '../errors/forbidden.error.js'
import { ErrorCode } from '../../../shared/src/models/error-code.model.js'
import { UsersRepository } from '../users/users.repository.js'

export function authMiddleware(...requiredRoles: UserRole[]) {
	return async (request: Request, _response: Response, next: NextFunction) => {
		const authHeader =
			request.headers.authorization || request.headers.Authorization

		if (typeof authHeader !== 'string' || !authHeader.startsWith('Bearer '))
			throw new UnauthorizedError(ErrorCode.TOKEN_NOT_FOUND)

		const tokenParts = authHeader.split(' ')
		if (tokenParts.length !== 2)
			throw new UnauthorizedError(ErrorCode.INVALID_TOKEN)

		const token = tokenParts[1]

		if (!token) throw new UnauthorizedError(ErrorCode.TOKEN_NOT_FOUND)

		let payload: JwtPayload

		try {
			payload = jwt.verify(token, env.jwt.secret, {
				algorithms: ['HS256']
			}) as JwtPayload
		} catch (error) {
			if (!(error instanceof Error)) return

			if (error.name === 'TokenExpiredError') {
				throw new UnauthorizedError(ErrorCode.INVALID_TOKEN)
			}

			throw new UnauthorizedError(ErrorCode.INVALID_TOKEN)
		}

		if (!payload.sub) {
			throw new UnauthorizedError(ErrorCode.INVALID_TOKEN)
		}

		const user = await UsersRepository.findAuthUserById(payload.sub)

		if (!user) {
			throw new NotFoundError(ErrorCode.USER_NOT_FOUND)
		}

		const hasRequiredRole =
			requiredRoles.length === 0 ||
			requiredRoles.includes(user.role) ||
			user.role === 'ADMIN'

		if (!hasRequiredRole) {
			throw new ForbiddenError(ErrorCode.FORBIDDEN)
		}

		request.user = { id: user.id, role: user.role }
		next()
	}
}
