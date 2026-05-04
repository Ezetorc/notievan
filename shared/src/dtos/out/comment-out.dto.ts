import type { Comment } from "../../models/comment.model.js"

export class CommentOut {
  constructor(comment: Comment, authorName: string) {
    this.id = comment.id
    this.createdAt = comment.createdAt.toISOString()
    this.author = {
      id: comment.authorId,
      name: authorName
    }
    this.content = comment.content
    this.articleId = comment.articleId
  }

  id: string;
  createdAt: string;
  author: {
    id: string,
    name: string
  };
  content: string;
  articleId: string;
}
