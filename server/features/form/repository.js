import { ObjectId } from 'mongodb'
import FormError from './error.js'

export default class FormRepository {
  constructor (db) {
    if (!db) throw new FormError('missing dependency: db')
    this.db = db
  }

  create (form) {
    return this.db.insertOne(form)
  }

  findAll (query) {
    return this.db.find(query).toArray()
  }

  findOne (id) {
    return this.db.findOne({ _id: ObjectId(id) })
  }
}
