import { InternalError, NotFoundError } from '../error/error.js'
import { parseObjectId } from '../../infra/db/error.js'

export default class FormRepository {
  constructor (collection) {
    if (!collection) throw new InternalError('missing dependency: collection')
    this.collection = collection
  }

  create (form) {
    return this.collection.forms.insertOne(form)
  }

  createMany (forms) {
    // This options prevents additional documents from being inserted if one fails.
    const options = { ordered: true }
    return this.collection.forms.insertMany(forms, options)
  }

  findAll (query) {
    return this.collection.forms.find(query).toArray()
  }

  async findOne (query) {
    parseObjectId(query)

    const form = await this.collection.forms.findOne(query)
    if (!form) throw new NotFoundError('form not found')
    return form
  }

  findAllUsers () {
    return this.collection.users.find().toArray()
  }
}
