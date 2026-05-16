import { COOKIES } from '$lib/configuration/cookies.configuration.js';
import { ServerApiService } from '$lib/services/server-api.service';
import type { UserOut } from 'shared/dtos/out/user-out.dto.js';
import type { PaginatedResult } from 'shared/models/paginated-result.model.js';

export async function GET({ url, cookies }) {
	const token = cookies.get(COOKIES.AccessToken.name);
	const limit = url.searchParams.get('limit');
	const cursor = url.searchParams.get('cursor');

	const response = await ServerApiService.get<PaginatedResult<UserOut>>({
		url: `/users?limit=${limit}&cursor=${cursor}`,
		token
	});

	return Response.json(response);
}
