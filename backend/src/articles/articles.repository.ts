import { database } from '../database/database.configuration.js'
import { eq, desc, inArray, ne, and, lt, or } from 'drizzle-orm'
import { articles } from '../database/schema/articles.schema.js'
import { users } from '../database/schema/users.schema.js'
import type { Cursor } from '../../../shared/src/models/cursor.model.js'

export class ArticlesRepository {
	static async findById(id: string) {
		const result = await database
			.select({
				id: articles.id,
				title: articles.title,
				subtitle: articles.subtitle,
				description: articles.description,
				content: articles.content,
				createdAt: articles.createdAt,
				image: articles.image,
				authorId: articles.authorId,
				authorName: users.name
			})
			.from(articles)
			.innerJoin(users, eq(users.id, articles.authorId))
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

		const created = result[0]

		if (!created) return null

		return await ArticlesRepository.findById(created.id)
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

	static async getAll(limit: number, cursor?: Cursor) {
		return await database
			.select({
				id: articles.id,
				title: articles.title,
				subtitle: articles.subtitle,
				description: articles.description,
				createdAt: articles.createdAt,
				image: articles.image,
				authorId: articles.authorId,
				authorName: users.name
			})
			.from(articles)
			.innerJoin(users, eq(users.id, articles.authorId))
			.where(
				cursor
					? or(
							lt(articles.createdAt, cursor.createdAt),
							and(
								eq(articles.createdAt, cursor.createdAt),
								lt(articles.id, cursor.id)
							)
						)
					: undefined
			)
			.orderBy(desc(articles.createdAt), desc(articles.id))
			.limit(limit)
	}

	static async getOwn(limit: number, userId: string, cursor?: Cursor) {
		return await database
			.select({
				id: articles.id,
				title: articles.title,
				subtitle: articles.subtitle,
				description: articles.description,
				createdAt: articles.createdAt,
				image: articles.image,
				authorId: articles.authorId,
				authorName: users.name
			})
			.from(articles)
			.innerJoin(users, eq(users.id, articles.authorId))
			.where(
				and(
					eq(articles.authorId, userId),
					cursor
						? or(
								lt(articles.createdAt, cursor.createdAt),
								and(
									eq(articles.createdAt, cursor.createdAt),
									lt(articles.id, cursor.id)
								)
							)
						: undefined
				)
			)
			.orderBy(desc(articles.createdAt), desc(articles.id))
			.limit(limit)
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
			.select({
				id: articles.id,
				title: articles.title,
				subtitle: articles.subtitle,
				description: articles.description,
				createdAt: articles.createdAt,
				image: articles.image,
				authorId: articles.authorId,
				authorName: users.name
			})
			.from(articles)
			.innerJoin(users, eq(users.id, articles.authorId))
			.where(inArray(articles.id, ids))
	}
}
