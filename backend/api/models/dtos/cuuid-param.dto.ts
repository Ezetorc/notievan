import * as z from 'zod'

export const CUIDParamDto = z.object({
	id: z.cuid()
})
