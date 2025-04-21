import jwt from 'jsonwebtoken'
import { Request,Response,NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
const JWT_KEY=process.env.JWTKEY || 'mydefaultkeyisruyanga' as string

const prisma=new PrismaClient();

export const AuthorizeRoles=(allowedRole:string[])=>{

    return async(req:Request,res:Response,next:NextFunction)=>{

    const authHeader=req.headers['authorization'];

    const token=authHeader?.split(" ")[1];

    if(!token) return res.status(400).json({Message:'Token is not provided !'});

    interface JwtPayloadWithId extends jwt.JwtPayload {
        id: string;
      }
    const decodeUser=jwt.verify(token,JWT_KEY) as unknown as JwtPayloadWithId

    const user=await prisma.user.findUnique({
        where:{id:decodeUser.id}
    })






}}