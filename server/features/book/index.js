import Router from 'express'

import BookController from './controller.js'
import BookUsecase from './usecase.js'
import BookRepository from './repository.js'
import { InternalError } from '../error/error.js'

export function createBookFeature (collection) {
  if (!collection) throw new InternalError('missing dependency: collection')

  const repo = new BookRepository(collection)
  const usecase = new BookUsecase(repo)
  const controller = new BookController(usecase).createRoutes()

  const router = new Router()
  router.get('/:id', controller.getBook)
  router.get('/', controller.getBooks)
  router.post('/', controller.postBook)
  router.patch('/', controller.patchBook)

  return {
    router,
    repo,
    usecase,
    controller
  }
}
