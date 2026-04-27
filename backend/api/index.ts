import express, { json as jsonMiddleware } from 'express'
import { env } from './configuration/env.configuration.js'
import { AuthRouter } from './routers/auth.router.js'
import { UsersRouter } from './routers/users.router.js'
import { ArticlesRouter } from './routers/articles.router.js'
import corsMiddleware from 'cors'
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware.js'
import { CommentsRouter } from './routers/comments.router.js'

const app = express()

app.use(corsMiddleware())
app.use(jsonMiddleware())
app.use('/auth', AuthRouter)
app.use('/users', UsersRouter)
app.use('/articles', ArticlesRouter)
app.use('/comments', CommentsRouter)
app.use(errorHandlerMiddleware())

app.listen(env.port, (error) => {
	if (error) {
		console.error('Error during server start: ', error)
	} else {
		console.log(`Server is running on http://localhost:${env.port}`)
	}
})
