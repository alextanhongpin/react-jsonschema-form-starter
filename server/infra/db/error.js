import { ObjectId } from 'mongodb'
import { BadInputError } from '../../features/error/index.js'

// parseObjectId validates if obj._id id set, validates it, and parses it to
// native mongodb ObjectId.
export function parseObjectId (obj, field = '_id') {
  const id = obj[field]
  if (id === null || id === undefined) {
    return
  }

  if (!ObjectId.isValid(id)) {
    throw new BadInputError('id is invalid')
  }

  if (obj[field]) {
    obj[field] = ObjectId(id)
  }
}
