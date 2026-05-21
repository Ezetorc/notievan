import type { CommentWithAuthorName } from 'comments/server/models/comment-with-author-name.model'

export type CommentOut = {
	id: string
	createdAt: string
	author: {
		id: string
		name: string
	}
	content: string
	articleId: string
}

export const CommentOut = {
	from(comment: CommentWithAuthorName): CommentOut {
		return {
			id: comment.id,
			createdAt: comment.createdAt.toISOString(),
			content: comment.content,
			articleId: comment.articleId,
			author: {
				id: comment.authorId,
				name: comment.authorName
			}
		}
	},

	fromMany(comments: CommentWithAuthorName[]): CommentOut[] {
		return comments.map((comment) => this.from(comment))
	}
}
