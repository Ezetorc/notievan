import type { UserRole } from '../../../shared/src/models/user-role.model.js'

export type JWTUser = {
	id: string
	role: UserRole
}
