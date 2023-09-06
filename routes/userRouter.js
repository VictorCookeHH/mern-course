import { Router } from 'express'

import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
  updateUserPassword,
} from '../controllers/userController.js'
import {
  validateUpdateUserInput,
  validateUserPasswordUpdate,
} from '../middleware/validationMiddleware.js'
import {
  authorizePermission,
  checkForTestUser,
} from '../middleware/authMiddleware.js'
import upload from '../middleware/multerMiddleware.js'

const router = Router()

router.get('/me', getCurrentUser)
router.get('/admin', [authorizePermission('admin')], getApplicationStats)
router.post(
  '/update-password',
  checkForTestUser,
  validateUserPasswordUpdate,
  updateUserPassword
)
router.patch(
  '/update-user',
  checkForTestUser,
  upload.single('avatar'),
  validateUpdateUserInput,
  updateUser
)

export default router
