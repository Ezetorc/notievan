import * as z from 'zod'

export const CreateArticleDto = z.object({
	title: z
		.string()
		.trim()
		.min(1, 'El artículo debe tener al menos 1 caracter')
		.max(50, 'El artículo debe tener menos de 50 caracteres'),
	subtitle: z
		.string()
		.trim()
		.min(1, 'El artículo debe tener al menos 1 caracter')
		.max(50, 'El artículo debe tener menos de 50 caracteres'),
	description: z
		.string()
		.trim()
		.min(1, 'El artículo debe tener al menos 1 caracter')
		.max(50, 'El artículo debe tener menos de 50 caracteres'),
	content: z
		.string()
		.trim()
		.min(1, 'El artículo debe tener al menos 1 caracter')
		.max(5000, 'El artículo debe tener menos de 5000 caracteres'),
	image: z.union([z.string(), z.any()])
})

export type CreateArticleType = z.infer<typeof CreateArticleDto>
