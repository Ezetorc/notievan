import { Router } from 'express'
import { authMiddleware } from '../auth/auth.middleware.js'
import { CommentsController } from './comments.controller.js'

export const CommentsRouter = Router()

CommentsRouter.get('/article/:id', CommentsController.getAllOfArticle)

CommentsRouter.post('/', authMiddleware(), CommentsController.create)

CommentsRouter.delete('/:id', authMiddleware(), CommentsController.delete)
