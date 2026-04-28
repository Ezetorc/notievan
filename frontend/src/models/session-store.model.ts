import type { SanitizedUser } from '../../../backend/api/models/sanitized-user.model.js'

export type SessionStore = {
	user?: SanitizedUser
	setUser: (value: SanitizedUser | undefined) => void
}
