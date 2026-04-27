import { database } from '../configuration/database.configuration.js'
import { articles } from '../database/schema.js'
import { eq, desc, inArray, ne } from 'drizzle-orm'

export class ArticlesRepository {
	static async findById(id: string) {
		const result = await database
			.select()
			.from(articles)
			.where(eq(articles.id, id))
			.limit(1)

		return result[0] ?? null
	}

	static async delete(id: string) {
		const result = await database
			.delete(articles)
			.where(eq(articles.id, id))
			.returning()

		return result[0] ?? null
	}

	static async create(data: {
		title: string
		subtitle: string
		description: string
		content: string
		authorId: string
		image: string
	}) {
		const result = await database.insert(articles).values(data).returning()
		return result[0]
	}

	static async update(
		id: string,
		data: Partial<{
			title: string
			subtitle: string
			description: string
			content: string
			image: string
		}>
	) {
		const result = await database
			.update(articles)
			.set(data)
			.where(eq(articles.id, id))
			.returning()

		return result[0] ?? null
	}

	static async getAll(limit: number, skip: number) {
		return await database
			.select({
				id: articles.id,
				title: articles.title,
				subtitle: articles.subtitle,
				description: articles.description,
				createdAt: articles.createdAt,
				authorId: articles.authorId,
				image: articles.image
			})
			.from(articles)
			.orderBy(desc(articles.createdAt))
			.limit(limit)
			.offset(skip)
	}

	static async getOwn(limit: number, skip: number, userId: string) {
		return await database
			.select({
				id: articles.id,
				title: articles.title,
				subtitle: articles.subtitle,
				description: articles.description,
				createdAt: articles.createdAt,
				authorId: articles.authorId,
				image: articles.image
			})
			.from(articles)
			.where(eq(articles.authorId, userId))
			.orderBy(desc(articles.createdAt))
			.limit(limit)
			.offset(skip)
	}

	static async getRandomIds(limit: number, omit?: string) {
		return await database
			.select({ id: articles.id })
			.from(articles)
			.where(omit ? ne(articles.id, omit) : undefined)
			.limit(limit)
	}

	static async getByIds(ids: string[]) {
		return await database
			.select()
			.from(articles)
			.where(inArray(articles.id, ids))
	}
}
