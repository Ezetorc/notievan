import { Router } from 'express'
import { authMiddleware } from '../auth/auth.middleware.js'
import { UsersController } from './users.controller.js'

export const UsersRouter = Router()

UsersRouter.get('/', authMiddleware('ADMIN'), UsersController.getAll)

UsersRouter.get('/:id', authMiddleware(), UsersController.getById)

UsersRouter.patch(
	'/:id/role',
	authMiddleware('ADMIN'),
	UsersController.updateRole
)

UsersRouter.patch('/:id', authMiddleware(), UsersController.update)
