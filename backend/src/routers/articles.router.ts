import { Router } from 'express'
import { ArticlesController } from '../controllers/articles.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import multer from 'multer'
const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 5 * 1024 * 1024 }
})

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
	upload.single('image'),
	ArticlesController.update
)

ArticlesRouter.post(
	'/',
	authMiddleware('AUTHOR'),
	upload.single('image'),
	ArticlesController.create
)
