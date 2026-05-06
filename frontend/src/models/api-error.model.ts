export class ApiError extends Error {
	constructor(
		message: string,
		public status: number,
		public payload?: unknown
	) {
		super(message)
	}
}
