import jwt, { type JwtPayload } from 'jsonwebtoken'
import { env } from '../configuration/env.configuration.js'
import { UnauthorizedError } from '../../errors/unauthorized.error.js'
import { ErrorCode } from '../../../../shared/src/models/error-code.model.js'

export class JwtService {
	static verify(input: string): JwtPayload {
		return jwt.verify(input, env.jwt.secret, {
			algorithms: ['HS256']
		}) as JwtPayload
	}

	static validate(token: string): JwtPayload {
		try {
			const payload = JwtService.verify(token)

			if (!payload.sub) {
				throw new UnauthorizedError(ErrorCode.INVALID_TOKEN)
			}

			return payload
		} catch {
			throw new UnauthorizedError(ErrorCode.INVALID_TOKEN)
		}
	}
}
