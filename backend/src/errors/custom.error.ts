import type { ErrorCode } from '../../../shared/src/models/error-code.model.js'

export class CustomError {
	code: number
	value: ErrorCode

	constructor(value: ErrorCode, status?: number) {
		this.value = value
		this.code = status || 500
	}
}
