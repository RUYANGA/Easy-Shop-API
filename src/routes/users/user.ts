import { Router } from "express"

import {creatUser, Dashboard} from '../../controllers/users/user'


const router=Router()

router.post('/user/create',creatUser)
router.get('/user/dashboard',Dashboard)


export default router