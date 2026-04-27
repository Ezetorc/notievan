import express, { json as jsonMiddleware } from 'express'
import { AuthRouter } from './routers/auth.router.js'
import { UsersRouter } from './routers/users.router.js'
import { ArticlesRouter } from './routers/articles.router.js'
import corsMiddleware from 'cors'
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware.js'
import { CommentsRouter } from './routers/comments.router.js'

const app = express()

app.use(corsMiddleware())
app.use(jsonMiddleware())
app.use('/api/auth', AuthRouter)
app.use('/api/users', UsersRouter)
app.use('/api/articles', ArticlesRouter)
app.use('/api/comments', CommentsRouter)
app.use(errorHandlerMiddleware())

export default app