import type { UserOut } from '../../../shared/dtos/out/user-out.dto'

export type AuthResponse = { user: UserOut; token: string }
