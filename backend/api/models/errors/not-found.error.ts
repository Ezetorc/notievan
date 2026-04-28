import { CustomError } from './custom.error.js'

export class NotFoundError extends CustomError {
	constructor(value?: any) {
		super(value || 'Not Found', 404)
	}
}
