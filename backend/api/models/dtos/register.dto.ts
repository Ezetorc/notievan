import * as z from 'zod'

export const RegisterDto = z.object({
	email: z
		.email()
		.trim()
		.min(6, 'El email debe tener al menos 6 caracteres')
		.max(100, 'El email debe tener menos de 100 caracteres'),

	password: z
		.string()
		.trim()
		.min(6, 'La contraseña debe tener al menos 6 caracteres')
		.max(30, 'La contraseña debe tener menos de 30 caracteres'),

	name: z
		.string()
		.trim()
		.min(3, 'El nombre debe tener al menos 3 caracteres')
		.max(50, 'El nombre debe tener menos de 50 caracteres')
		.transform((name) =>
			name.replace(/\b\w/g, (char) => char.toUpperCase())
		),
})

export type RegisterDtoType = z.infer<typeof RegisterDto>
