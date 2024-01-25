import express from 'express'
import bookRoutes from './app/routes/book-routes.js'
import authorRoutes from './app/routes/author-routes.js'
import router from './app/routes.js'

const app = express()
app.use(express.json())
app.use('/books', bookRoutes)
app.use('/authors', authorRoutes)
app.use(router)

export default app
