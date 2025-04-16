import { Router ,Request,Response,NextFunction} from "express";
import { listProducts ,getProductById,creatProduct} from "../../controllers/products/products";

const router=Router()


router.get('/',listProducts)
router.get('/:id',getProductById)



export default router