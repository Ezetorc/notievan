import { env } from '$lib/server/configuration/env.configuration'
import { json, type RequestHandler } from '@sveltejs/kit'
import { ErrorCode } from 'shared/models/error-code.model'
import { ZodError } from 'zod'

export function endpoint(handler: RequestHandler): RequestHandler {
	return async (event) => {
		try {
			return await handler(event)
		} catch (error) {
			console.error('[ErrorHandler]: ', error)

			if (error instanceof ZodError) {
				return json(
					{
						error: error.issues
					},
					{ status: 400 }
				)
			}

			const err = error as any
			const debug = {
				message: err?.message,
				stack: err?.stack,
				cause: err?.cause,
				name: err?.name
			}

			console.error('[ErrorHandlerMiddleware] (full information): ', debug)

			return json(
				{
					error: ErrorCode.UNEXPECTED_ERROR,
					...(env.showFullErrors && {
						debug
					})
				},
				{
					status: 500
				}
			)
		}
	}
}
