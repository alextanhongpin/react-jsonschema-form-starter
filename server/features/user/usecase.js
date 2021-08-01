import UserError from './error.js'

export default class UserUsecase {
  constructor (repo) {
    if (!repo) throw new UserError('missing dependency: repo')
    this.repo = repo
  }

  create (user) {
    return this.repo.create(user)
  }

  update (user) {
    return this.repo.update(user)
  }

  findAll (query) {
    return this.repo.findAll(query)
  }

  findOne (id) {
    return this.repo.findOne(id)
  }
}
