import { AuthController } from './auth.controller.js'
import { Router } from 'express'
import { authMiddleware } from './auth.middleware.js'

export const AuthRouter = Router()

AuthRouter.post('/register', AuthController.register)

AuthRouter.post('/login', AuthController.login)

AuthRouter.get('/', authMiddleware(), AuthController.getSelf)
