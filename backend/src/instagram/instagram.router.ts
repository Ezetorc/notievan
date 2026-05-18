import { Router } from 'express'
import { authMiddleware } from '../auth/auth.middleware.js'
import { InstagramController } from './instagram.controller.js'

export const InstagramRouter = Router()

InstagramRouter.post(
	'/refresh-access-token',
	authMiddleware('ADMIN'),
	InstagramController.refreshAccessToken
)
