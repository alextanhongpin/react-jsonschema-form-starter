import { InternalError } from '../error/error.js'
import Form from '../form/entity.js'

export default class UserFormController {
  constructor ({ userUsecase, formUsecase }) {
    if (!userUsecase) {
      throw new InternalError('missing dependency: userUsercase')
    }
    if (!formUsecase) {
      throw new InternalError('missing dependency: formUsecase')
    }

    this.userUsercase = userUsecase
    this.formUsecase = formUsecase
  }

  createRoutes () {
    const { userUsercase, formUsecase } = this

    async function getUserFormForUpdate (req, res, next) {
      try {
        const { userId, formName } = req.params

        const user = await userUsercase.findOne(userId)
        const forms = await formUsecase.findAll({ name: formName })
        const form = new Form(forms?.[0])
        const formData = form.extractFormData(user)

        return res.status(200).json({
          data: {
            formData,
            schema: form.json.jsonSchema,
            uiSchema: form.json.uiSchema
          }
        })
      } catch (err) {
        next(err)
      }
    }

    async function updateUser (req, res, next) {
      try {
        const { userId, formName } = req.params
        const user = req.body

        const forms = await formUsecase.findAll({ name: formName })
        const form = new Form(forms?.[0])
        form.validate(user)
        const updateResult = await userUsercase.update({ _id: userId }, user)

        return res.status(200).json({
          data: updateResult
        })
      } catch (err) {
        next(err)
      }
    }

    async function createUser (req, res, next) {
      try {
        const { formName } = req.params
        const user = req.body

        const forms = await formUsecase.findAll({ name: formName })
        const form = new Form(forms?.[0])
        form.validate(user)
        const createResult = await userUsercase.create(user)
        return createResult
      } catch (err) {
        next(err)
      }
    }

    return {
      getUserFormForUpdate,
      updateUser,
      createUser
    }
  }
}
