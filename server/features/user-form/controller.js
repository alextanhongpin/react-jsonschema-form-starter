import Form from '../form/entity.js'

export default class UserFormController {
  constructor ({ userUsecase, formUsecase }) {
    if (!userUsecase) {
      throw new Error('userFormError: missing dependency: userUsercase')
    }
    if (!formUsecase) {
      throw new Error('userFormError: missing dependency: formUsecase')
    }

    this.userUsercase = userUsecase
    this.formUsecase = formUsecase
  }

  createRoutes () {
    const { userUsercase, formUsecase } = this

    async function getUserFormForUpdate (req, res) {
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
    }

    async function updateUser (req, res) {
      const { userId, formName } = req.params
      const user = req.body

      const forms = await formUsecase.findAll({ name: formName })
      const form = new Form(forms?.[0])
      form.validate(user)
      const updateResult = await userUsercase.update({
        id: userId,
        ...user
      })
      return updateResult
    }

    async function createUser (req, res) {
      try {
        const { formName } = req.params
        const user = req.body

        const forms = await formUsecase.findAll({ name: formName })
        const form = new Form(forms?.[0])
        form.validate(user)
        const createResult = await userUsercase.create(user)
        return createResult
      } catch (error) {
        return res.status(400).json({
          error: error.message
        })
      }
    }

    return {
      getUserFormForUpdate,
      updateUser,
      createUser
    }
  }
}
