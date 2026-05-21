import { ArticleOut } from 'articles/models/article-out.model'
import { ArticlePreviewOut } from 'articles/models/article-preview-out.model'
import { ArticlesService } from 'articles/server/services/articles.service'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params
	const article = await ArticlesService.getById(id)
	const asideArticles = await ArticlesService.getRandom(3, id)

	return {
		article: ArticleOut.from(article),
		asideArticles: ArticlePreviewOut.fromMany(asideArticles)
	}
}
