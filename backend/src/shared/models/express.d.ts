import { JWTUser } from '../../auth/jwt-user.model.ts'
import 'express'

declare global {
	namespace Express {
		interface Request {
			user: JWTUser
		}
	}
}
