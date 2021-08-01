import FormError from './error.js'

export default class FormController {
  constructor (usecase) {
    if (!usecase) throw new FormError('missing dependency: usecase')
    this.usecase = usecase
  }

  createRoutes () {
    const usecase = this.usecase

    async function getForm (req, res) {
      const form = await usecase.findOne(req.params.id)
      return res.status(200).json({
        data: form
      })
    }

    async function getForms (req, res) {
      const forms = await usecase.findAll(req.query)
      return res.status(200).json({
        data: forms
      })
    }

    async function postForm (req, res) {
      const form = await usecase.create(req.body)
      return res.status(200).json({
        data: form
      })
    }

    return {
      getForm,
      getForms,
      postForm
    }
  }
}
