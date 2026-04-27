import { text, timestamp, pgTable, pgEnum, uuid } from 'drizzle-orm/pg-core'

export const roleEnum = pgEnum('Role', ['USER', 'AUTHOR', 'ADMIN'])

export const users = pgTable('user', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull().unique(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	role: roleEnum('role').default('USER').notNull()
})

export const articles = pgTable('article', {
	id: uuid('id').primaryKey().defaultRandom(),
	title: text('title').notNull(),
	subtitle: text('subtitle').notNull(),
	description: text('description').notNull(),
	content: text('content').notNull(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	authorId: text('authorId').notNull(),
	image: text('image').notNull()
})

export const comments = pgTable('comment', {
	id: uuid('id').primaryKey().defaultRandom(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	content: text('content').notNull(),
	articleId: text('articleId').notNull(),
	authorId: text('authorId').notNull()
})
