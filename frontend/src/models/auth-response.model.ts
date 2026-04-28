import type { SanitizedUser } from '../../../backend/api/models/sanitized-user.model.js'

export type AuthResponse = { user: SanitizedUser; token: string }
