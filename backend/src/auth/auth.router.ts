import { AuthController } from './auth.controller.js'
import { Router } from 'express'
import { authMiddleware } from './auth.middleware.js'

export const AuthRouter = Router()

AuthRouter.post('/sign-up', AuthController.signUp)

AuthRouter.post('/sign-in', AuthController.signIn)

AuthRouter.get('/', authMiddleware(), AuthController.getSelf)
