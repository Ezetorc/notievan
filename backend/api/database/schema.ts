import { createId } from '@paralleldrive/cuid2'
import { text, timestamp, pgTable, pgEnum } from 'drizzle-orm/pg-core'

export const roleEnum = pgEnum('Role', ['USER', 'AUTHOR', 'ADMIN'])

export const users = pgTable('user', {
	id: text('id').primaryKey().$defaultFn(() => createId()),
	name: text('name').notNull().unique(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	role: roleEnum('role').default('USER').notNull()
})

export const articles = pgTable('article', {
	id: text('id').primaryKey().$defaultFn(() => createId()),
	authorId: text('authorId').notNull(),
	title: text('title').notNull(),
	subtitle: text('subtitle').notNull(),
	description: text('description').notNull(),
	content: text('content').notNull(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	image: text('image').notNull()
})

export const comments = pgTable('comment', {
	id: text('id').primaryKey().$defaultFn(() => createId()),
	articleId: text('articleId').notNull(),
	authorId: text('authorId').notNull(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	content: text('content').notNull(),
})
