import { PrismaClient } from '@prisma/client'
import { Request,Response,NextFunction } from 'express'
import {randomInt} from 'crypto'
import {addMinutes,isAfter} from 'date-fns'
import {sendEmail} from '../util/nodemailer'
import  bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const JWT_KEY=process.env.JWTKEY || 'mydefaultkeyisruyanga' as string



const prisma=new PrismaClient()

export async function creatUser(req:Request,res:Response,next:NextFunction):Promise<any>{
    try {

        interface User {
            username:string,
            email:string,
            password:string
        }

        const {username,email,password}:User=req.body

        const otp:string= await randomInt(111111,999999).toString();
        const expiredOtp= addMinutes(new Date(),15);

        const hashPassword= await bcrypt.hash(password,12);

        const user=await prisma.user.create({
            data:{
                username,
                email,
                password:hashPassword
            }
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
    } catch (error) {
        return res.status(500).json({Message:'Error to register user!'})
    }
};

export async function resendOtp(req:Request,res:Response,next:NextFunction):Promise<any>{

    try {

        interface Resend {
            email:string
        }

        const {email}:Resend=req.body

        const user=await prisma.user.findUnique({
            where:{email:email}
        });
        const otp:string= await randomInt(111111,999999).toString()
        const expiredOtp= addMinutes(new Date(),15)

        if(!user) return res.status(404).json({Message:'User with email not found'});

        await prisma.otp.update({
            where:{userId:user.id},
            data:{
                otp,
                expiredOtp
            }
        })

        sendEmail(email,otp,user?.username);// send otp code to email

        res.status(201).json({Message:`Resend otp successfuly otp send to ${email}`})


    } catch (error) {
        console.log(error)
        return res.status(500).json({Message:'Error to resend otp! GUY'})
    }
}


export async function verifyOtp(req:Request,res:Response,next:NextFunction):Promise<any>{

    try {

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
        

        res.status(200).json({Message:'Email verified , now you can login'});

    } catch (error) {
        return res.status(500).json({Message:'Error to verify otp!'})
    }

};


export async function Login (req:Request,res:Response,next:NextFunction):Promise<any>{

   try {
        interface loginInput {
            email:string;
            password:string
        }

        const {email,password}:loginInput=req.body;

        const user=await prisma.user.findUnique({
            where:{email:email}
        });

        if(!user)return res.status(404).json({Message:'Email or password incorrect !'})

        if(!await bcrypt.compare(password,user.password)){
            return res.status(404).json({Message:'Email or password incorrect !'})
        };

        const token=jwt.sign(
            {id:user.id},
            JWT_KEY,
            {expiresIn:'60day'}
        )


        return res.status(200).json({Message:'User loged in  successfully, go to your dashboard',token:token})
   
   } catch (error) {
        return res.status(500).json({Message:'Error to login !'})
   }

}
export interface AuthenticatedRequest extends Request {
    user?: string;
  }

export async function userUpdate(req:AuthenticatedRequest,res:Response,next:NextFunction):Promise<any>{

    try {

        const {username,email,password}=req.body;

        let hashPass;
        if(password){
           hashPass= await bcrypt.hash(password,12)
        }
        const userId=await prisma.user.updateMany({
            where:{id:req.user},
            data:{
                username,
                password:hashPass,
                email
            }
        });
        res.status(201).json({Message:'User updated sucessfully!'});

    } catch (error) {
        return res.status(500).json({Message:'Error to update user !'})
    }
};

export async function deleteAcount(req:AuthenticatedRequest,res:Response,next:NextFunction):Promise<any>{
    
    try {
        
        await prisma.user.delete({
            where:{id:req.user}
        })

        res.status(200).json({Message:'Acount deleted successfully !'});

    } catch (error) {
        return res.status(500).json({Message:'Error to delete acount !'})
    }

}


export async function Dashboard (req:AuthenticatedRequest,res:Response,next:NextFunction):Promise<any>{
    try {
        const user=await prisma.user.findUnique({
            where:{id:req.user},
            include:{
                products:true
            }
        })

        res.status(200).json({Message:user});

    } catch (error) {
        return res.status(500).json({Message:'Error to access user dashboard !'})
    }

}

export async function getAllUsers(req:AuthenticatedRequest,res:Response,next:NextFunction):Promise<any>{

   try {
        const admin=await prisma.user.findUnique({
            where:{id:req.user},
            
            select:{
                id:true,
                username:true,
                email:true,
                Status:true,
                Role:true,
                createdAt:true,
                products:true
                
            }
        })
        const users=await prisma.user.findMany({
            
            select:{
                id:true,
                username:true,
                email:true,
                Status:true,
                Role:true,
                createdAt:true,
                products:true
            }
        })

        const userCount=await prisma.user.count({
            where:{Status:'ACTIVE',AND:{Role:'USER'}}
        })

        const productCount=await prisma.product.count()

        res.status(200).json({Admin:admin,Allusers:users,activeUser:userCount,totalProduct:productCount})
        
   } catch (error) {

    return res.status(500).json({Message:'Error to access Admin dashboard !'})
   }
}