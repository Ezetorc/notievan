import { object, string, type infer as Infer } from 'zod'

export const CreateCommentSchema = object({
	content: string().trim().min(1).max(255),
	articleId: string().trim()
})

export type CreateCommentSchema = Infer<typeof CreateCommentSchema>
