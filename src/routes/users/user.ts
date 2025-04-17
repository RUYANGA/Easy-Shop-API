import { Router } from "express"

import {creatUser, Dashboard} from '../../controllers/users/user'

import {signUp_Validation} from '../../middlewares/validations/users/validator'

import {validateRequest} from '../../middlewares/auth/requestValidator'


const router=Router()

router.post('/user/create',signUp_Validation,validateRequest,creatUser)
router.get('/user/dashboard',Dashboard)


export default router