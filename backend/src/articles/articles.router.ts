import { Router } from 'express'
import { ArticlesController } from './articles.controller.js'
import { authMiddleware } from '../auth/auth.middleware.js'
import { imageMiddleware } from '../shared/middlewares/image.middleware.js'

export const ArticlesRouter = Router()

ArticlesRouter.get('/own', authMiddleware(), ArticlesController.getOwn)

ArticlesRouter.get('/random', ArticlesController.getRandom)

ArticlesRouter.get('/:id', ArticlesController.findById)

ArticlesRouter.get('/', ArticlesController.getAll)

ArticlesRouter.delete(
	'/:id',
	authMiddleware('AUTHOR'),
	ArticlesController.delete
)

ArticlesRouter.patch(
	'/:id',
	authMiddleware('AUTHOR'),
	imageMiddleware(),
	ArticlesController.update
)

ArticlesRouter.post(
	'/',
	authMiddleware('AUTHOR'),
	imageMiddleware(),
	ArticlesController.create
)
