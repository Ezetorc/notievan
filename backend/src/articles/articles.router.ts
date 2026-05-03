import { Router } from 'express'
import { ArticlesController } from './articles.controller.js'
import multer from 'multer'
import { authMiddleware } from '../auth/auth.middleware.js'
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
