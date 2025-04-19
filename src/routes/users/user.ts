import { Router } from "express"

import {creatUser, Dashboard,verifyOtp} from '../../controllers/users/user'

import {signUp_Validation,verify_Otp} from '../../middlewares/validations/users/validator'

import {validateRequest} from '../../middlewares/auth/requestValidator'


const router=Router()

router.post('/user/create',signUp_Validation,validateRequest,creatUser);
router.post('/user/verify',verify_Otp,validateRequest,verifyOtp);
router.get('/user/dashboard',Dashboard)


export default router