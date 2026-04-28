import type { UserOut } from '../../../shared/dtos/out/user-out.dto'

export type Session = {
	user: UserOut
	token: string
}
