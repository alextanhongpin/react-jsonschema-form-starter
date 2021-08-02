import Router from 'express'
import DynamicFormUsecase from './usecase.js'
import DynamicFormController from './controller.js'

export function createDynamicFormFeature ({
  bookUsecase,
  userUsecase,
  formUsecase
}) {
  const usecase = new DynamicFormUsecase({
    bookUsecase,
    userUsecase,
    formUsecase
  })
  const controller = new DynamicFormController(usecase).createRoutes()

  const router = new Router()

  // NOTE: Instead of getting by single id, we can also just accept the
  // querystring as mongo findOne query, aka req.query.
  // However, for most form, let's assume we want to fetch only for one entity.
  router.get('/:formName/:id', controller.findOne)
  router.patch('/:formName/:id', controller.update)
  router.post('/:formName', controller.create)

  return {
    controller,
    router
  }
}
