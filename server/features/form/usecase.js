import FormError from './error.js'

export default class FormUsecase {
  constructor (repo) {
    if (!repo) throw new FormError('missing dependency: repo')
    this.repo = repo
  }

  create (form) {
    return this.repo.create(form)
  }

  findAll (query) {
    return this.repo.findAll(query)
  }

  findOne (id) {
    return this.repo.findOne(id)
  }
}
