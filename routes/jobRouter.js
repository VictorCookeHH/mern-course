import { Router } from 'express'
import {
  getAllJobs,
  getJob,
  createJob,
  editJob,
  deleteJob,
  showStats,
} from '../controllers/jobController.js'
import {
  validateIdParam,
  validateJobInput,
} from '../middleware/validationMiddleware.js'
import { checkForTestUser } from '../middleware/authMiddleware.js'

const router = Router()

router
  .route('/')
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob)

router.route('/stats').get(showStats)
router
  .route('/:id')
  .get(validateIdParam, getJob)
  .delete(checkForTestUser, validateIdParam, deleteJob)
  .patch(checkForTestUser, validateIdParam, validateJobInput, editJob)

export default router
