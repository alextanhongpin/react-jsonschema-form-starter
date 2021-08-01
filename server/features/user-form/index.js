import Router from 'express'
import UserFormController from './controller.js'

export function createUserFormFeature ({ userUsecase, formUsecase }) {
  const controller = new UserFormController({
    userUsecase,
    formUsecase
  }).createRoutes()

  const router = new Router()
  router.get('/:formName/:userId', controller.getUserFormForUpdate)
  router.patch('/:formName/:userId', controller.updateUser)
  router.post('/:formName', controller.createUser)

  return {
    controller,
    router
  }
}
