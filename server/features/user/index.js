import Router from 'express'

import UserController from './controller.js'
import UserUsecase from './usecase.js'
import UserRepository from './repository.js'
import UserError from './error.js'
import { data } from './seed.js'

export function createUserFeature (collection) {
  if (!collection) throw new UserError('missing dependency: collection')

  const repo = new UserRepository(collection)
  const usecase = new UserUsecase(repo)
  const controller = new UserController(usecase).createRoutes()

  async function seed () {
    try {
      await usecase.create(data)
    } catch (error) {
      console.error(error)
    }
  }

  const router = new Router()
  router.get('/:id', controller.getUser)
  router.get('/', controller.getUsers)
  router.post('/', controller.postUser)
  router.patch('/', controller.patchUser)

  return {
    router,
    repo,
    usecase,
    controller,
    seed
  }
}
