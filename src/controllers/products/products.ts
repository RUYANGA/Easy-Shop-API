import { Request,Response,NextFunction } from "express";



export function listProducts (req:Request,res:Response,next:NextFunction){

    res.status(200).json({Message:'List of product'})

};


export function getProductById(req:Request,res:Response,next:NextFunction){

    res.status(200).json({Message:'getproduct by id'})
};


export function creatProduct(req:Request,res:Response,next:NextFunction){
    res.status(200).json({Message:'Create product'})
}