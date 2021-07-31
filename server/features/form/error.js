export default class FormError extends Error {
  constructor (message) {
    super(message)
    this.name = 'FormError'
  }
}
