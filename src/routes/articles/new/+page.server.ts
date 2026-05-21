import { redirect, type ServerLoad } from '@sveltejs/kit'

import type { Actions } from './$types'
import { ArticlesService } from 'articles/server/services/articles.service'
import { parseFormError } from 'server/utilities/parse-form-error.utility'
import { ARTICLE_WRITER_ROLES } from 'shared/configuration/article-writer-roles.configuration'
import { ROUTES } from 'shared/configuration/routes.configuration'
import { CreateArticleSchema } from 'articles/schemas/create-article.schema'

export const load: ServerLoad = async ({ locals }) => {
	if (!ARTICLE_WRITER_ROLES.includes(locals.user?.role)) {
		throw redirect(302, ROUTES.SignIn)
	}
}

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData()

		try {
			const dto = {
				...Object.fromEntries(formData),

				image: formData.get('image')
			}

			const result = CreateArticleSchema.parse(dto)

			return await ArticlesService.create(result, locals.user.id)
		} catch (error) {
			console.error('[CreateArticle]', error)

			return parseFormError(error)
		}
	}
}
