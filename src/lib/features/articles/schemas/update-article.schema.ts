import { string, object, type infer as Infer, union, custom, url } from 'zod'

export const UpdateArticleSchema = object({
	title: string().trim().optional(),
	subtitle: string().trim().optional(),
	description: string().trim().optional(),
	content: string().trim().optional(),
	image: union([
		custom<File>((value) => value instanceof File && value.size > 0),
		url()
	]).optional()
}).strict()

export type UpdateArticleSchema = Infer<typeof UpdateArticleSchema>
