import { InternalError } from '../error/error.js'

export default class UserUsecase {
  constructor (repo) {
    if (!repo) throw new InternalError('missing dependency: repo')
    this.repo = repo
  }

  create (user) {
    return this.repo.create(user)
  }

  update (query, params) {
    return this.repo.update(query, params)
  }

  findAll (query) {
    return this.repo.findAll(query)
  }

  findOne (id) {
    return this.repo.findOne(id)
  }
}
