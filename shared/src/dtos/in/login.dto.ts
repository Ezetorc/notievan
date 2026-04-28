import * as z from 'zod'

export const LoginDto = z.object({
	email: z
		.email()
		.trim()
		.min(6)
		.max(100),
	password: z
		.string()
		.trim()
		.min(6)
		.max(30)
})

export type LoginDtoType = z.infer<typeof LoginDto>
