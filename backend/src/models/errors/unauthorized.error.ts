import type { ErrorCode } from '../../../../shared/src/models/error-code.model.js'
import { CustomError } from './custom.error.js'

export class UnauthorizedError extends CustomError {
	constructor(code: ErrorCode) {
		super(code, 401)
	}
}
