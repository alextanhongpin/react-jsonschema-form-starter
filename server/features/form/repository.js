import { InternalError } from '../error/error.js'
import { parseObjectId } from '../../infra/db/error.js'

export default class FormRepository {
  constructor (collection) {
    if (!collection) throw new InternalError('missing dependency: collection')
    this.collection = collection
  }

  create (form) {
    return this.collection.forms.insertOne(form)
  }

  findAll (query) {
    return this.collection.forms.find(query).toArray()
  }

  findOne (query) {
    parseObjectId(query)
    return this.collection.forms.findOne(query)
  }

  findAllUsers () {
    return this.collection.users.find().toArray()
  }
}
