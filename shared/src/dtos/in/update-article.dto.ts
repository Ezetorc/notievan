import * as z from 'zod'

export const UpdateArticleDto = z.object({
	title: z.string().trim().optional(),
	subtitle: z.string().trim().optional(),
	description: z.string().trim().optional(),
	content: z.string().trim().optional(),
	image: z.string().trim().optional()
})

export type UpdateArticleType = z.infer<typeof UpdateArticleDto>
