import db from '../../config/database.js'

const query = {
  get: async () => {
    const [rows] = await db.query('SELECT * FROM books')
    return rows
  },

  find: async (bookId) => {
    const [rows] = await db.query(`SELECT * FROM books WHERE id = ${bookId}`)
    return rows[0]
  },

  store: async (data) => {
    const [rows] = await db.query('INSERT INTO books SET ?', data)
    return rows
  },

  update: async (data, bookId) => {
    const check = await query.find(bookId)
    if (!check) {
      throw new Error('Book not found')
    }

    const columnString = Object.keys(data)
      .map((item) => {
        return `${item} = ?`
      })
      .join(', ')

    const values = Object.values(data)

    const [rows] = await db.query('UPDATE books SET ? WHERE id = ?', [data, bookId])

    return rows
  },

  destroy: async (bookId) => {
    const [rows] = await db.query('DELETE FROM books WHERE id = ?', [bookId])
    return rows
  }
}

export default query
