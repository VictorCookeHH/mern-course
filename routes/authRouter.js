import { Router } from 'express'
import { login, logout, register } from '../controllers/authController.js'
import {
  validateLoginInput,
  validateRegisterInput,
} from '../middleware/validationMiddleware.js'
import rateLimiter from 'express-rate-limit'

const router = Router()

router.post('/register', validateRegisterInput, register)
router.post('/login', validateLoginInput, login)
router.get('/logout', logout)

export default router
