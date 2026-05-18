import type { ErrorCode } from 'shared/models/error-code.model'
import { ERROR_MESSAGES } from '$lib/configuration/error-messages.configuration'

export function parseErrorCode(error: ErrorCode): string {
	return ERROR_MESSAGES[error]
}
