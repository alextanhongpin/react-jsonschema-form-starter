import { InternalError, NotFoundError } from '../error/error.js'
import { parseObjectId } from '../../infra/db/error.js'

export default class BookRepository {
  constructor (collection) {
    if (!collection) throw new InternalError('missing dependency: collection')
    this.collection = collection
  }

  create (book) {
    parseObjectId(book, 'authorId')

    return this.collection.books.insertOne(book)
  }

  update (query, params) {
    parseObjectId(query)
    parseObjectId(params, 'authorId')

    return this.collection.books.updateOne(query, {
      $set: params
    })
  }

  findAll (query) {
    return this.collection.books.find(query).toArray()
  }

  async findOne (query) {
    parseObjectId(query)

    const book = await this.collection.books.findOne(query)
    if (!book) throw new NotFoundError('book not found')
    return book
  }
}
