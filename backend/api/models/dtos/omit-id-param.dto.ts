import * as z from 'zod'

export const OmitIdParamDto = z.object({
	omit: z.string().trim().regex(/^[a-z0-9]+$/i)
})
