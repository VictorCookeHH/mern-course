import mongoose from 'mongoose'
import { JOB_LOCATION, JOB_STATUS, JOB_TYPE } from '../utils/constants.js'

const JobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FULL_TIME,
    },
    jobLocation: {
      type: String,
      enum: Object.values(JOB_LOCATION),
      default: JOB_LOCATION.REMOTE,
    },
    jobUrl: {
      type: String,
      default: 'https://www.linkedin.com',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

export default mongoose.model('Job', JobSchema)
