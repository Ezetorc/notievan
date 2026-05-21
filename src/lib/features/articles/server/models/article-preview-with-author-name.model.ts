import type { ArticlePreview } from './article-preview.model'

export type ArticlePreviewWithAuthorName = ArticlePreview & {
	authorName: string
}
