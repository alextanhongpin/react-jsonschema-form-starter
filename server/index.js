import { Router } from 'express'
import { start, decorate } from './infra/server/index.js'
import { createCountryFeature } from './features/country/index.js'
import { createFormFeature } from './features/form/index.js'
import { createUserFeature } from './features/user/index.js'
import { createUserFormFeature } from './features/user-form/index.js'
import { collection } from './infra/db.js'

decorate(async (app) => {
  const country = createCountryFeature()
  const form = createFormFeature(collection)
  const user = createUserFeature(collection)
  const userForm = createUserFormFeature({
    userUsecase: user.usecase,
    formUsecase: form.usecase
  })

  // Seed data.
  await Promise.all([form.seed(), user.seed()])

  const v1 = new Router()
  v1.use('/countries', country.router)
  v1.use('/forms', form.router)
  v1.use('/user-forms', userForm.router)
  v1.use('/users', user.router)

  app.use('/api/v1', v1)
})

start()
