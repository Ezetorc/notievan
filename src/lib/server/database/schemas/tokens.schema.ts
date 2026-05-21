import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const tokens = pgTable('token', {
	name: text('name').primaryKey(),
	value: text('value').notNull(),
	expiresIn: timestamp('expiresIn').notNull(),
	refreshedAt: timestamp('refreshedAt').defaultNow().notNull()
})
