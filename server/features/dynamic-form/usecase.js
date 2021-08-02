import { InternalError } from '../error/error.js'
import Form from '../form/entity.js'

const entity = {
  Users: 'users',
  Books: 'books'
}

export default class DynamicFormUsecase {
  constructor ({ userUsecase, formUsecase, bookUsecase }) {
    if (!userUsecase) {
      throw new InternalError('missing dependency: userUsercase')
    }
    if (!formUsecase) {
      throw new InternalError('missing dependency: formUsecase')
    }
    if (!bookUsecase) {
      throw new InternalError('missing dependency: bookUsecase')
    }

    this.userUsecase = userUsecase
    this.formUsecase = formUsecase
    this.bookUsecase = bookUsecase
  }

  async findFormForUpdate ({ id, formName }) {
    const form = await this.formUsecase.findOne({ name: formName })
    const formModel = new Form(form)

    const entity = await this.#findEntity(formName, { _id: id })
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
      case entity.Users:
        return this.userUsecase.findOne(query)
      case entity.Books:
        return this.bookUsecase.findOne(query)
      default:
        throw new InternalError('not implemented')
    }
  }

  #updateEntity (name, query, data) {
    switch (name) {
      case entity.Users:
        return this.userUsecase.update(query, data)
      case entity.Books:
        return this.bookUsecase.update(query, data)
      default:
        throw new InternalError('not implemented')
    }
  }

  #createEntity (name, data) {
    switch (name) {
      case entity.Users:
        return this.userUsecase.create(data)
      case entity.Books:
        return this.bookUsecase.create(data)
      default:
        throw new InternalError('not implemented')
    }
  }
}
