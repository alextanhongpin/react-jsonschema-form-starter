import { ObjectId } from 'mongodb'
import { InternalError } from '../error/error.js'

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

  findOne (id) {
    return this.collection.forms.findOne({ _id: ObjectId(id) })
  }

  findAllUsers () {
    return this.collection.users.find().toArray()
  }
}
