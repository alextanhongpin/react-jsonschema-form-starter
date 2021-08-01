import FormError, { required } from './error.js'
import Ajv from 'ajv'

export default class Form {
  constructor (json) {
    if (!json) throw new FormError('not found')

    required({
      name: json.name,
      // resource: json.resource, // users
      // action: json.action, // create, update, delete
      jsonSchema: json.jsonSchema,
      uiSchema: json.uiSchema
    })
    this.json = json
  }

  extractFormData (data) {
    return Form.extractFormData(this.json.jsonSchema, data)
  }

  validate (data) {
    const { valid, errors } = Form.validate(this.json.jsonSchema, data)
    if (!valid) throw new Error(JSON.stringify(errors))
    return valid
  }

  static extractFormData (schema, data) {
    if (!data) return

    const result = {}
    for (const key in schema.properties) {
      result[key] =
        'properties' in schema.properties[key]
          ? Form.extractFormData(schema.properties[key], data[key])
          : data[key]
    }

    return result
  }

  static validate (schema, data) {
    const ajv = new Ajv()
    const valid = ajv.validate(schema, data)
    return {
      valid,
      errors: ajv.errors
    }
  }
}
