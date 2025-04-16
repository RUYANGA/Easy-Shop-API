import { Router ,Request,Response,NextFunction} from "express";
import {
    listProducts,
    getProductById,
    creatProduct,  
    updateProduct,
    deleteProduct
    } from "../../controllers/products/products";

const router=Router()

router.get('/',listProducts)
router.get('/product/:id',getProductById)
router.post('/product/create',creatProduct)
router.put('/product/:id',updateProduct)
router.delete('/product/:id',deleteProduct)

export default router