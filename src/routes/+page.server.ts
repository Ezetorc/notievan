import { ArticlePreviewOut } from 'articles/models/article-preview-out.model'
import { ArticlesService } from 'articles/server/services/articles.service'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const { data, nextCursor } = await ArticlesService.getAll(3)

	return {
		initialArticles: ArticlePreviewOut.fromMany(data),
		initialCursor: nextCursor
	}
}
