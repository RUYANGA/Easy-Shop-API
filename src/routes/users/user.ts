import { Router } from "express"

import {creatUser} from '../../controllers/users/user'


const router=Router()

router.post('/user/create',creatUser)


export default router