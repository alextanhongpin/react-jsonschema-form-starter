import { ObjectId } from 'mongodb'
import { InternalError } from '../error/error.js'

export default class UserRepository {
  constructor (collection) {
    if (!collection) throw new InternalError('missing dependency: collection')
    this.collection = collection
  }

  create (user) {
    return this.collection.users.insertOne(user)
  }

  update (query, params) {
    return this.collection.users.updateOne(
      {
        _id: ObjectId(query._id)
      },
      {
        $set: params
      }
    )
  }

  findAll (query) {
    return this.collection.users.find(query).toArray()
  }

  findOne (id) {
    return this.collection.users.findOne({ _id: ObjectId(id) })
  }
}
