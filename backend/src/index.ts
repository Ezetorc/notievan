import express, { json as jsonMiddleware } from 'express'
import corsMiddleware from 'cors'
import { env } from './shared/configuration/env.configuration.js'
import { ArticlesRouter } from './articles/articles.router.js'
import { AuthRouter } from './auth/auth.router.js'
import { CommentsRouter } from './comments/comments.router.js'
import { errorHandlerMiddleware } from './errors/error-handler.middleware.js'
import { UsersRouter } from './users/users.router.js'

const app = express()

app.use(corsMiddleware())
app.use(jsonMiddleware())
app.use('/auth', AuthRouter)
app.use('/users', UsersRouter)
app.use('/articles', ArticlesRouter)
app.use('/comments', CommentsRouter)
app.use(errorHandlerMiddleware())

app.listen(env.port)
