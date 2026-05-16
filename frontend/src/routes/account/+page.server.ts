import { ServerApiService } from '$lib/services/server-api.service';
import type { PaginatedResult } from 'shared/models/paginated-result.model';
import type { ArticlePreviewOut } from 'shared/dtos/out/article-preview-out.dto';
import type { PageServerLoad } from '../$types';
import { COOKIES } from '$lib/configuration/cookies.configuration';
import { redirect } from '@sveltejs/kit';
import type { UserOut } from 'shared/dtos/out/user-out.dto';

export const load: PageServerLoad = async ({ cookies, locals }) => {
	if (!locals.user) {
		throw redirect(302, '/sign-in');
	}

	const search = new URLSearchParams();

	search.set('limit', '4');

	const response = await ServerApiService.get<PaginatedResult<ArticlePreviewOut>>({
		url: `/articles/own?${search}`,
		token: cookies.get(COOKIES.AccessToken.name)
	});

	return {
		initialArticles: response.data,
		initialCursor: response.nextCursor,
		user: locals.user as UserOut
	};
};
