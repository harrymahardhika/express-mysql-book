import express from 'express'
import db from './config/database.js'

const app = express()
app.use(express.json())

app.get('/books', (req, res) => {
  db.query('SELECT * FROM books ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      res.json({ error: err })
    }

    res.json(rows)
  })
})

app.get('/books/:id', (req, res) => {
  const bookId = Number(req.params.id)

  db.query(`SELECT * FROM books WHERE id = ${bookId}`, (err, rows) => {
    if (err) {
      res.json({ error: err })
      return
    }

    console.log(rows)

    if (0 === rows.length) {
      res.status(404).json({ message: 'Book not found' })
      return
    }

    res.json(rows[0])
  })
})

app.post('/books', (req, res) => {
  // const statement = `INSERT INTO books (title, author, publisher, isbn) values(?, ?, ?, ?)`
  // const params = [req.body.title, req.body.author, req.body.publisher, req.body.isbn]

  // // using statement and params
  // db.execute(statement, params, (err, rows) => {
  //   if (err) {
  //     return res.json({ error: err })
  //   }

  //   res.json({
  //     message: 'Book added successfully!'
  //   })
  // })

  // using query
  db.query('INSERT INTO books SET ?', req.body, (err, rows) => {
    if (err) {
      return res.json({ error: err })
    }

    res.json({
      message: 'Book added successfully!'
    })
  })
})

app.put('/books/:id', (req, res) => {
  const data = {
    title: req.body.title,
    author: req.body.author
  }

  db.query('UPDATE books SET ? WHERE id = ?', [req.body, req.params.id], (err, rows) => {
    if (err) {
      return res.json({ error: err })
    }

    res.json({
      message: 'Book updated successfully!'
    })
  })

  // db.execute(
  //   'UPDATE books SET title = ?, author = ? WHERE id = ?',
  //   [data.title, data.author, req.params.id],
  //   (err, rows) => {
  //     if (err) {
  //       return res.json({ error: err })
  //     }

  //     res.json({
  //       message: 'Book updated successfully!'
  //     })
  //   }
  // )
})

app.delete('/books/:id', (req, res) => {
  db.execute('DELETE FROM books WHERE id = ?', [req.params.id], (err, rows) => {
    if (err) {
      res.json({ error: err })
      return
    }

    res.json({
      message: 'Book deleted successfully!'
    })
  })
})

export default app
