import { SignInSchema } from 'auth/schemas/sign-in.schema'
import { AuthService } from 'auth/server/services/auth.service'
import type { Session } from 'server/models/session.model'
import { endpoint } from 'server/utilities/endpoint.utility'
import { UserOut } from 'users/models/user-out.dto'

export const POST = endpoint(async ({ request }) => {
	const body = await request.json()
	const { email, password } = SignInSchema.parse(body)
	const { user, token } = await AuthService.signIn(email, password)
	const userOut = UserOut.from(user)
	const session: Session = { user: userOut, token }

	return Response.json(session)
})
