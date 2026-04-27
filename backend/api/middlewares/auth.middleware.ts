import jwt, { type JwtPayload } from 'jsonwebtoken'
import { env } from '../configuration/env.configuration.js'
import { prisma } from '../configuration/prisma.configuration.js'
import type { Request, Response, NextFunction } from 'express'
import type { Role } from '@prisma/client'

export function authMiddleware(...requiredRoles: Role[]) {
	return async (request: Request, response: Response, next: NextFunction) => {
		const authHeader =
			request.headers.authorization || request.headers.Authorization

		if (typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
			return response.status(401).json({ error: 'Token no proporcionado' })
		}

		const tokenParts = authHeader.split(' ')
		if (tokenParts.length !== 2) {
			return response.status(401).json({ error: 'Formato de token inválido' })
		}

		const token = tokenParts[1]
		if (!token) {
			return response.status(401).json({ error: 'Token no proporcionado' })
		}

		let payload: JwtPayload
		try {
			payload = jwt.verify(token, env.jwt.secret, {
				algorithms: ['HS256']
			}) as JwtPayload
		} catch (error: unknown) {
			const jwtError = error as Error
			if (jwtError.name === 'TokenExpiredError') {
				return response.status(401).json({ error: 'Token expirado' })
			}
			return response.status(401).json({ error: 'Token inválido' })
		}

		if (!payload.sub) {
			return response
				.status(401)
				.json({ error: 'Token inválido: sub claim faltante' })
		}

		const user = await prisma.user.findUnique({
			where: { id: payload.sub },
			select: { id: true, role: true }
		})

		if (!user) {
			return response.status(404).json({ error: 'Usuario no encontrado' })
		}

		const hasRequiredRole =
			requiredRoles.length === 0 ||
			requiredRoles.includes(user.role) ||
			user.role === 'ADMIN'

		if (!hasRequiredRole) {
			return response.status(403).json({
				error: 'Acceso denegado'
			})
		}

		request.user = { id: user.id, role: user.role }
		next()
	}
}
