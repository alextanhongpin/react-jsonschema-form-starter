import { InternalError } from '../error/error.js'
import Form from '../form/entity.js'

export default class DynamicFormUsecase {
  constructor ({ userUsecase, formUsecase }) {
    if (!userUsecase) {
      throw new InternalError('missing dependency: userUsercase')
    }
    if (!formUsecase) {
      throw new InternalError('missing dependency: formUsecase')
    }

    this.userUsecase = userUsecase
    this.formUsecase = formUsecase
  }

  async findFormForUpdate ({ id, formName }) {
    const entity = await this.#findEntity(formName, {
      _id: id
    })
    const form = await this.formUsecase.findOne({ name: formName })
    const formModel = new Form(form)
    const formData = formModel.extractFormData(entity)

    const { jsonSchema, uiSchema, apiSchema } = formModel.json
    return {
      formData,
      schema: jsonSchema,
      uiSchema,
      apiSchema
    }
  }

  async update ({ formName, id, data }) {
    const form = await this.formUsecase.findOne({ name: formName })
    const formModel = new Form(form)
    formModel.validate(data)

    const updateResult = await this.#updateEntity(formName, { _id: id }, data)
    return updateResult
  }

  async create ({ formName, data }) {
    const form = await this.formUsecase.findOne({ name: formName })
    const formModel = new Form(form)
    formModel.validate(data)

    const createResult = await this.#createEntity(formName, data)
    return createResult
  }

  #findEntity (name, query) {
    switch (name) {
      case 'users':
        return this.userUsecase.findOne(query)
      default:
        throw new InternalError('not implemented')
    }
  }

  #updateEntity (name, query, data) {
    switch (name) {
      case 'users':
        return this.userUsecase.update(query, data)
      default:
        throw new InternalError('not implemented')
    }
  }

  #createEntity (name, data) {
    switch (name) {
      case 'users':
        return this.userUsecase.create(data)
      default:
        throw new InternalError('not implemented')
    }
  }
}
