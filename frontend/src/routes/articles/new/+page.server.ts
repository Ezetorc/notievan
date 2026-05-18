import { redirect, type ServerLoad } from '@sveltejs/kit'
import { ARTICLE_WRITER_ROLES } from 'shared/configuration/article-writer-roles.configuration'
import { CreateArticleDto } from 'shared/dtos/in/create-article.dto'
import type { ArticleOut } from 'shared/dtos/out/article-out.dto'
import { COOKIES } from '$lib/configuration/cookies.configuration'
import { ROUTES } from '$lib/configuration/routes.configuration'
import { ServerApiService } from '$lib/services/server-api.service'
import { parseFormError } from '$lib/utilities/parse-form-error.utility'
import type { Actions } from './$types'

export const load: ServerLoad = async ({ locals }) => {
	if (!ARTICLE_WRITER_ROLES.includes(locals.user?.role)) {
		throw redirect(302, ROUTES.SignIn)
	}
}

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData()

		try {
			const result = CreateArticleDto.parse(Object.fromEntries(data))

			const formData = new FormData()

			formData.append('title', result.title)
			formData.append('subtitle', result.subtitle)
			formData.append('description', result.description)
			formData.append('content', result.content)
			formData.append('image', result.image)

			return await ServerApiService.post<ArticleOut>({
				url: '/articles',
				body: formData,
				token: cookies.get(COOKIES.AccessToken.name)
			})
		} catch (error) {
			console.error('[CreateArticle]', error)

			return parseFormError(error)
		}
	}
}
