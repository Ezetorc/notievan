import { type Actions, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { ArticleOut } from 'articles/models/article-out.model'
import { ArticlesService } from 'articles/server/services/articles.service'
import { parseFormError } from 'server/utilities/parse-form-error.utility'
import { ARTICLE_WRITER_ROLES } from 'shared/configuration/article-writer-roles.configuration'
import { ROUTES } from 'shared/configuration/routes.configuration'
import { UpdateArticleSchema } from 'articles/schemas/update-article.schema'

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!ARTICLE_WRITER_ROLES.includes(locals.user?.role)) {
		throw redirect(302, ROUTES.SignIn)
	}

	const { id } = params
	const article = await ArticlesService.getById(id)
	const articleOut = ArticleOut.from(article)

	if (articleOut.author.id !== locals.user?.id) {
		throw redirect(302, ROUTES.Home)
	}

	return {
		article: articleOut
	}
}

export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		const { id } = params
		const formData = await request.formData()

		try {
			const dto = {
				...Object.fromEntries(formData),

				image: formData.get('image')
			}

			const result = UpdateArticleSchema.parse(dto)

			return await ArticlesService.update(id, result, locals.user.id)
		} catch (error) {
			console.error('[EditArticle]', error)

			return parseFormError(error)
		}
	}
}
