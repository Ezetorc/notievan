import { object, string, union, url, custom, type infer as Infer } from 'zod'

export const CreateArticleSchema = object({
	title: string().trim().min(1).max(50),

	subtitle: string().trim().min(1).max(50),

	description: string().trim().min(1).max(50),

	content: string().trim().min(1).max(5000),

	image: union([
		custom<File>((value) => value instanceof File && value.size > 0),

		url()
	])
})

export type CreateArticleSchema = Infer<typeof CreateArticleSchema>
