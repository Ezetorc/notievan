import { AuthService } from './auth.service.js'
import type { Request, Response } from 'express'
import { UsersService } from '../users/users.service.js'
import { UserOut } from '../../../shared/src/dtos/out/user-out.dto.js'
import { SignUpDto } from '../../../shared/src/dtos/in/sign-up.dto.js'
import { SignInDto } from '../../../shared/src/dtos/in/sign-in.dto.js'

export class AuthController {
	static async signUp(request: Request, response: Response) {
		const { email, password, name } = SignUpDto.parse(request.body)
		const { user, token } = await AuthService.signUp(name, email, password)

		return response.status(201).json({ user: new UserOut(user), token })
	}

	static async signIn(request: Request, response: Response) {
		const { email, password } = SignInDto.parse(request.body)
		const { user, token } = await AuthService.signIn(email, password)

		return response.json({ user: new UserOut(user), token })
	}

	static async getSelf(request: Request, response: Response) {
		const user = await UsersService.getById(request.user.id)

		return response.json(new UserOut(user))
	}
}
