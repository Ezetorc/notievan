import { backendMessages } from '../configuration/error-messages.configuration'
import { isErrorCode } from './is-error-code.utility'

export function parseBackendError(error: any): string {
	const code = error?.error || error?.response?.data?.error || error?.message

	if (isErrorCode(code)) {
		return backendMessages[code]
	}

	return 'Ocurrió un error inesperado'
}
