import type { ArticleWithAuthorName } from 'articles/server/models/article-with-author-name.model'

export type ArticleOut = {
	id: string
	createdAt: string
	author: {
		id: string
		name: string
	}
	title: string
	subtitle: string
	description: string
	content: string
	image: string
}

export const ArticleOut = {
	from(article: ArticleWithAuthorName): ArticleOut {
		return {
			id: article.id,
			title: article.title,
			subtitle: article.subtitle,
			description: article.description,
			image: article.image,
			createdAt: article.createdAt.toISOString(),
			content: article.content,
			author: {
				id: article.authorId,
				name: article.authorName
			}
		}
	},

	fromMany(articles: ArticleWithAuthorName[]): ArticleOut[] {
		return articles.map((article) => this.from(article))
	}
}
