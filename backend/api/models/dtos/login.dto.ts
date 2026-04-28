import * as z from 'zod'

export const LoginDto = z.object({
	email: z
		.email()
		.trim()
		.min(6, 'El email debe tener al menos 6 caracteres')
		.max(100, 'El email debe tener menos de 100 caracteres'),
	password: z
		.string()
		.trim()
		.min(6, 'La contraseña debe tener al menos 6 caracteres')
		.max(30, 'La contraseña debe tener menos de 30 caracteres')
})

export type LoginDtoType = z.infer<typeof LoginDto>
