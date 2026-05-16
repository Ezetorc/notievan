import { Router } from 'express'
import { ArticlesController } from './articles.controller.js'
import { authMiddleware } from '../auth/auth.middleware.js'
import { imageMiddleware } from '../shared/middlewares/image.middleware.js'
import { ARTICLE_WRITER_ROLES } from '../../../shared/src/configuration/article-writer-roles.configuration.js'

export const ArticlesRouter = Router()

ArticlesRouter.get('/own', authMiddleware(), ArticlesController.getOwn)

ArticlesRouter.get('/random', ArticlesController.getRandom)

ArticlesRouter.get('/:id', ArticlesController.findById)

ArticlesRouter.get('/', ArticlesController.getAll)

ArticlesRouter.delete(
	'/:id',
	authMiddleware(...ARTICLE_WRITER_ROLES),
	ArticlesController.delete
)

ArticlesRouter.patch(
	'/:id',
	authMiddleware(...ARTICLE_WRITER_ROLES),
	imageMiddleware(),
	ArticlesController.update
)

ArticlesRouter.post(
	'/',
	authMiddleware(...ARTICLE_WRITER_ROLES),
	imageMiddleware(),
	ArticlesController.create
)
