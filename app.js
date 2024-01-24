import express from 'express'
import db from './config/database.js'

const app = express()
app.use(express.json())

app.get('/books', (req, res) => {
  db.query('SELECT * FROM books', (err, rows) => {
    if (err) {
      res.json({ error: err })
    }
    res.json(rows)
  })
})

app.get('/books/:id', (req, res) => {
  db.query('SELECT * FROM books WHERE id = ?', [req.params.id], (err, rows) => {
    if (err) {
      res.json({ error: err })
    }
    res.json(rows[0])
  })
})

app.post('/books', (req, res) => {
  db.query('INSERT INTO books SET ?', req.body, (err, rows) => {
    if (err) {
      res.json({ error: err })
    }
    res.json({
      message: 'Book added successfully!'
    })
  })
})

app.put('/books/:id', (req, res) => {
  db.query('UPDATE books SET ? WHERE id = ?', [req.body, req.params.id], (err, rows) => {
    if (err) {
      res.json({ error: err })
    }
    res.json({
      message: 'Book updated successfully!'
    })
  })
})

app.delete('/books/:id', (req, res) => {
  db.query('DELETE FROM books WHERE id = ?', [req.params.id], (err, rows) => {
    if (err) {
      res.json({ error: err })
    }
    res.json({
      message: 'Book deleted successfully!'
    })
  })
})

export default app
