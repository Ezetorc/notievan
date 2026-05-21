import type { UserOut } from 'users/models/user-out.dto'

export type Session = {
	user: UserOut
	token: string
}
