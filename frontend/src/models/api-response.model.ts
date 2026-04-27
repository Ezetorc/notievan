export type ApiResponse<T> = {
	error?: string
	data?: T
	status?: number
}
