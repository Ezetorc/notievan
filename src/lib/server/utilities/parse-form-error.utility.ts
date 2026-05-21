import { fail, isHttpError } from '@sveltejs/kit'
import { ZodError } from 'zod'
import { isErrorCode } from '../../shared/utilities/is-error-code.utility'
import { ErrorCode } from 'shared/models/error-code.model'

export function parseFormError(error: unknown) {
	if (error instanceof ZodError) {
		return fail(400, {
			error: error.issues[0]
		})
	}

	if (isHttpError(error)) {
		return fail(error.status, {
			error: error.body.message
		})
	}

	if (error instanceof Error) {
		if (isErrorCode(error.message)) {
			return fail(400, {
				error: error.message
			})
		}
	}

	return fail(500, {
		error: ErrorCode.UNEXPECTED_ERROR
	})
}
