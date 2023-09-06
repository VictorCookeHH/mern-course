import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from '../errors/customErrors.js'
import { verifyJWT } from '../utils/tokenUtils.js'

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies
  if (!token) throw new UnauthenticatedError('No token provided')
  try {
    const { id, role } = verifyJWT(token)
    const testUser = role === 'test'
    req.user = { id, role, testUser }
    next()
  } catch (err) {
    throw new UnauthenticatedError('Invalid authentication')
  }
}

export const authorizePermission = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized user')
    }
    next()
  }
}

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) throw new BadRequestError('Demo user. Read Only!')
  next()
}
