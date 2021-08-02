import Router from 'express'

import FormController from './controller.js'
import FormUsecase from './usecase.js'
import FormRepository from './repository.js'
import { InternalError } from '../error/error.js'
import { data } from './seed.js'

export function createFormFeature (collection) {
  if (!collection) throw new InternalError('missing dependency: collection')

  const repo = new FormRepository(collection)
  const usecase = new FormUsecase(repo)
  const controller = new FormController(usecase).createRoutes()

  async function seed () {
    try {
      await usecase.createMany(data)
    } catch (error) {
      console.error(error)
    }
  }

  const router = new Router()
  router.get('/:id', controller.getForm)
  router.get('/', controller.getForms)
  router.post('/', controller.postForm)

  return {
    router,
    seed,
    repo,
    usecase,
    controller
  }
}
