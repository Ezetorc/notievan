import * as z from 'zod'

export const CUIDParamDto = z.object({
	id: z
		.string()
		.trim()
		.regex(/^c[a-z0-9]{24}$/)
})
