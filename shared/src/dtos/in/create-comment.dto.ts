import * as z from 'zod'

export const CreateCommentDto = z.object({
	content: z
		.string()
		.trim()
		.min(1)
		.max(255),
	articleId: z.string().trim()
})

export type CreateCommentType = z.infer<typeof CreateCommentDto>
