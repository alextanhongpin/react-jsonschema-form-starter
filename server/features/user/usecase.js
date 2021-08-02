import { BadInputError, InternalError } from '../error/error.js'

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
    try {
      for (const key in query) {
        query[key] = JSON.parse(query[key])
      }
    } catch (error) {
      throw new BadInputError(error.message)
    }
    return this.repo.findAll(query)
  }

  findOne (query) {
    return this.repo.findOne(query)
  }
}
