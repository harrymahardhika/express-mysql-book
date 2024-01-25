import Repository from '../Repository.js'

class Book extends Repository {
  constructor() {
    super('books')
  }
}

export default new Book()
