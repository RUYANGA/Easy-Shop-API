import { PrismaClient } from '@prisma/client'
import { Request,Response,NextFunction } from 'express'
const prisma=new PrismaClient()
import { validationResult } from 'express-validator'
import {randomInt} from 'crypto'
import {addMinutes,isAfter} from 'date-fns'
import {sendEmail} from '../util/nodemailer'

export async function creatUser(req:Request,res:Response,next:NextFunction){

    interface User {
        username:string,
        email:string,
        password:string
    }

    const {username,email,password}:User=req.body

    const otp:string= await randomInt(111111,999999).toString()
    const expiredOtp= addMinutes(new Date(),15)

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

    sendEmail(email,otp,user.username)

    res.status(200).json({Message:`Sign up successfully , please verify your otp code send to ${email}`})
};

export async function verifyOtp(req:Request,res:Response,next:NextFunction){

    interface InputVerify{
        email:string,
        otp:string
    }
    const {email,otp}:InputVerify=req.body

    const user=await prisma.user.findUnique({
        where:{email:email}
    })
    const otpFound=await prisma.otp.findUnique({
        where:{userId:user?.id}
    })
    
    if(user?.id !== otpFound?.userId ){

    }
    





}

export async function Dashboard (req:Request,res:Response,next:NextFunction){

    const user=await prisma.user.findMany({
        include:{
            products:true
        }
    })

    res.status(200).json({Message:user})
}