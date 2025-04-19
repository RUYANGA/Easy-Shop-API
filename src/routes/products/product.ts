import { Router } from "express";
import {
    listProducts,
    getProductById,
    creatProduct,  
    updateProduct,
    deleteProduct
    } from "../../controllers/products/products";

import {product_validation} from '../../middlewares/validations/products/validations'
import {validateRequest} from '../../middlewares/auth/requestValidator'

const router=Router()

router.get('/',listProducts)
router.get('/product/:id',getProductById)
router.post('/product/create/:id',product_validation,validateRequest,creatProduct)
router.put('/product/:id',updateProduct)
router.delete('/product/:id',deleteProduct)

export default router