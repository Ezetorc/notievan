import type { ArticleEndpoint } from "../models/article-endpoint.model";
import type { Article } from "../models/article.model";

export function getArticleFromEndpoint(
  articleEndpoint: ArticleEndpoint
): Article {
  return {
    authorId: articleEndpoint.author_id,
    content: articleEndpoint.content,
    createdAt: articleEndpoint.created_at,
    description: articleEndpoint.description,
    id: articleEndpoint.id,
    subtitle: articleEndpoint.subtitle,
    title: articleEndpoint.title,
    thumbnail: {
      alt: articleEndpoint.thumbnail_alt,
      url: articleEndpoint.thumbnail_url,
    },
  };
}
