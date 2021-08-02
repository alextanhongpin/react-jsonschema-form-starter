// Inspired by: https://grpc.github.io/grpc/core/md_doc_statuscodes.html
export const ErrorCode = Object.freeze({
  AlreadyExists: 'AlreadyExists',
  BadInput: 'BadInput',
  Conflict: 'Conflict',
  FailedPrecondition: 'FailedPrecondition',
  Internal: 'Internal',
  NotFound: 'NotFound',
  Unknown: 'Unknown'
})

export class DomainError extends Error {
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    this.code = ErrorCode.Unknown
  }
}

export class AlreadyExistsError extends DomainError {
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    this.code = ErrorCode.AlreadyExists
  }
}

export class BadInputError extends DomainError {
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    this.code = ErrorCode.BadInput
  }
}

export function required (obj) {
  for (const key in obj) {
    if (key === undefined || key === null) {
      throw new BadInputError(`"${key}" is required`)
    }
  }
}

export class ConflictError extends DomainError {
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    this.code = ErrorCode.Conflict
  }
}

export class FailedPreconditionError extends DomainError {
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    this.code = ErrorCode.FailedPrecondition
  }
}

export class InternalError extends DomainError {
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    this.code = ErrorCode.Internal
  }
}

export class NotFoundError extends DomainError {
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    this.code = ErrorCode.NotFound
  }
}

export class UnknownError extends DomainError {
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    this.code = ErrorCode.Unknown
  }
}
