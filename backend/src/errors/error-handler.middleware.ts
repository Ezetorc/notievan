import type { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { env } from '../configuration/env.configuration.js'
import { CustomError } from './custom.error.js'
import { getErrorMessage } from './utilities/get-error-message.utility.js'

export function errorHandlerMiddleware() {
	return (
		error: unknown,
		_request: Request,
		response: Response,
		_next: NextFunction
	) => {
		console.error('[ErrorHandlerMiddleware] Error captured: ', error)

		if (error instanceof CustomError) {
			return response.status(error.code).json({ error: error.value })
		}

		if (error instanceof ZodError) {
			return response.status(400).json({ error: error.issues })
		}

		const errorMessage = getErrorMessage(error)
		const err = error as any
		
		return response.status(500).json({
			error: errorMessage,
			...(env.showFullErrors && {
				debug: {
					message: err?.message,
					stack: err?.stack,
					cause: err?.cause,
					name: err?.name,
				},
			}),
		})
	}
}
