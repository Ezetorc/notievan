import { database } from '../database/database.configuration.js'
import { eq, desc, and, lt, or } from 'drizzle-orm'
import { comments } from '../database/schemas/comments.schema.js'
import { users } from '../database/schemas/users.schema.js'
import type { Cursor } from '../../../shared/src/models/cursor.model.js'
import type { CommentWithAuthorName } from './comment-with-author-name.model.js'
import type { Comment } from '../../../shared/src/models/comment.model.js'

export class CommentsRepository {
	static async create(data: {
		content: string
		articleId: string
		authorId: string
	}): Promise<CommentWithAuthorName | null> {
		const result = await database.insert(comments).values(data).returning()

		const created = result[0]
		if (!created) {
			return null
		}

		const withAuthor = await database
			.select({
				id: comments.id,
				content: comments.content,
				articleId: comments.articleId,
				authorId: comments.authorId,
				createdAt: comments.createdAt,
				authorName: users.name
			})
			.from(comments)
			.innerJoin(users, eq(users.id, comments.authorId))
			.where(eq(comments.id, created.id))
			.limit(1)

		return withAuthor[0] ?? null
	}

	static async getAllOfArticle(
		articleId: string,
		limit: number,
		cursor?: Cursor
	): Promise<CommentWithAuthorName[]> {
		return await database
			.select({
				id: comments.id,
				content: comments.content,
				articleId: comments.articleId,
				authorId: comments.authorId,
				createdAt: comments.createdAt,
				authorName: users.name
			})
			.from(comments)
			.innerJoin(users, eq(users.id, comments.authorId))
			.where(
				cursor
					? and(
							eq(comments.articleId, articleId),
							or(
								lt(comments.createdAt, cursor.createdAt),
								and(
									eq(comments.createdAt, cursor.createdAt),
									lt(comments.id, cursor.id)
								)
							)
						)
					: eq(comments.articleId, articleId)
			)
			.orderBy(desc(comments.createdAt), desc(comments.id))
			.limit(limit)
	}

	static async findById(id: string): Promise<Comment | null> {
		const result = await database
			.select()
			.from(comments)
			.where(eq(comments.id, id))
			.limit(1)

		return result[0] ?? null
	}

	static async delete(id: string): Promise<boolean> {
		const result = await database
			.delete(comments)
			.where(eq(comments.id, id))
			.returning()

		return result.length > 0
	}
}
