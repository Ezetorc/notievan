import type { Request } from 'express'
import { UnauthorizedError } from '../../errors/unauthorized.error.js'
import { ErrorCode } from '../../../../shared/src/models/error-code.model.js'

export function extractTokenFromRequest(request: Request): string {
	const header = request.headers.authorization ?? request.headers.Authorization

	if (typeof header !== 'string' || !header.startsWith('Bearer ')) {
		throw new UnauthorizedError(ErrorCode.TOKEN_NOT_FOUND)
	}

	const [, token] = header.split(' ')

	if (!token) {
		throw new UnauthorizedError(ErrorCode.INVALID_TOKEN)
	}

	return token
}
