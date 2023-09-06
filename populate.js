import { readFile } from 'fs/promises'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import Job from './models/JobModel.js'
import User from './models/UserModel.js'

try {
  await mongoose.connect(process.env.MONGODB_URL)
  const user = await User.findOne({ email: 'cookerolo@gmail.com' })
  console.log(user)
  const jsonJobs = JSON.parse(
    await readFile(new URL('./utils/MOCK.json', import.meta.url))
  )
  console.log(jsonJobs)
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id }
  })
  console.log(jobs)
  await Job.deleteMany({ createdBy: user._id })
  await Job.create(jobs)
  console.log('Sucess')
  process.exit(0)
} catch (err) {
  console.log('Error ' + err)
  process.exit(1)
}
