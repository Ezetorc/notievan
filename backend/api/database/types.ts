import type { InferSelectModel, InferInsertModel, InferEnum } from 'drizzle-orm'
import type { users, articles, comments, userRole } from './schema.js'

export type UpdateUser = Partial<NewUser>
export type AuthUser = Pick<User, 'id' | 'role'>
export type UpdateArticle = Partial<NewArticle>
export type ArticlePreview = Omit<Article, 'content'>
export type UpdateComment = Partial<NewComment>
export type UserRole = InferEnum<typeof userRole>
export type EntityId = string
export type User = InferSelectModel<typeof users>
export type NewUser = InferInsertModel<typeof users>
export type Article = InferSelectModel<typeof articles>
export type NewArticle = InferInsertModel<typeof articles>
export type Comment = InferSelectModel<typeof comments>
export type NewComment = InferInsertModel<typeof comments>
export type Pagination = {
	limit: number
	offset: number
}
