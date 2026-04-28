import * as z from 'zod'

export const OmitIdParamDto = z.object({
	omit: z.string().regex(/^[a-z0-9]+$/i)
})
