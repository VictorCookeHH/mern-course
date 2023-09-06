import { StatusCodes } from 'http-status-codes'
import User from '../models/UserModel.js'
import Job from '../models/JobModel.js'
import { hashPassword } from '../utils/passwordUtils.js'
import cloudinary from 'cloudinary'
import { formatImage } from '../middleware/multerMiddleware.js'

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.id)
  res.status(StatusCodes.OK).send({ user: user.toJSON() })
}

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments()
  const jobs = await Job.countDocuments()
  res.status(StatusCodes.OK).send({ users, jobs })
}

export const updateUser = async (req, res) => {
  if (req.file) {
    const file = formatImage(req.file)
    const response = await cloudinary.v2.uploader.upload(file)
    req.body.avatar = response.secure_url
    req.body.avatarPublicId = response.public_id
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body)
  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId)
  }

  res.status(StatusCodes.OK).send('User updated')
}
export const updateUserPassword = async (req, res) => {
  const user = await User.findById(req.user.id)
  const hashedPassword = await hashPassword(req.body.password)
  user.password = hashedPassword
  await user.save()
  res.status(StatusCodes.OK).send('Password updated')
}
