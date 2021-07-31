import { start, decorate } from './infra/server.js'
import { createFormFeature } from './features/form/index.js'
import { collections } from './infra/db.js'

decorate(async (app) => {
  app.use('/forms', await createFormFeature(collections.Forms))
})

start()
