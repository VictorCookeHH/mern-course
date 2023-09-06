import { StatusCodes } from 'http-status-codes'

const errorHandleMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
  res.status(statusCode).send(err.message)
  next()
}

export default errorHandleMiddleware
