import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { articles } from './articles.schema'
import { comments } from './comments.schema'
import { userRole } from './user-role.schema'

export const users = pgTable('user', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId()),
	name: text('name').notNull().unique(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	role: userRole('role').default('USER').notNull()
})

export const usersRelations = relations(users, ({ many }) => ({
	articles: many(articles),
	comments: many(comments)
}))
