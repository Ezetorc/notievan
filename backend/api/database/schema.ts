import { text, timestamp, pgTable, pgEnum } from 'drizzle-orm/pg-core'

export const roleEnum = pgEnum('Role', ['USER', 'AUTHOR', 'ADMIN'])

export const users = pgTable('User', {
	id: text('id').primaryKey(),
	name: text('name').notNull().unique(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	role: roleEnum('role').default('USER').notNull()
})

export const articles = pgTable('Article', {
	id: text('id').primaryKey(),
	title: text('title').notNull(),
	subtitle: text('subtitle').notNull(),
	description: text('description').notNull(),
	content: text('content').notNull(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	authorId: text('authorId').notNull(),
	image: text('image').notNull()
})

export const comments = pgTable('Comment', {
	id: text('id').primaryKey(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	content: text('content').notNull(),
	articleId: text('articleId').notNull(),
	authorId: text('authorId').notNull()
})
