import type { ArticlePreview } from '../../../shared/src/models/article-preview.model.js'

export type ArticlePreviewWithAuthorName = ArticlePreview & {
	authorName: string
}
