import Router from 'express'
import CountryController from './controller.js'

export function createCountryFeature () {
  const controller = new CountryController().createRoutes()

  const router = new Router()
  router.get('/:id', controller.getCountry)
  router.get('/', controller.getCountries)

  return {
    controller,
    router
  }
}
