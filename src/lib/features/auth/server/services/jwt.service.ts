import jwt, { type JwtPayload } from 'jsonwebtoken'
import { error } from '@sveltejs/kit'
import { env } from '../../../../server/configuration/env.configuration'
import { ErrorCode } from 'shared/models/error-code.model'

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
				throw error(401, ErrorCode.INVALID_TOKEN)
			}

			return payload
		} catch {
			throw error(401, ErrorCode.INVALID_TOKEN)
		}
	}
}
