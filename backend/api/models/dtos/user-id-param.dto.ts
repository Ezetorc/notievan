import * as z from 'zod'

export const UUIDParamDto = z.object({
	id: z.uuid()
})
