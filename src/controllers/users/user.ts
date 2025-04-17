import { PrismaClient } from '@prisma/client'
import { Request,Response,NextFunction } from 'express'
const prisma=new PrismaClient()

export async function creatUser(req:Request,res:Response,next:NextFunction){

    const {username,email,password}=req.body

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