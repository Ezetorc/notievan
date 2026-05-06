import type { core } from 'zod'
import {
	fallbackMessages,
	messages
} from '../configuration/error-messages.configuration'

export function parseZodError(error: core.$ZodIssue): string {
	if (!error) {
		return 'Error de validación'
	}

	console.error('[ZodError > parseZodError] ', error)

	const field = error.path.join('.')

	return (
		messages[field]?.[error.code] ??
		fallbackMessages[error.code] ??
		'Error de validación'
	)
}
