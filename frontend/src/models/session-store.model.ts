import type { UserOut } from '../../../shared/dtos/out/user-out.dto'

export type SessionStore = {
	user?: UserOut
	setUser: (value: UserOut | undefined) => void
}
