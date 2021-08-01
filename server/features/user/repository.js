import { ObjectId } from 'mongodb'
import UserError from './error.js'

export default class UserRepository {
  constructor (collection) {
    if (!collection) throw new UserError('missing dependency: collection')
    this.collection = collection
  }

  create (user) {
    return this.collection.users.insertOne(user)
  }

  update (user) {
    const { id, ...rest } = user
    return this.collection.users.update({
      _id: ObjectId(id),
      ...rest
    })
  }

  findAll (query) {
    return this.collection.users.find(query).toArray()
  }

  findOne (id) {
    return this.collection.users.findOne({ _id: ObjectId(id) })
  }
}
