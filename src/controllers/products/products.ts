import { Request,Response,NextFunction } from "express";

import { PrismaClient } from '@prisma/client'

const prisma=new PrismaClient()



export async function listProducts (req:Request,res:Response,next:NextFunction){

    const product=await prisma.product.findMany()

    res.status(200).json({Message:product})


};

export function getProductById(req:Request,res:Response,next:NextFunction){

    res.status(200).json({Message:'getproduct by id'})
};

interface input {
    name:string,
    price:number,
    decription:string
}

export interface AuthenticatedRequest extends Request {
    user?: string;
}
export async function creatProduct(req:Request,res:Response,next:NextFunction):Promise<any>{
    

    const userId=req.params.id;
    const user=await prisma.user.findUnique({
        where:{id:userId}
    })
    if(!user)return res.status(400).json({Message:'User not found '})
    const {name,price,decription}:input=req.body
    const product =await prisma.product.create({
        data:{
            name,
            price,
            decription,
            userId
            
        }
    })

    console.log(product)
    res.status(201).json({Message:'product created successfuly  ',product:product })
};

export async function updateProduct(req:Request,res:Response,next:NextFunction){
    res.status(200).json({Message:'Update products'})
}

export async function getAllProducts(req:Request,res:Response,next:NextFunction){


    const allProducts=await prisma.product.findMany({
        include:{user:true}
    })

    res.status(200).json({allProducts})
}

export async function deleteProduct(req:Request,res:Response,next:NextFunction){
    const {id}=req.params;
    const product= await prisma.product.delete({
        where:{id:id},
    })
    res.status(200).json({Message:'Product deleted'})
}