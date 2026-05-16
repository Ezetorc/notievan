import { COOKIES } from '$lib/configuration/cookies.configuration';
import { ServerApiService } from '$lib/services/server-api.service';
import type { ArticlePreviewOut } from 'shared/dtos/out/article-preview-out.dto';
import type { PaginatedResult } from 'shared/models/paginated-result.model';

export async function GET({ cookies, url }) {
	const cursor = url.searchParams.get('cursor');
	const limit = url.searchParams.get('limit');
	const success = await ServerApiService.get<PaginatedResult<ArticlePreviewOut>>({
		url: `/articles/own?cursor=${cursor}&limit=${limit}`,
		token: cookies.get(COOKIES.AccessToken.name)
	});

	return Response.json(success);
}
