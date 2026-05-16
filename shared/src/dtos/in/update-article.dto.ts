import { string, object, type infer as Infer } from "zod"

export const UpdateArticleDto = object({
  title: string().trim().optional(),
  subtitle: string().trim().optional(),
  description: string().trim().optional(),
  content: string().trim().optional(),
  image: string().trim().optional()
}).strict()

export type UpdateArticleDtoType = Infer<typeof UpdateArticleDto>
