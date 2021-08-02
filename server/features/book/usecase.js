import { InternalError } from '../error/error.js'

export default class BookUsecase {
  constructor (repo) {
    if (!repo) throw new InternalError('missing dependency: repo')
    this.repo = repo
  }

  create (book) {
    return this.repo.create(book)
  }

  update (query, params) {
    return this.repo.update(query, params)
  }

  findAll (query) {
    return this.repo.findAll(query)
  }

  findOne (query) {
    return this.repo.findOne(query)
  }
}
