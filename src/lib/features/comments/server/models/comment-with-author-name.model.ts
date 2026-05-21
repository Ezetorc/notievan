import type { Comment } from './comment.model'

export type CommentWithAuthorName = Comment & { authorName: string }
