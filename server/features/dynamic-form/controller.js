import { InternalError } from '../error/error.js'

export default class DynamicFormController {
  constructor (usecase) {
    if (!usecase) {
      throw new InternalError('missing dependency: usecase')
    }
    this.usecase = usecase
  }

  createRoutes () {
    const { usecase } = this

    async function findOne (req, res, next) {
      try {
        const { id, formName } = req.params
        const data = await usecase.findFormForUpdate({ id, formName })

        return res.status(200).json({ data })
      } catch (err) {
        next(err)
      }
    }

    async function update (req, res, next) {
      try {
        const { id, formName } = req.params

        const data = await usecase.update({
          formName,
          id: id,
          data: req.body
        })

        return res.status(200).json({ data })
      } catch (err) {
        next(err)
      }
    }

    async function create (req, res, next) {
      try {
        const { formName } = req.params

        const data = await usecase.create({
          formName,
          data: req.body
        })

        return res.status(200).json({ data })
      } catch (err) {
        next(err)
      }
    }

    return {
      findOne,
      update,
      create
    }
  }
}
