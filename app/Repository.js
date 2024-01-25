import db from '../config/database.js'

class Repository {
  constructor(tableName) {
    this.tableName = tableName
  }

  async query(query, params) {
    const connection = await db.getConnection()
    try {
      const [rows] = await connection.execute(query, params)
      return rows
    } finally {
      connection.release()
    }
  }

  async get() {
    const query = `SELECT * FROM ${this.tableName}`
    return await this.query(query)
  }

  async find(id) {
    const query = `SELECT * FROM ${this.tableName} WHERE id = ?`
    const result = await this.query(query, [id])

    if (result.length === 0) {
      throw new Error('Data not found')
    }

    return result[0]
  }

  async store(data) {
    const columns = Object.keys(data)
    const placeholder = columns.map(() => '?')
    const values = columns.map((key) => data[key])

    const query = `INSERT INTO ${this.tableName} (${columns.join(', ')})
      VALUES (${placeholder.join(', ')})`

    return this.query(query, values)
  }

  async update(id, data) {
    const columns = Object.keys(data)
    const values = columns.map((key) => data[key])
    const setClause = columns.map((columnName) => `${columnName} = ?`).join(', ')

    const query = `UPDATE ${this.tableName} SET ${setClause} WHERE id = ${id}`
    const result = await this.query(query, values)

    if (result.affectedRows === 0) {
      throw new Error('Data not found')
    }

    return result
  }

  async delete(id) {
    const query = `DELETE FROM ${this.tableName} WHERE id = ?`
    const result = await this.query(query, [id])

    if (result.affectedRows === 0) {
      throw new Error('Data not found')
    }

    return result
  }
}

export default Repository
