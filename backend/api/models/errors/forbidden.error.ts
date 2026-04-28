import { CustomError } from './custom.error.js'

export class ForbiddenError extends CustomError {
	constructor(value?: any) {
		super(value || 'Forbidden', 403)
	}
}
