import { StatusCodes } from 'http-status-codes'
import User from '../models/UserModel.js'
import { comparePasswords, hashPassword } from '../utils/passwordUtils.js'
import { UnauthenticatedError } from '../errors/customErrors.js'
import { createJWT } from '../utils/tokenUtils.js'

export const register = async (req, res) => {
  const isFirstUser = (await User.countDocuments()) === 0
  req.body.role = isFirstUser ? 'admin' : 'user'

  const hashedPassword = await hashPassword(req.body.password)
  req.body.password = hashedPassword
  const user = await User.create(req.body)
  res.status(StatusCodes.CREATED).send('User created')
}

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  const isAuthorized =
    user && (await comparePasswords(req.body.password, user.password))
  if (!isAuthorized) throw new UnauthenticatedError('Invalid Credentials')
  const token = createJWT({ id: user._id, role: user.role })
  const sevenDays = 1000 * 60 * 60 * 24 * 7
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + sevenDays),
    secure: process.env.NODE_ENV === 'production',
  })
  res.status(StatusCodes.OK).send('User logged in')
}

export const logout = async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(),
  })
  res.status(StatusCodes.OK).send('User logged out')
}
