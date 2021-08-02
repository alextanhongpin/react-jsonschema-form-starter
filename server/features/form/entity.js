import Ajv from 'ajv'
// ajv v7 does not include format validation such as email, telephone etc.
import addFormats from 'ajv-formats'
import { required } from '../error/error.js'

export default class Form {
  constructor (json) {
    required({
      json,
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
      result[key] = schema.properties[key]?.properties
        ? Form.extractFormData(schema.properties[key], data[key])
        : data[key]
    }

    return result
  }

  static validate (schema, data) {
    const ajv = new Ajv({
      // Some of the jsonschema-forms has additional
      // properties not available in the standard
      // jsonschema (e.g. "enumNames" to display dropdown).
      // Instead of throwing error, logging is a better option.
      strictSchema: 'log'
    })
    addFormats(ajv)
    const valid = ajv.validate(schema, data)
    return {
      valid,
      errors: ajv.errors
    }
  }
}
