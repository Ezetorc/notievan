import type { Article } from "../../models/article.model.js";

export class ArticleOut {
  constructor(article: Article, authorName: string) {
    this.id = article.id
    this.createdAt = article.createdAt.toISOString()
    this.author = {
      id: article.authorId,
      name: authorName
    }
    this.title = article.title
    this.subtitle = article.subtitle
    this.description = article.description
    this.content = article.content
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
  content: string;
  image: string;
}
