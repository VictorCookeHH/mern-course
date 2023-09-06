import { Router } from 'express'
import { login, logout, register } from '../controllers/authController.js'
import {
  validateLoginInput,
  validateRegisterInput,
} from '../middleware/validationMiddleware.js'
import rateLimiter from 'express-rate-limit'

const router = Router()
const apiLimiter = rateLimiter({
  windowMs: 1000 * 15 * 60,
  max: 15,
  message: 'IP rate limit exceeded, please re-try in 15 minutes.',
})

router.post('/register', apiLimiter, validateRegisterInput, register)
router.post('/login', apiLimiter, validateLoginInput, login)
router.get('/logout', logout)

export default router
