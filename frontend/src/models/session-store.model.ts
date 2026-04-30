import type { UserOut } from '../../../shared/src/dtos/out/user-out.dto'

export type SessionStore = {
	user?: UserOut
	setUser: (value: UserOut | undefined) => void
}
