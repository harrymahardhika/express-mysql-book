import { Router } from 'express'
import bookController from './controllers/book-controller.js'

const router = Router()

router.get('/controllers/books', bookController.index)
router.get('/controller/books/:id', bookController.show)

export default router
