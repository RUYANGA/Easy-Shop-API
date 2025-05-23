import { body } from "express-validator";
import { PrismaClient } from "@prisma/client";

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

export const resendOtp_validation=[
    body('email')
    .notEmpty()
    .normalizeEmail()
    .escape()
    .withMessage('Please enter email')
    .custom((value,{req})=>{
        return prisma.user.findUnique({
            where:{email:value}
        })
        .then(user=>{
            if(!user){
                return Promise.reject(
                    'User with email not found'
                )
            }else if(user.Status==='ACTIVE'){
                return Promise.reject(
                    'Email already verified'
                )
            }

        })
    })
]

export const verify_Otp=[
    body('email')
    .notEmpty()
    .withMessage('Provide email')
    .toLowerCase()
    .isString()
    .escape()
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
    }),
    body('otp')
    .notEmpty()
    .withMessage('Privide otp code')
    .escape()

]

export const loginValidation=[
    body('email')
    .notEmpty()
    .withMessage('Email required')
    .toLowerCase()
    .escape()
    .custom((value,{req})=>{
        return prisma.user.findUnique({
            where:{email:value}
        })
        .then(user=>{
            if(!user){
                return Promise.reject(
                    'Email or password incorrect !'
                )
            }
            if(user.Status==='INACTIVE'){
                return Promise.reject(
                    'Email not verified please verify your email'
                )
            }
        })
    }),
    body('password')
    .notEmpty()
    .withMessage('Password required !')
    .escape()

]