import type { Comment } from '../../../shared/src/models/comment.model.js'

export type CommentWithAuthorName = Comment & { authorName: string }
