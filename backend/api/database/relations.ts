import { relations } from 'drizzle-orm'
import { users, articles, comments } from './schema.js'

export const usersRelations = relations(users, ({ many }) => ({
	articles: many(articles),
	comments: many(comments)
}))

export const articlesRelations = relations(articles, ({ one, many }) => ({
	author: one(users, {
		fields: [articles.authorId],
		references: [users.id]
	}),
	comments: many(comments)
}))

export const commentsRelations = relations(comments, ({ one }) => ({
	article: one(articles, {
		fields: [comments.articleId],
		references: [articles.id]
	}),
	author: one(users, {
		fields: [comments.authorId],
		references: [users.id]
	})
}))
