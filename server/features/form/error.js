export default class FormError extends Error {
  constructor (message) {
    super(message)
    this.name = 'FormError'
  }
}

export function required (props = {}) {
  for (const key in props) {
    if (props[key] === undefined) {
      throw new FormError(`"${key}" is required`)
    }
  }
}
