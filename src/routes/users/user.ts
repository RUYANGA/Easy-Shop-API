import { Router } from "express"

import {creatUser, Dashboard,verifyOtp,Login,resendOtp,userUpdate,deleteAcount} from '../../controllers/users/user'

import {signUp_Validation,verify_Otp,loginValidation,resendOtp_validation,} from '../../middlewares/validations/users/validator'

import {validateRequest} from '../../middlewares/auth/requestValidator'
import {AuthorizeRoles} from '../../middlewares/auth/verifyToken'


const router=Router()

router.post('/user/create',signUp_Validation,validateRequest,creatUser);
router.post('/user/verify',verify_Otp,validateRequest,verifyOtp);
router.post('/user/resendotp',resendOtp_validation,validateRequest,resendOtp)
router.post('/user/login',loginValidation,validateRequest,Login)
router.get('/user/dashboard',AuthorizeRoles(['ADMIN']),Dashboard)
router.put('/user/updates',AuthorizeRoles(['USER','ADMIN']),userUpdate)
router.delete('/user/delete',AuthorizeRoles(['USER','ADMIN']),deleteAcount)


export default router