import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { articles } from "./articles.schema.js";
import { users } from "./users.schema.js";

export const comments = pgTable('comment', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId()),
	articleId: text('articleId').notNull(),
	authorId: text('authorId').notNull(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	content: text('content').notNull()
})

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
