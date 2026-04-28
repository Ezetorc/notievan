import { AuthService } from '../services/auth.service.js'
import type { Request, Response } from 'express'
import { UsersService } from '../services/users.service.js'
import { UserOut } from '../../../shared/src/dtos/out/user-out.dto.js'
import { SignUpDto } from '../../../shared/src/dtos/in/sign-up.dto.js'
import { SignInDto } from '../../../shared/src/dtos/in/sign-in.dto.js'

export class AuthController {
	static async register(request: Request, response: Response) {
		const { email, password, name } = SignUpDto.parse(request.body)
		const { user, token } = await AuthService.register(name, email, password)

		return response.status(201).json({ user: new UserOut(user), token })
	}

	static async login(request: Request, response: Response) {
		const { email, password } = SignInDto.parse(request.body)
		const { user, token } = await AuthService.login(email, password)

		return response.json({ user: new UserOut(user), token })
	}

	static async getSelf(request: Request, response: Response) {
		const user = await UsersService.getById(request.user.id)

		return response.json(new UserOut(user))
	}
}
