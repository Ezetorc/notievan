import type { SanitizedUser } from '../../../backend/api/models/sanitized-user.model.js'

export type Session = {
	user: SanitizedUser
	token: string
}
