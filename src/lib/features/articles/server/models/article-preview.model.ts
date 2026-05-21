import type { Article } from './article.model'

export type ArticlePreview = Omit<Article, 'content'>
