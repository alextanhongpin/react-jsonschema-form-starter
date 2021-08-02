import { InternalError } from '../error/error.js'

export default class FormController {
  constructor (usecase) {
    if (!usecase) throw new InternalError('missing dependency: usecase')
    this.usecase = usecase
  }

  createRoutes () {
    const usecase = this.usecase

    async function getForm (req, res, next) {
      try {
        const form = await usecase.findOne(req.params.id)
        return res.status(200).json({
          data: form
        })
      } catch (err) {
        next(err)
      }
    }

    async function getForms (req, res, next) {
      try {
        const forms = await usecase.findAll(req.query)
        return res.status(200).json({
          data: forms
        })
      } catch (err) {
        next(err)
      }
    }

    async function postForm (req, res, next) {
      try {
        const form = await usecase.create(req.body)
        return res.status(200).json({
          data: form
        })
      } catch (err) {
        next(err)
      }
    }

    return {
      getForm,
      getForms,
      postForm
    }
  }
}
