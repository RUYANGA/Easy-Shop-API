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


export async function creatProduct(req:Request,res:Response,next:NextFunction){
    res.status(201).json({Message:'product can be created  ' })

    const userId=req.params.id;
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
};

export async function updateProduct(req:Request,res:Response,next:NextFunction){
    res.status(200).json({Message:'Update products'})
}

export async function deleteProduct(req:Request,res:Response,next:NextFunction){
    const {id}=req.params;
    const product= await prisma.product.delete({
        where:{id:id},
    })
    res.status(200).json({Message:'Product deleted'})
}