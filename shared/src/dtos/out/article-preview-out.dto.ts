import type { ArticlePreview } from "../../models/article-preview.model.js"

export class ArticlePreviewOut {
  constructor(article: ArticlePreview, authorName: string) {
    this.id = article.id
    this.createdAt = article.createdAt.toISOString()
    this.author = {
      id: article.authorId,
      name: authorName
    }
    this.title = article.title
    this.subtitle = article.subtitle
    this.description = article.description
    this.image = article.image
  }

  id: string;
  createdAt: string;
  author: {
    id: string,
    name: string
  };
  title: string;
  subtitle: string;
  description: string;
  image: string;
}
