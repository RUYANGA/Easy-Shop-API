import { body } from "express-validator";
import { PrismaClient } from "@prisma/client";
import { verify } from "crypto";

const prisma=new PrismaClient()


export const signUp_Validation=[
    body('username')
    .notEmpty()
    .withMessage('User must not be empty')
    .escape()
    .isString()
    .withMessage('User must be string')
    .isLength({min:3})
    .withMessage('User must be at least 3 char '),
    body('email')
    .notEmpty()
    .toLowerCase()
    .normalizeEmail()
    .custom((value,{req})=>{
        return prisma.user.findUnique({
            where:{email:value}
        })
        .then(user=>{
            if(user){
                return Promise.reject(
                    'User with email existing'
                )
            }
        })
    })
];

export const verify_Otp=[
    body('email')
    .notEmpty()
    .withMessage('Provide email')
    .toLowerCase()
    .custom((value,{req})=>{
        return prisma.user.findUnique({
            where:{email:value}
        })
        .then(user=>{
            if(!user){
                return Promise.reject(
                    'User with email not found !'
                )
            }else if(user.Status==='ACTIVE'){
                return Promise.reject(
                    'User with email already verified!'
                )
            }

        })
    })
    .isString()
    .escape(),
    body('otp')
    .notEmpty()
    .withMessage('Privide otp code')
    .escape()

]