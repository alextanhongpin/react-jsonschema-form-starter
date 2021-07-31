import FormController from './controller.js'
import FormUsecase from './usecase.js'
import FormRepository from './repository.js'
import FormError from './error.js'
import Router from 'express'
import { seed } from './seed.js'

export async function createFormFeature (db) {
  if (!db) throw new FormError('missing dependency: db')

  const repo = new FormRepository(db)
  const usecase = new FormUsecase(repo)
  const controller = new FormController(usecase).createRoutes()

  try {
    await usecase.create(seed)
  } catch (error) {
    console.error(error)
  }

  const router = new Router()
  router.get('/:id', controller.getForm)
  router.get('/', controller.getForms)
  router.post('/', controller.postForm)
  return router
}
