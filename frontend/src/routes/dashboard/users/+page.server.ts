import { redirect } from '@sveltejs/kit'
import type { UserOut } from 'shared/dtos/out/user-out.dto'
import type { PaginatedResult } from 'shared/models/paginated-result.model'
import { COOKIES } from '$lib/configuration/cookies.configuration'
import { ROUTES } from '$lib/configuration/routes.configuration'
import { ServerApiService } from '$lib/services/server-api.service'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals, cookies }) => {
	if (locals.user?.role != 'ADMIN') {
		throw redirect(302, ROUTES.Home)
	}

	const users = await ServerApiService.get<PaginatedResult<UserOut>>({
		url: '/users?limit=5',
		token: cookies.get(COOKIES.AccessToken.name)
	})

	return { initialUsers: users.data, initialCursor: users.nextCursor }
}
