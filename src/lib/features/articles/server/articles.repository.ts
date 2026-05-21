import { and, desc, eq, inArray, lt, ne, or } from 'drizzle-orm'
import { database } from 'server/database/database.configuration'
import { articles } from 'server/database/schemas/articles.schema'
import { users } from 'server/database/schemas/users.schema'
import type { Cursor } from 'server/models/cursor.model'
import type { ArticlePreviewWithAuthorName } from './models/article-preview-with-author-name.model'
import type { ArticleWithAuthorName } from './models/article-with-author-name.model'
import type { Article } from './models/article.model'

export class ArticlesRepository {
	static async findById(id: string): Promise<ArticleWithAuthorName | null> {
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

	static async delete(id: string): Promise<Article | null> {
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
	}): Promise<ArticleWithAuthorName | null> {
		const result = await database.insert(articles).values(data).returning()
		const created = result[0]

		if (!created) {
			return null
		}

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
	): Promise<boolean> {
		const result = await database
			.update(articles)
			.set(data)
			.where(eq(articles.id, id))
			.returning()

		return Boolean(result[0])
	}

	static async getAll(
		limit: number,
		cursor?: Cursor
	): Promise<ArticlePreviewWithAuthorName[]> {
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
			.limit(limit + 1)
	}

	static async getOwn(
		limit: number,
		userId: string,
		cursor?: Cursor
	): Promise<ArticlePreviewWithAuthorName[]> {
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
			.limit(limit + 1)
	}

	static async getRandomIds(limit: number, omit?: string): Promise<string[]> {
		const result = await database
			.select({ id: articles.id })
			.from(articles)
			.where(omit ? ne(articles.id, omit) : undefined)
			.limit(limit)

		return result.map((value) => value.id)
	}

	static async getByIds(
		ids: string[]
	): Promise<ArticlePreviewWithAuthorName[]> {
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
