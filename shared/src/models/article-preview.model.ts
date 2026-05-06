import type { Article } from "./article.model.js";

export type ArticlePreview = Omit<Article, "content">