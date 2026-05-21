import { error } from '@sveltejs/kit'
import type { UserRole } from 'users/models/user-role.model'

export function requireRole(user: App.Locals['user'], roles?: UserRole[]) {
	if (!user) {
		throw error(401, 'Unauthorized')
	}

	if (roles && !roles.includes(user.role) && user.role !== 'ADMIN') {
		throw error(403, 'Forbidden')
	}
}
