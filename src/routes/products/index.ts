import { Router ,Request,Response,NextFunction} from "express";

const routter=Router()


routter.get('/',(req:Request,res:Response,next:NextFunction)=>{

    res.status(200).json({Message:'Hello world'})

})



export default routter