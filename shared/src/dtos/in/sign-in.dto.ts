import * as z from 'zod'

export const SignInDto = z.object({
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

export type SignInDtoType = z.infer<typeof SignInDto>
