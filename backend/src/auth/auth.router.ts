import { Router } from 'express'
import { AuthController } from './auth.controller.js'
import { authMiddleware } from './auth.middleware.js'

export const AuthRouter = Router()

AuthRouter.get('/', authMiddleware(), AuthController.getSelf)

AuthRouter.post('/sign-up', AuthController.signUp)

AuthRouter.post('/sign-in', AuthController.signIn)
