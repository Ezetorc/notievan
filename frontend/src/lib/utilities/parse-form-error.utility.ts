import { fail } from '@sveltejs/kit'
import { ErrorCode } from 'shared/models/error-code.model'
import { ZodError } from 'zod'
import { isErrorCode } from './is-error-code.utility'

export function parseFormError(error: unknown) {
	if (error instanceof ZodError) {
		return fail(400, {
			error: error.issues[0]
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
