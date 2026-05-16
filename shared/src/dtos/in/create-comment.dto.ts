import { object, string, type infer as Infer } from 'zod'

export const CreateCommentDto = object({
  content: string()
    .trim()
    .min(1)
    .max(255),
  articleId: string().trim()
})

export type CreateCommentDtoType = Infer<typeof CreateCommentDto>
