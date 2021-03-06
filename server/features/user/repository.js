import { InternalError, NotFoundError } from '../error/error.js'
import { parseObjectId } from '../../infra/db/error.js'

export default class UserRepository {
  constructor (collection) {
    if (!collection) throw new InternalError('missing dependency: collection')
    this.collection = collection
  }

  create (user) {
    return this.collection.users.insertOne(user)
  }

  update (query, params) {
    parseObjectId(query)

    return this.collection.users.updateOne(query, {
      $set: params
    })
  }

  findAll (query) {
    return this.collection.users.find(query).toArray()
  }

  async findOne (query) {
    parseObjectId(query)

    const user = await this.collection.users.findOne(query)
    if (!user) throw new NotFoundError('user not found')
    return user
  }
}
