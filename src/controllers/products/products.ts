import { Request,Response,NextFunction } from "express";



export function listProducts (req:Request,res:Response,next:NextFunction){

    res.status(200).json({Message:'List of product'})

};

export function getProductById(req:Request,res:Response,next:NextFunction){

    res.status(200).json({Message:'getproduct by id'})
};


export function creatProduct(req:Request,res:Response,next:NextFunction){
    res.status(201).json({Message:'Create product'})
};

export function updateProduct(req:Request,res:Response,next:NextFunction){
    res.status(200).json({Message:'Update products'})
}

export function deleteProduct(req:Request,res:Response,next:NextFunction){
    res.status(200).json({Message:'Product deleted'})
}