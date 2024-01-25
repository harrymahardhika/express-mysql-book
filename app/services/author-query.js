import db from '../../config/database.js'

const query = {
  get: async () => {
    const [rows] = await db.query('SELECT * FROM authors')
    return rows
  },

  find: async (bookId) => {
    const [rows] = await db.query(`SELECT * FROM authors WHERE id = ${bookId}`)
    return rows[0]
  },

  store: async (data) => {
    const [rows] = await db.query('INSERT INTO authors SET ?', data)
    return rows
  },

  update: async (data, bookId) => {
    const check = await query.find(bookId)
    if (!check) {
      throw new Error('Book not found')
    }

    const [rows] = await db.query('UPDATE authors SET ? WHERE id = ?', [data, bookId])

    return rows
  },

  destroy: async (bookId) => {
    const [rows] = await db.query('DELETE FROM authors WHERE id = ?', [bookId])
    return rows
  }
}

export default query
