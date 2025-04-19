import { PrismaClient } from '@prisma/client'
import { Request,Response,NextFunction } from 'express'
import {randomInt} from 'crypto'
import {addMinutes,isAfter} from 'date-fns'
import {sendEmail} from '../util/nodemailer'



const prisma=new PrismaClient()

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

    sendEmail(email,otp,user.username)//send otp code to email

    res.status(200).json({Message:`Sign up successfully , please verify your otp code send to ${email}`})
};

export async function verifyOtp(req:Request,res:Response,next:NextFunction):Promise<any>{

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

    if(!otpFound) return res.status(404).json({Message:'Otp not found'})
    
    if(otp!== otpFound.otp|| otpFound.expiredOtp < new Date()){
        return res.status(404).json({Message:'Otp expired or invalid'})
    }

    await prisma.user.update({
        where:{email:email},
        data:{Status:'ACTIVE'}
    })

    await prisma.otp.delete({
        where:{id:otpFound.id}
    })
    

    res.status(200).json({Message:'Email verified , now you can login'})

}

export async function Dashboard (req:Request,res:Response,next:NextFunction){

    const user=await prisma.user.findMany({
        include:{
            products:true
        }
    })

    res.status(200).json({Message:user})
}