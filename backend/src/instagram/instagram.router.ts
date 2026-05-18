import { Router } from 'express'
import { InstagramController } from './instagram.controller.js'
import { authMiddleware } from '../auth/auth.middleware.js'

export const InstagramRouter = Router()

InstagramRouter.post(
  '/refresh-access-token',
  authMiddleware('ADMIN'),
  InstagramController.refreshAccessToken
)
