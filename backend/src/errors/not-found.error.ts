import type { ErrorCode } from '../../../shared/src/models/error-code.model.js'
import { CustomError } from './custom.error.js'

export class NotFoundError extends CustomError {
	constructor(code: ErrorCode) {
		super(code, 404)
	}
}
