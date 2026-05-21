import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { ROUTES } from 'shared/configuration/routes.configuration'
import { UserOut } from 'users/models/user-out.dto'
import { UsersService } from 'users/server/services/users.service'

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user?.role != 'ADMIN') {
		throw redirect(302, ROUTES.Home)
	}

	const users = await UsersService.getAll({ limit: 5 })
	const usersOut = UserOut.fromMany(users.data)

	return { initialUsers: usersOut, initialCursor: users.nextCursor }
}
