import { database } from '../configuration/database.configuration.js'
import { comments } from '../database/schema.js'
import { eq, desc } from 'drizzle-orm'

export class CommentsRepository {
	static async create(data: {
		id: string
		content: string
		articleId: string
		authorId: string
	}) {
		const result = await database.insert(comments).values(data).returning()
		return result[0]
	}

	static async getAllOfArticle(articleId: string, limit: number, skip: number) {
		return await database
			.select()
			.from(comments)
			.where(eq(comments.articleId, articleId))
			.orderBy(desc(comments.createdAt))
			.limit(limit)
			.offset(skip)
	}

	static async findById(id: string) {
		const result = await database
			.select()
			.from(comments)
			.where(eq(comments.id, id))
			.limit(1)

		return result[0] ?? null
	}

	static async delete(id: string) {
		const result = await database
			.delete(comments)
			.where(eq(comments.id, id))
			.returning()

		return result.length > 0
	}
}
