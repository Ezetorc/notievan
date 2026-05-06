import type { Request, Response, NextFunction } from 'express'
import type { UserRole } from '../../../shared/src/models/user-role.model.js'
import { UnauthorizedError } from '../errors/unauthorized.error.js'
import { ForbiddenError } from '../errors/forbidden.error.js'
import { ErrorCode } from '../../../shared/src/models/error-code.model.js'
import { JwtService } from '../shared/services/jwt.service.js'
import { extractTokenFromRequest } from './utilities/extract-token-from-request.utility.js'
import { UsersService } from '../users/users.service.js'

export function authMiddleware(...requiredRoles: UserRole[]) {
	return async (request: Request, _response: Response, next: NextFunction) => {
		const token = extractTokenFromRequest(request)
		const payload = JwtService.validate(token)

		if (!payload.sub) {
			throw new UnauthorizedError(ErrorCode.INVALID_TOKEN)
		}

		const user = await UsersService.getJwtUserById(payload.sub)
		const isAllowed =
			requiredRoles.length === 0 ||
			requiredRoles.includes(user.role) ||
			user.role === 'ADMIN'

		if (!isAllowed) {
			throw new ForbiddenError(ErrorCode.FORBIDDEN)
		}

		request.user = { id: user.id, role: user.role }
		next()
	}
}
