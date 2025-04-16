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


export async function creatProduct(req:Request,res:Response,next:NextFunction){
    res.status(201).json({Message:'product can be created  ' })
    const {name,price,amount}=req.body
    const product=await prisma.product.create({
        data:{name,price,amount}
    })

    console.log(product)
};

export function updateProduct(req:Request,res:Response,next:NextFunction){
    res.status(200).json({Message:'Update products'})
}

export function deleteProduct(req:Request,res:Response,next:NextFunction){
    res.status(200).json({Message:'Product deleted'})
}