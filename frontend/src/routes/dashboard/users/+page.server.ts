import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ServerApiService } from '$lib/services/server-api.service';
import type { PaginatedResult } from 'shared/models/paginated-result.model';
import type { UserOut } from 'shared/dtos/out/user-out.dto';
import { COOKIES } from '$lib/configuration/cookies.configuration';

export const load: PageServerLoad = async ({ locals, cookies }) => {
	if (locals.user?.role != 'ADMIN') {
		throw redirect(302, '/');
	}

	const users = await ServerApiService.get<PaginatedResult<UserOut>>({
		url: '/users?limit=5',
		token: cookies.get(COOKIES.AccessToken.name)
	});

	return { initialUsers: users.data, initialCursor: users.nextCursor };
};
