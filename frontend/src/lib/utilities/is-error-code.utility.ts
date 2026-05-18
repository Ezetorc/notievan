import { ErrorCode } from 'shared/models/error-code.model'

export function isErrorCode(value: any): value is ErrorCode {
	return Object.values(ErrorCode).includes(value)
}
