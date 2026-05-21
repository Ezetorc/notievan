import type { Article } from './article.model'

export type ArticleWithAuthorName = Article & { authorName: string }
