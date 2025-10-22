import type { SanitizedUser } from "./sanitized-user.model";

export type AuthResponse = { user: SanitizedUser; token: string }