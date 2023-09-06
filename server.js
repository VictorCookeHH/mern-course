import 'express-async-errors'
import express from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

dotenv.config()
import cloudinary from 'cloudinary'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'

import jobRouter from './routes/jobRouter.js'
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

import errorHandleMiddleware from './middleware/errorHandlerMiddleware.js'
import { authenticateUser } from './middleware/authMiddleware.js'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      imgSrc: ["'self'", '*.cloudinary.com'],
    },
  })
)
app.use(mongoSanitize())

const __dirname = dirname(fileURLToPath(import.meta.url))

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.static(path.resolve(__dirname, './client/dist')))

app.use('/api/jobs', authenticateUser, jobRouter)
app.use('/api/users', authenticateUser, userRouter)
app.use('/api/auth', authRouter)

app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'))
})

app.use('*', (req, res) => {
  res.status(404).send('Not found')
})

app.use(errorHandleMiddleware)

const db = process.env.MONGODB_URL
mongoose
  .connect(db)
  .then(() => console.log(`Connected to MongoDB on ${db}...`))
  .catch((e) => console.log('Could not connect to MongoDB', e.message))
const port = process.env.PORT

app.listen(port, () => {
  console.log('Server running on port ' + port)
})
