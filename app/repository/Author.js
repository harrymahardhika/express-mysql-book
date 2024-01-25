import Repository from '../Repository.js'

class Book extends Repository {
  constructor() {
    super('authors')
  }
}

export default new Book()
