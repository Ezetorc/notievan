import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { comments } from './comments.schema'
import { users } from './users.schema'

export const articles = pgTable('article', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId()),
	authorId: text('authorId').notNull(),
	title: text('title').notNull(),
	subtitle: text('subtitle').notNull(),
	description: text('description').notNull(),
	content: text('content').notNull(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	image: text('image').notNull()
})

export const articlesRelations = relations(articles, ({ one, many }) => ({
	author: one(users, {
		fields: [articles.authorId],
		references: [users.id]
	}),
	comments: many(comments)
}))
