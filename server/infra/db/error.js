import { ObjectId } from 'mongodb'
import { BadInputError } from '../../features/error/index.js'

// parseObjectId validates if obj._id id set, validates it, and parses it to
// native mongodb ObjectId.
export function parseObjectId (obj) {
  const id = obj._id
  if (id === null || id === undefined) {
    return
  }

  if (!ObjectId.isValid(id)) {
    throw new BadInputError('id is invalid')
  }

  if (obj._id) {
    obj._id = ObjectId(id)
  }
}
