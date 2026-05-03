import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { CommentsController } from '../controllers/comments.controller.js'

export const CommentsRouter = Router()

CommentsRouter.get('/article/:id', CommentsController.getAll)

CommentsRouter.post('/', authMiddleware(), CommentsController.create)

CommentsRouter.delete('/:id', authMiddleware(), CommentsController.delete)
