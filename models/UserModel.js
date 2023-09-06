import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    lastName: {
      type: String,
      default: 'Perez',
    },
    location: {
      type: String,
      default: 'Argentina',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    avatar: String,
    avatarPublicId: String,
  },
  { timestamps: true }
)

UserSchema.methods.toJSON = function () {
  let obj = this.toObject()
  delete obj.password
  delete obj.createdAt
  delete obj.updatedAt
  delete obj.__v
  return obj
}

export default mongoose.model('User', UserSchema)
