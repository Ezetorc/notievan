import * as z from 'zod'

export const CreateArticleDto = z.object({
	title: z
		.string()
		.trim()
		.min(1)
		.max(50),
	subtitle: z
		.string()
		.trim()
		.min(1)
		.max(50),
	description: z
		.string()
		.trim()
		.min(1)
		.max(50),
	content: z
		.string()
		.trim()
		.min(1)
		.max(1000),
	image: z.union([z.string(), z.any()])
})

export type CreateArticleDtoType = z.infer<typeof CreateArticleDto>
