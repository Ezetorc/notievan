import { and, desc, eq, lt, or } from 'drizzle-orm'
import { database } from 'server/database/database.configuration'
import { comments } from 'server/database/schemas/comments.schema'
import { users } from 'server/database/schemas/users.schema'
import { Cursor } from 'server/models/cursor.model'
import type { CommentWithAuthorName } from '../models/comment-with-author-name.model'
import type { Comment } from '../models/comment.model'

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
		cursor?: string | null
	): Promise<CommentWithAuthorName[]> {
		const cursorParsed = cursor ? Cursor.decode(cursor) : null

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
				cursorParsed
					? and(
							eq(comments.articleId, articleId),
							or(
								lt(comments.createdAt, cursorParsed.createdAt),
								and(
									eq(comments.createdAt, cursorParsed.createdAt),
									lt(comments.id, cursorParsed.id)
								)
							)
						)
					: eq(comments.articleId, articleId)
			)
			.orderBy(desc(comments.createdAt), desc(comments.id))
			.limit(limit + 1)
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
