import * as z from 'zod'

export const CreateCommentDto = z.object({
	content: z
		.string()
		.trim()
		.min(1, 'El comentario debe tener al menos 1 caracter')
		.max(255, 'El comentario debe tener menos de 255 caracteres'),
	articleId: z.string().trim()
})

export type CreateCommentType = z.infer<typeof CreateCommentDto>
