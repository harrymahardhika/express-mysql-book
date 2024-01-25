import { Router } from 'express'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const books = await bookQuery.get()
    res.json(books)
  } catch (err) {
    res.json({ error: err })
  }
})

router.get(':id', async (req, res) => {
  const bookId = Number(req.params.id)

  try {
    const book = await bookQuery.find(bookId)
    if (!book) {
      res.json({ message: 'Book not found' })
      return
    }
    res.json(book)
  } catch (err) {
    res.json({ error: err })
  }
})

router.post('/books', async (req, res) => {
  if (!req.body.title || !req.body.author || !req.body.publisher || !req.body.isbn) {
    res.status(400).json({
      message: 'title, author, publisher and isbn fields are required'
    })
  }
  try {
    await bookQuery.store(req.body)
    res.json({ message: 'Book added successfully!' })
  } catch (err) {
    res.json({ error: err })
  }
})

router.put(':id', async (req, res) => {
  try {
    const bookId = Number(req.params.id)
    await bookQuery.update(req.body, bookId)
  } catch (err) {
    res.json({ error: err })
  }
})

router.delete(':id', async (req, res) => {
  try {
    await bookQuery.destroy(req.params.id)
    res.json({ message: 'Book deleted successfully!' })
  } catch (err) {
    res.json({ error: err })
  }
})

export default router
