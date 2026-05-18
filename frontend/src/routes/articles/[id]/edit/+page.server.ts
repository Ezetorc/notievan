import type { ArticleOut } from 'shared/dtos/out/article-out.dto';
import type { PageServerLoad } from './$types';
import { ServerApiService } from '$lib/services/server-api.service';
import { redirect, type Actions } from '@sveltejs/kit';
import { UpdateArticleDto } from 'shared/dtos/in/update-article.dto';
import { COOKIES } from '$lib/configuration/cookies.configuration';
import { parseFormError } from '$lib/utilities/parse-form-error.utility';
import { ARTICLE_WRITER_ROLES } from 'shared/configuration/article-writer-roles.configuration';
import { ROUTES } from '$lib/configuration/routes.configuration';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!ARTICLE_WRITER_ROLES.includes(locals.user?.role)) {
		throw redirect(302, ROUTES.SignIn);
	}

	const { id } = params;
	const article = await ServerApiService.get<ArticleOut>({ url: `/articles/${id}` });

	if (article.author.id !== locals.user?.id) {
		throw redirect(302, ROUTES.Home);
	}

	return {
		article
	};
};

export const actions: Actions = {
	default: async ({ request, cookies, params }) => {
		const { id } = params;
		const data = await request.formData();

		try {
			const result = UpdateArticleDto.parse(Object.fromEntries(data));

			const formData = new FormData();

			if (result.title) formData.append('title', result.title);
			if (result.subtitle) formData.append('subtitle', result.subtitle);
			if (result.description) formData.append('description', result.description);
			if (result.content) formData.append('content', result.content);
			if (result.image) formData.append('image', result.image);

			await ServerApiService.patch<boolean>({
				url: `/articles/${id}`,
				body: formData,
				token: cookies.get(COOKIES.AccessToken.name)
			});

			return true;
		} catch (error) {
			console.error('[EditArticle]', error);

			return parseFormError(error);
		}
	}
};
