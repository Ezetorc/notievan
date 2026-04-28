import * as z from 'zod'

export const UpdateUserDto = z.object({
	name: z
		.string()
		.trim()
		.min(3)
		.max(50)
})

export type UpdateUserDtoType = z.infer<typeof UpdateUserDto>
