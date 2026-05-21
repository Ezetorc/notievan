import { string, object } from 'zod'

export const CUIDParamSchema = object({
	id: string()
		.trim()
		.regex(/^[a-z0-9]+$/i)
})
