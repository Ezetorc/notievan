import type { UserOut } from 'users/models/user-out.dto'

export async function load({ locals }) {
	return {
		user: locals.user as UserOut | null
	}
}
