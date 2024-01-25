import { Router } from 'express'

const router = Router()

router.get('/', async (req, res) => {
  res.json({ message: 'authors' })
})

router.get('/:id', async (req, res) => {
  res.json({ message: 'author' })
})

router.post('/', async (req, res) => {
  res.json({ message: 'author created' })
})

router.put('/:id', async (req, res) => {
  res.json({ message: 'author updated' })
})

router.delete('/:id', async (req, res) => {
  res.json({ message: 'author deleted' })
})

export default router
