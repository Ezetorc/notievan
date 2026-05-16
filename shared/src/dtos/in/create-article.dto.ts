import { object, string, type infer as Infer } from 'zod'

export const CreateArticleDto = object({
	title: string()
		.trim()
		.min(1)
		.max(50),
	subtitle: string()
		.trim()
		.min(1)
		.max(50),
	description: string()
		.trim()
		.min(1)
		.max(50),
	content: string()
		.trim()
		.min(1)
		.max(5000),
	image: string()
})

export type CreateArticleDtoType = Infer<typeof CreateArticleDto>
