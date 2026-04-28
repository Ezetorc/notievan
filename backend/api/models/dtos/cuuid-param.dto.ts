import * as z from 'zod'

export const CUIDParamDto = z.object({
	id: z
		.string()
		.trim()
		.regex(/^[a-z0-9]+$/i)
})
