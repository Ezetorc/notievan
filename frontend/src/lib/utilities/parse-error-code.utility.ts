import { ERROR_MESSAGES } from '$lib/configuration/error-messages.configuration';
import type { ErrorCode } from 'shared/models/error-code.model';

export function parseErrorCode(error: ErrorCode): string {
	return ERROR_MESSAGES[error];
}
