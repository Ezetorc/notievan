import * as z from 'zod'

export const CUIDParamDto = z.object({
	id: z.string().regex(/^[a-z0-9]+$/i)
})
