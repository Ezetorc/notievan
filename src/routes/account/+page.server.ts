import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from '../$types'
import { ArticlePreviewOut } from 'articles/models/article-preview-out.model'
import { ArticlesService } from 'articles/server/services/articles.service'
import { ROUTES } from 'shared/configuration/routes.configuration'

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, ROUTES.SignIn)
	}

	const { data, nextCursor } = await ArticlesService.getOwn(4, locals.user.id)

	return {
		initialArticles: ArticlePreviewOut.fromMany(data),
		initialCursor: nextCursor,
		user: locals.user
	}
}
