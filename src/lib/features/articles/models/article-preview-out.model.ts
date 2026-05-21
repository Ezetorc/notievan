import type { ArticlePreviewWithAuthorName } from 'articles/server/models/article-preview-with-author-name.model'

export type ArticlePreviewOut = {
	id: string
	createdAt: string
	author: {
		id: string
		name: string
	}
	title: string
	subtitle: string
	description: string
	image: string
}

export const ArticlePreviewOut = {
	from(article: ArticlePreviewWithAuthorName): ArticlePreviewOut {
		return {
			id: article.id,
			title: article.title,
			subtitle: article.subtitle,
			description: article.description,
			image: article.image,
			createdAt: article.createdAt.toISOString(),
			author: {
				id: article.authorId,
				name: article.authorName
			}
		}
	},

	fromMany(articles: ArticlePreviewWithAuthorName[]): ArticlePreviewOut[] {
		return articles.map((article) => this.from(article))
	}
}
