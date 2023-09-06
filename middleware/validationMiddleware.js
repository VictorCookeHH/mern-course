import { body, param, validationResult } from 'express-validator'
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../errors/customErrors.js'
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js'
import mongoose from 'mongoose'
import Job from '../models/JobModel.js'
import User from '../models/UserModel.js'

const withValidationError = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg)
        if (errorMessages[0].startsWith('No job'))
          throw new NotFoundError(errorMessages)
        if (errorMessages[0].startsWith('Not authorized'))
          throw new UnauthorizedError(errorMessages)
        throw new BadRequestError(errorMessages)
      }
      next()
    },
  ]
}

export const validateJobInput = withValidationError([
  body('company').notEmpty().withMessage('Field company is required'),
  body('position').notEmpty().withMessage('Field position is required'),
  body('jobStatus')
    .isIn(Object.values(JOB_STATUS))
    .withMessage(
      `Please provide a valid job status: ${Object.values(JOB_STATUS)}`
    ),
  body('jobType')
    .isIn(Object.values(JOB_TYPE))
    .withMessage(`Please provide a valid job type: ${Object.values(JOB_TYPE)}`),
])

export const validateIdParam = withValidationError([
  param('id').custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value)
    if (!isValidId) throw new Error(`No job with id ${value}`)
    const job = await Job.findById(value)
    if (!job) throw new Error(`No job with id ${value}`)
    const isAdmin = req.user.role === 'admin'
    const isOwner = req.user.id === job.createdBy.toString()
    if (!isAdmin && !isOwner) throw new UnauthorizedError('Not authorized')
  }),
])

export const validateRegisterInput = withValidationError([
  body('name').notEmpty().withMessage('Field name is required'),
  body('password')
    .notEmpty()
    .withMessage('Field password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be 8 character long'),
  body('email')
    .notEmpty()
    .withMessage('Field email is required')
    .isEmail()
    .withMessage('Invalid email')
    .custom(async (email) => {
      const user = await User.findOne({ email })
      if (user) throw new Error('Email already in use')
    }),
])

export const validateLoginInput = withValidationError([
  body('password').notEmpty().withMessage('Field password is required'),
  body('email')
    .notEmpty()
    .withMessage('Field email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
])

export const validateUpdateUserInput = withValidationError([
  body('name').notEmpty().withMessage('Field name is required'),
  body('email')
    .notEmpty()
    .withMessage('Field email is required')
    .isEmail()
    .withMessage('Invalid email')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email })
      if (user && user._id.toString() !== req.user.id)
        throw new Error('Email already in use')
    }),
])

export const validateUserPasswordUpdate = withValidationError([
  body('password').notEmpty().withMessage('Field password is required'),
])
