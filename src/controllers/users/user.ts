import { PrismaClient } from '@prisma/client'
import { Request,Response,NextFunction } from 'express'
const prisma=new PrismaClient()
import { validationResult } from 'express-validator'

export async function creatUser(req:Request,res:Response,next:NextFunction){

    const {username,email,password}=req.body

    const errors=validationResult(req)

    if(!errors.isEmpty()){

        const errorFormat=errors.array().map(err=>({
            message:err.msg
        }))
        res.status(400).json({Errors:errorFormat})
    }

    const user=await prisma.user.create({
        data:{username,email,password}
    })


    res.status(200).json({Message:user})
}

export async function Dashboard (req:Request,res:Response,next:NextFunction){

    const user=await prisma.user.findMany({
        include:{
            products:true
        }
    })

    res.status(200).json({Message:user})
}