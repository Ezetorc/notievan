import type { Article } from '../../../shared/src/models/article.model.js'

export type ArticleWithAuthorName = Article & { authorName: string }
