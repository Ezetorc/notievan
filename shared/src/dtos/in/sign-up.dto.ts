import * as z from 'zod'

export const SignUpDto = z.object({
	email: z
		.email()
		.trim()
		.min(6)
		.max(100),

	password: z
		.string()
		.trim()
		.min(6)
		.max(30),

	name: z
		.string()
		.trim()
		.min(3)
		.max(50)
		.transform((name) => name.replace(/\b\w/g, (char) => char.toUpperCase()))
})

export type SignUpDtoType = z.infer<typeof SignUpDto>
