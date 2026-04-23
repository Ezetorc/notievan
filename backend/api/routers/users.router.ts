import { UsersController } from '../controllers/users.controller.js'
import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'

export const UsersRouter = Router()

UsersRouter.get('/', authMiddleware('ADMIN'), UsersController.getAll)

UsersRouter.get('/:id', authMiddleware(), UsersController.getById)

UsersRouter.patch(
	'/:id/role',
	authMiddleware('ADMIN'),
	UsersController.updateRole
)

UsersRouter.get('/:id/name', UsersController.getNameById)

UsersRouter.patch('/:id', authMiddleware(), UsersController.update)
