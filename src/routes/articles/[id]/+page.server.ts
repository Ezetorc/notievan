import { ArticleOut } from 'articles/models/article-out.model'
import { ArticlePreviewOut } from 'articles/models/article-preview-out.model'
import { ArticlesService } from 'articles/server/services/articles.service'
import type { PageServerLoad } from './$types'
import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'

export const load: PageServerLoad = async ({ params, locals }) => {
	const { id } = params
	const article = await ArticlesService.getById(id)
	const asideArticles = await ArticlesService.getRandom(3, id)
	const articleOut = ArticleOut.from(article)
	const isOwner = article.authorId === locals.user?.id

	const contentHtml = sanitizeHtml(
		marked.parse(article.content, { async: false })
	)

	return {
		article: articleOut,
		asideArticles: ArticlePreviewOut.fromMany(asideArticles),
		isOwner,
		contentHtml
	}
}
