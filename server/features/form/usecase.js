import { InternalError } from '../error/error.js'

export default class FormUsecase {
  constructor (repo) {
    if (!repo) throw new InternalError('missing dependency: repo')
    this.repo = repo
  }

  create (form) {
    return this.repo.create(form)
  }

  findAll (query) {
    return this.repo.findAll(query)
  }

  findOne (query) {
    return this.repo.findOne(query)
  }
}
