import type { UserOut } from '../../../shared/src/dtos/out/user-out.dto'

export type Session = {
	user: UserOut
	token: string
}
