import type { Request, Response, NextFunction } from 'express'
import { CustomError } from '../models/errors/custom.error.js'
import { getErrorMessage } from '../utilities/get-error-message.utility.js'
import { ZodError } from 'zod'

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
		return response.status(500).json({ error: errorMessage })
	}
}
