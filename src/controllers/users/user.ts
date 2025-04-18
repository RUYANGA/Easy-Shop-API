import { PrismaClient } from '@prisma/client'
import { Request,Response,NextFunction } from 'express'
const prisma=new PrismaClient()
import { validationResult } from 'express-validator'
import {randomInt} from 'crypto'
import {addMinutes,isAfter} from 'date-fns'

export async function creatUser(req:Request,res:Response,next:NextFunction){

    interface User {
        username:string,
        email:string,
        password:string
    }

    const {username,email,password}:User=req.body

    const otp:string= await randomInt(111111,999999).toString()
    const expiredOtp:Date= addMinutes(new Date(),15)

    const user=await prisma.user.create({
        data:{username,email,password}
    })

    await prisma.otp.create({
        data:{
            userId:user.id,
            otp,
            expiredOtp
        }
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