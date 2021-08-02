import Router from 'express'
import DynamicFormUsecase from './usecase.js'
import DynamicFormController from './controller.js'

export function createDynamicFormFeature ({ userUsecase, formUsecase }) {
  const usecase = new DynamicFormUsecase({
    userUsecase,
    formUsecase
  })
  const controller = new DynamicFormController(usecase).createRoutes()

  const router = new Router()
  router.get('/:formName/:id', controller.findOne)
  router.patch('/:formName/:id', controller.update)
  router.post('/:formName', controller.create)

  return {
    controller,
    router
  }
}
