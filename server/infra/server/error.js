import { ErrorCode } from '../../features/error/error.js'

const statusCodeByErrorCode = {
  [ErrorCode.AlreadyExists]: 409, // Conflict.
  [ErrorCode.BadInput]: 400, // Bad request.
  [ErrorCode.Conflict]: 409,
  [ErrorCode.FailedPrecondition]: 412,
  [ErrorCode.Internal]: 500,
  [ErrorCode.NotFound]: 404,
  [ErrorCode.Unknown]: 500
}

export function errorMiddleware (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }

  // Handles json response.
  if (req.xhr || req.headers['content-type'].startsWith('application/json')) {
    const statusCode = statusCodeByErrorCode[err.code] ?? 500
    const error = err.message
    const code = err.code ?? ErrorCode.Internal
    return res.status(statusCode).json({
      error,
      code
    })
  }
  next(err)
}
