import { pgTable, text } from 'drizzle-orm/pg-core'

export const tokens = pgTable('token', {
	name: text('name').primaryKey(),
	value: text('value').notNull(),
	expiresAt: text('expiresAt').notNull(),
	refreshedAt: text('refreshedAt').notNull()
})
